// src/components/Corrections/CorrectionComponent.tsx
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInCorrections from "./ProfileInCorrections";
import AlertModal from "../Common/AlertModal";
import { postSavedMemo, patchSavedMemo, deleteSavedMemo } from "../../apis/correctionsSaved";
import { useCorrectionComments } from "../../hooks/queries/useCorrectionComments";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";
import { axiosInstance } from "../../apis/axios";

interface Props { correction: SavedCorrectionItem; }

const CorrectionComponent = ({ correction }: Props) => {
  /** -------------------- 좋아요 -------------------- */
  // '내가 좋아요한 교정' 페이지 → 기본 liked=true가 자연스러움(필드 없으면 true)
  const initialLiked = (correction as any)?.liked ?? (correction as any)?.isLiked ?? true;
  const [liked, setLiked] = useState<boolean>(!!initialLiked);
  const [likeCount, setLikeCount] = useState<number>(correction.likeCount ?? 0);
  const [liking, setLiking] = useState(false);
  const [deleteLikeOpen, setDeleteLikeOpen] = useState(false);

  // 캐시 조작용
  const qc = useQueryClient();
  const SAVED_QK = ["savedCorrections"];

  const idToRemove = (correction as any)?.savedCorrectionId ?? (correction as any)?.correctionId ?? (correction as any)?.diaryId;

  const removeCardFromCache = (id: number | string) => {
    // 배열 형태와 무한스크롤(pages) 둘 다 대응
    const curr: any = qc.getQueryData(SAVED_QK);
    if (!curr) return;

    if (Array.isArray(curr)) {
      qc.setQueryData<SavedCorrectionItem[]>(SAVED_QK, (old) =>
        (old ?? []).filter((it) =>
          (it as any).savedCorrectionId !== id && (it as any).correctionId !== id
        )
      );
    } else if (curr.pages) {
      qc.setQueryData(SAVED_QK, {
        ...curr,
        pages: curr.pages.map((page: SavedCorrectionItem[]) =>
          page.filter(
            (it) =>
              (it as any).savedCorrectionId !== id &&
              (it as any).correctionId !== id
          )
        ),
      });
    }
  };

  const restoreCardToCache = (backup: any) => {
    qc.setQueryData(SAVED_QK, backup);
  };

  const toggleCorrectionLike = async () => {
    // 서버가 POST 한 번으로 토글한다고 가정 (취소가 DELETE면 여기만 변경)
    return axiosInstance.post(`/corrections/${(correction as any)?.correctionId ?? idToRemove}/likes`);
  };

  const onClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liking) return;

    if (!liked) {
      // 등록: 낙관적
      setLiking(true);
      const prevLiked = liked, prevCount = likeCount;
      setLiked(true); setLikeCount(prevCount + 1);
      toggleCorrectionLike()
        .catch(() => { setLiked(prevLiked); setLikeCount(prevCount); })
        .finally(() => setLiking(false));
    } else {
      // 취소는 모달
      setDeleteLikeOpen(true);
    }
  };

  const confirmUnlike = async (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    if (liking) return;

    setDeleteLikeOpen(false);
    setLiking(true);

    // 낙관적: 카드 제거 + 카운트/상태 반영
    const prevLiked = liked, prevCount = likeCount;
    const backup = qc.getQueryData(SAVED_QK);

    setLiked(false);
    setLikeCount(Math.max(0, prevCount - 1));
    removeCardFromCache(idToRemove);

    try {
      await toggleCorrectionLike(); // 실패하면 롤백
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
      restoreCardToCache(backup);
    } finally {
      setLiking(false);
      qc.invalidateQueries({ queryKey: SAVED_QK }); // 서버값 동기화
    }
  };

  /** -------------------- 메모(등록/수정/삭제) -------------------- */
  const savedId = correction.savedCorrectionId; // 저장 탭에서만 있음
  const isSavedList = !!savedId;

  // 수정 안 되는 문제 → baseline 두고, 저장 성공 시 baseline 갱신
  const normalize = (s: string) => (s ?? "").replace(/\r\n/g, "\n").trim();
  const [baselineMemo, setBaselineMemo] = useState<string>(normalize(correction.memo));
  const [memoText, setMemoText] = useState<string>(normalize(correction.memo));
  const isDirty = normalize(memoText) !== normalize(baselineMemo);

  const hadMemoAtMount = useRef<boolean>(!!normalize(correction.memo));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveMemo = async () => {
    if (!isSavedList) return alert("‘저장한 교정’에서만 메모를 추가/수정할 수 있어요.");
    if (!normalize(memoText)) return alert("메모 내용을 입력해 주세요.");
    if (!isDirty && hadMemoAtMount.current) return;

    setIsSaving(true);
    try {
      const payload = { savedCorrectionId: Number(savedId), memo: normalize(memoText) };
      if (hadMemoAtMount.current) {
        await patchSavedMemo(payload); // ✅ 수정
      } else {
        await postSavedMemo(payload);  // ✅ 최초 등록
        hadMemoAtMount.current = true;
      }
      setBaselineMemo(normalize(memoText));          // ✅ 기준 갱신 → 다음 수정 가능
      qc.invalidateQueries({ queryKey: SAVED_QK });  // 목록 갱신
    } catch (e) {
      console.error("❌ 메모 저장 실패:", e);
      alert("메모 저장에 실패했어요.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMemo = async () => {
    if (!isSavedList) return;
    setIsDeleting(true);
    try {
      await deleteSavedMemo(Number(savedId));
      setMemoText("");
      setBaselineMemo("");
      hadMemoAtMount.current = false;
      qc.invalidateQueries({ queryKey: SAVED_QK });
    } catch (e) {
      console.error("❌ 메모 삭제 실패:", e);
      alert("메모 삭제에 실패했어요.");
    } finally {
      setIsDeleting(false);
    }
  };

  /** -------------------- 댓글(토글 로드) -------------------- */
  const [openReply, setOpenReply] = useState(false);
  const {
    data: comments = [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    status: commentStatus,
  } = useCorrectionComments(savedId, openReply);

  const createdAtText = correction.createdAt ?? "";
  const commentCount = correction.commentCount ?? 0;
  const commentDisabled = commentCount === 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* 상단 프로필/시간 */}
      <div className="mb-3">
        <ProfileInCorrections member={correction.member} createdAt={createdAtText} />
      </div>

      {/* 다이어리 제목 */}
      {correction.diaryTitle && (
        <div className="mt-1">
          <span className="text-primary-600 font-semibold underline cursor-pointer">
            {correction.diaryTitle}
          </span>
        </div>
      )}

      {/* 본문 */}
      <div className="mt-3 space-y-3">
        {correction.original && <p className="text-body1 text-gray-900">{correction.original}</p>}

        {correction.corrected && (
          <div className="flex gap-2">
            <div className="w-1.5 rounded bg-primary-500 mt-1" />
            <p className="text-body1 font-semibold text-primary-600">{correction.corrected}</p>
          </div>
        )}

        {correction.commentText && (
          <p className="text-body2 text-gray-700">{correction.commentText}</p>
        )}
      </div>

      {/* 액션 */}
      <div className="mt-4 flex items-center justify-end gap-6 text-sm text-gray-500">
        <button
          onClick={() => !commentDisabled && setOpenReply((p) => !p)}
          disabled={commentDisabled}
          className={`flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100 ${
            commentDisabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""
          }`}
        >
          <img
            src={openReply ? "/images/commentIcon.svg" : "/images/emptycommentIcon.svg"}
            alt="댓글"
            className="w-5 h-5"
          />
          <span>{commentCount}</span>
        </button>

        <button
          onClick={onClickLike}
          disabled={liking}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100 disabled:opacity-60"
          aria-pressed={liked}
        >
          <img
            src={liked ? "/images/HeartIcon.svg" : "/images/EmptyHeartIcon.svg"}
            alt="좋아요"
            className={`w-5 h-5 ${liked ? "scale-110" : ""}`}
          />
          <span className={liked ? "text-red-500" : undefined}>{likeCount}</span>
        </button>
      </div>

      {/* 댓글 리스트 */}
      {openReply && (
        <div className="mt-3 space-y-3">
          {commentStatus === "pending" && (
            <div className="text-sm text-gray-400">댓글 불러오는 중…</div>
          )}
          {commentStatus === "success" && comments.length === 0 && (
            <div className="text-sm text-gray-400">첫 댓글을 남겨보세요.</div>
          )}

          {comments.map((c) => (
            <div key={c.commentId} className="border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <img
                  src={c.member.profileImageUrl}
                  className="h-6 w-6 rounded-full bg-gray-200"
                  alt="프로필"
                />
                <span className="font-medium">{c.member.nickname}</span>
                <span className="text-gray-400">@{c.member.username}</span>
                <span className="ml-auto text-gray-400">{c.createdAt}</span>
              </div>
              <div className="mt-2 text-body1 text-gray-900">{c.content}</div>
            </div>
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetching}
              className="mt-2 rounded-md border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60"
            >
              더 보기
            </button>
          )}
        </div>
      )}

      {/* 저장 탭에서만 메모 입력 */}
      {!!savedId && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
            <img src="/images/MemoPlusIcon.svg" alt="메모 추가" className="w-4 h-4" />
            <input
              type="text"
              placeholder="메모를 추가하기"
              className="w-full bg-transparent text-body1 text-gray-900 placeholder-gray-400 outline-none"
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
            />
          </div>

          <button
            onClick={handleSaveMemo}
            disabled={isSaving || !isDirty}
            className="rounded-md bg-primary-500 px-4 py-2 text-body1 font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {normalize(baselineMemo) ? "수정하기" : "저장하기"}
          </button>

          <button
            onClick={handleDeleteMemo}
            disabled={isDeleting || !normalize(baselineMemo)}
            className="rounded-md bg-gray-200 px-4 py-2 text-body1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            메모 삭제
          </button>
        </div>
      )}

      <div className="mt-5 border-t border-gray-200" />

      {/* 하단 정보 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="text-body1 text-gray-700">
          <span className="mr-2 text-gray-500">#{correction.diaryId}</span>
          <span className="font-medium">{correction.diaryTitle || "제목 없음"}</span>
        </div>
        <div className="ml-auto text-caption text-gray-500">{correction.createdAt ?? ""}</div>
      </div>

      {/* 좋아요 취소 모달 */}
      {deleteLikeOpen && (
        <AlertModal
          title="'좋아요' 취소 시 해당 교정이 '좋아요' 목록에서 삭제됩니다. 정말 취소하시겠습니까?"
          confirmText="취소하기"
          onConfirm={confirmUnlike}
          onClose={(e) => {
            e.stopPropagation();
            setDeleteLikeOpen(false);
          }}
          alertMessage="'좋아요' 취소 시 해당 교정이 '좋아요'에서 제거됩니다."
        />
      )}
    </div>
  );
};

export default CorrectionComponent;
