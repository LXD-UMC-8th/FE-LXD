// src/components/Corrections/CorrectionComponent.tsx
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInCorrections from "./ProfileInCorrections";
import AlertModal from "../Common/AlertModal";
import LoadingModal from "../Common/LoadingModal";

import {
  postSavedMemo,
  patchSavedMemo,
  deleteSavedMemo,
} from "../../apis/correctionsSaved";

import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { useToggleCorrectionLike } from "../../hooks/mutations/CorrectionLike/useToggleCorrectionLike";

import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";

interface Props {
  correction: SavedCorrectionItem;
}

const CorrectionComponent = ({ correction }: Props) => {
  /** ---------- 기본 값/ID ---------- */
  const correctionId = correction.correctionId;     // ✅ 항상 존재
  const savedId = correction.savedCorrectionId;     // '내가 받은 교정' 탭에서만 존재
  const isSavedList = !!savedId;

  /** ---------- 좋아요 ---------- */
  // '내가 받은 교정'은 좋아요 된 것만 보여주므로 기본 true
  const [liked, setLiked] = useState<boolean>(isSavedList ? true : false);
  const [likeCount, setLikeCount] = useState<number>(correction.likeCount ?? 0);
  const [liking, setLiking] = useState(false);
  const [deleteLikeOpen, setDeleteLikeOpen] = useState(false);
  const [removed, setRemoved] = useState(false); // 취소 후 UI에서 즉시 숨김

  const qc = useQueryClient();
  const { mutateAsync: toggleLike } = useToggleCorrectionLike();

  const onClickLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liking || removed) return;

    if (isSavedList && liked) {
      // 저장 탭에서 취소는 모달
      setDeleteLikeOpen(true);
      return;
    }

    // 일반 토글(등록 또는 취소)
    setLiking(true);
    const prevLiked = liked;
    const prevCnt = likeCount;
    try {
      await toggleLike({ correctionId, liked: prevLiked }); // 너의 훅 시그니쳐 유지
      setLiked(!prevLiked);
      setLikeCount(prevLiked ? Math.max(0, prevCnt - 1) : prevCnt + 1);
    } finally {
      setLiking(false);
    }
  };

  const confirmUnlike = async (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    if (liking || removed) return;

    setDeleteLikeOpen(false);
    setLiking(true);

    // 낙관적 숨김
    const prevLiked = liked;
    const prevCnt = likeCount;
    setLiked(false);
    setLikeCount(Math.max(0, prevCnt - 1));
    setRemoved(true);

    try {
      await toggleLike({ correctionId, liked: true }); // 서버는 POST 토글
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    } catch {
      // 롤백
      setLiked(prevLiked);
      setLikeCount(prevCnt);
      setRemoved(false);
    } finally {
      setLiking(false);
    }
  };

  /** ---------- 댓글 ---------- */
  const [openReply, setOpenReply] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(correction.commentCount ?? 0);

  const {
    mutate: fetchComments,
    data: listData,
    isPending: listLoading,
  } = useGetCorrectionComments();

  const comments = useMemo(() => {
    const r: any = listData?.result;
    if (!r) return [];
    if (Array.isArray(r.content)) return r.content;     // 표준
    if (Array.isArray(r.contents)) return r.contents;   // 변형 대응
    return [];
  }, [listData]);

  // 패널 열릴 때 전체 목록 조회
  const toggleReply = () => {
    const next = !openReply;
    setOpenReply(next);
    if (next) fetchComments({ correctionId, page: 1, size: 20 });
  };

  // 서버 totalElements 반영
  useEffect(() => {
    const total = (listData as any)?.result?.totalElements;
    if (typeof total === "number") setCommentCount(total);
  }, [listData]);

  // ✅ 최초 렌더에서 댓글 수가 0이면 size=1로 선조회해서 totalElements만 빠르게 채우기
  const primedRef = useRef(false);
  useEffect(() => {
    if (primedRef.current) return;
    if (!correctionId) return;
    if ((correction.commentCount ?? 0) > 0) {
      primedRef.current = true;
      return;
    }
    fetchComments(
      { correctionId, page: 1, size: 1 },
      {
        onSuccess: (d: any) => {
          const total = d?.result?.totalElements ?? 0;
          setCommentCount(total);
          primedRef.current = true;
        },
        onError: () => {
          primedRef.current = true;
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctionId]);

  /** ---------- 메모(등록/수정/삭제) — 핵심 ---------- */
  // baseline(서버 저장값)과 입력값 분리, 저장/삭제 성공 시 baseline 갱신
  const baselineRef = useRef<string>(correction.memo ?? "");
  const [memoText, setMemoText] = useState<string>(baselineRef.current);

  // 버튼 활성화 기준: 현재 입력값이 기준값과 다르면 수정 가능
  const isDirty = memoText !== baselineRef.current;

  // 서버에서 memo가 바뀌어 들어오면(리스트 refetch 등), 사용자가 수정 중이 아닐 때만 동기화
  useEffect(() => {
    const serverMemo = correction.memo ?? "";
    if (!isDirty && serverMemo !== baselineRef.current) {
      baselineRef.current = serverMemo;
      setMemoText(serverMemo);
    }
  }, [correction.memo, isDirty]);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveMemo = async () => {
    if (!isSavedList) return alert("‘저장한 교정’에서만 메모를 추가/수정할 수 있어요.");
    if (!memoText.trim()) return alert("메모 내용을 입력해 주세요.");
    if (!isDirty) return;

    setIsSaving(true);
    try {
      const payload = { savedCorrectionId: Number(savedId), memo: memoText.trim() };

      // 기존 메모가 있었으면 수정, 없었으면 생성
      if (baselineRef.current) await patchSavedMemo(payload);
      else await postSavedMemo(payload);

      // ✅ 저장 성공 시 기준값 갱신 → 다음 수정에서 버튼 다시 활성화됨
      baselineRef.current = memoText;
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
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
      baselineRef.current = ""; // ✅ 삭제 성공 시 기준값도 비우기
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    } catch (e) {
      console.error("❌ 메모 삭제 실패:", e);
      alert("메모 삭제에 실패했어요.");
    } finally {
      setIsDeleting(false);
    }
  };

  /** ---------- 제거된 카드면 렌더 스킵 ---------- */
  if (removed) return null;

  /** ---------- 렌더 ---------- */
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* 상단 프로필/시간 */}
      <div className="mb-3">
        <ProfileInCorrections member={correction.member} createdAt={correction.createdAt ?? ""} />
      </div>

      {/* 다이어리 제목 */}
      {!!correction.diaryTitle && (
        <div className="mt-1">
          <span className="text-primary-600 font-semibold underline cursor-pointer">
            {correction.diaryTitle}
          </span>
        </div>
      )}

      {/* 본문 */}
      <div className="mt-3 space-y-3">
        {!!correction.original && <p className="text-body1 text-gray-900">{correction.original}</p>}

        {!!correction.corrected && (
          <div className="flex gap-2">
            <div className="w-1.5 rounded bg-primary-500 mt-1" />
            <p className="text-body1 font-semibold text-primary-600">{correction.corrected}</p>
          </div>
        )}

        {!!correction.commentText && (
          <p className="text-body2 text-gray-700">{correction.commentText}</p>
        )}
      </div>

      {/* 액션 */}
      <div className="mt-4 flex items-center justify-end gap-6 text-sm text-gray-500">
        <button
          onClick={toggleReply}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100"
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
          {listLoading && <LoadingModal />}

          {!listLoading && comments.length === 0 && (
            <div className="text-sm text-gray-400">첫 댓글을 남겨보세요.</div>
          )}

          {!listLoading &&
            comments.map((c: any) => (
              <div key={c.commentId} className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img
                    src={c.profileImage ?? c.member?.profileImageUrl}
                    className="h-6 w-6 rounded-full bg-gray-200"
                    alt="프로필"
                  />
                  <span className="font-medium">{c.nickname ?? c.member?.nickname}</span>
                  <span className="text-gray-400">@{c.username ?? c.member?.username}</span>
                  <span className="ml-auto text-gray-400">{c.createdAt}</span>
                </div>
                <div className="mt-2 text-body1 text-gray-900">{c.content}</div>
              </div>
            ))}
        </div>
      )}

      {/* 저장 탭에서만 메모 입력 */}
      {!!isSavedList && (
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
            {baselineRef.current ? "수정하기" : "저장하기"}
          </button>

          <button
            onClick={handleDeleteMemo}
            disabled={isDeleting || !baselineRef.current}
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
