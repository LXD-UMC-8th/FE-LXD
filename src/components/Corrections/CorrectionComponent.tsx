import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInCorrections from "./ProfileInCorrections";
import { postSavedMemo, patchSavedMemo, deleteSavedMemo } from "../../apis/correctionsSaved";
import { useCorrectionComments } from "../../hooks/queries/useCorrectionComments";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";

interface Props { correction: SavedCorrectionItem; }

const CorrectionComponent = ({ correction }: Props) => {
  const [liked, setLiked] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  // ===== 메모 (단일) =====
  const initialMemo = correction.memo ?? "";
  const [memoText, setMemoText] = useState<string>(initialMemo);
  const isDirty = memoText.trim() !== initialMemo;     // 내용 변경 여부
  const savedId = correction.savedCorrectionId;        // 저장 탭에서만 존재
  const isSavedList = !!savedId;

  const hadMemoAtMount = useRef<boolean>(!!initialMemo.trim());
  const qc = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveMemo = async () => {
    if (!isSavedList) return alert("‘저장한 교정’에서만 메모를 추가할 수 있어요.");
    if (!memoText.trim()) return alert("메모 내용을 입력해 주세요.");
    if (!isDirty && hadMemoAtMount.current) return; // 변경 없으면 무시

    setIsSaving(true);
    try {
      const payload = { savedCorrectionId: Number(savedId), memo: memoText.trim() };
      if (hadMemoAtMount.current) await patchSavedMemo(payload);
      else {
        await postSavedMemo(payload);
        hadMemoAtMount.current = true;
      }
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
      hadMemoAtMount.current = false;
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    } catch (e) {
      console.error("❌ 메모 삭제 실패:", e);
      alert("메모 삭제에 실패했어요.");
    } finally {
      setIsDeleting(false);
    }
  };

  // ===== 댓글 (토글 시점에 로드) =====
  const correctionId = correction?.savedCorrectionId ? correction?.savedCorrectionId : correction?.diaryId; 
  // ↑ 여기서는 saved 응답의 correctionId가 correction.correctionId 에 있으니 아래 라인으로 교체하세요:
  // const correctionId = correction?.correctionId;  // <- map 단계에서 넣어줬다면 이걸로

  const {
  data: comments = [],
  fetchNextPage,
  hasNextPage,
  isFetching,
  status: commentStatus,
} = useCorrectionComments(correction.savedCorrectionId, openReply);
  const createdAtText = correction.createdAt ?? "";

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
          onClick={() => setOpenReply((p) => !p)}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100"
        >
          <img
            src={openReply ? "/images/commentIcon.svg" : "/images/emptycommentIcon.svg"}
            alt="댓글"
            className="w-5 h-5"
          />
          <span>{correction.commentCount}</span>
        </button>

        <button
          onClick={() => setLiked((p) => !p)}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100"
        >
          <img
            src={liked ? "/images/HeartIcon.svg" : "/images/EmptyHeartIcon.svg"}
            alt="좋아요"
            className="w-5 h-5"
          />
          <span>{correction.likeCount}</span>
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
      {isSavedList && (
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
            disabled={isSaving || (!isDirty && hadMemoAtMount.current)}
            className="rounded-md bg-primary-500 px-4 py-2 text-body1 font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {hadMemoAtMount.current ? "수정하기" : "저장하기"}
          </button>

          <button
            onClick={handleDeleteMemo}
            disabled={isDeleting || !hadMemoAtMount.current}
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
        <div className="ml-auto text-caption text-gray-500">{createdAtText}</div>
      </div>
    </div>
  );
};

export default CorrectionComponent;
