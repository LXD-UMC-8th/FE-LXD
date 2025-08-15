import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInCorrections from "./ProfileInCorrections";
import {
  postSavedMemo,
  patchSavedMemo,
  deleteSavedMemo,
} from "../../apis/correctionsSaved";
import { useCorrectionComments } from "../../hooks/queries/useCorrectionComments";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";
import AlertModal from "../Common/AlertModal"; // ✅ 모달
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

interface Props {
  correction: SavedCorrectionItem;
}

const CorrectionComponent = ({ correction }: Props) => {
  const { language } = useLanguage();
  const t = translate[language];
  // ===== 좋아요 =====
  const [isLiked, setIsLiked] = useState<boolean>(
    (correction as any)?.liked ?? (correction as any)?.isLiked ?? false
  );
  const [likeCount, setLikeCount] = useState<number>(correction.likeCount ?? 0);
  const [deleteLikeModal, setDeleteLikeModal] = useState(false);

  // ===== 댓글 토글 =====
  const [openReply, setOpenReply] = useState(false);

  // ===== 메모 (등록/수정/삭제) =====
  const initialMemo = correction.memo ?? "";
  // ✅ baseline으로 관리(저장 성공 시 갱신)
  const [baselineMemo, setBaselineMemo] = useState<string>(initialMemo);
  const [memoText, setMemoText] = useState<string>(initialMemo);
  const isDirty = memoText.trim() !== baselineMemo.trim(); // 변경 여부

  const savedId = correction.savedCorrectionId; // 저장 탭에서만 존재
  const isSavedList = !!savedId;

  const hadMemoAtMount = useRef<boolean>(!!initialMemo.trim());
  const qc = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveMemo = async () => {
    if (!isSavedList)
      return alert(t.SaveMemoFail1);
    if (!memoText.trim()) return alert(t.MemoEmpty);
    if (!isDirty && hadMemoAtMount.current) return; // 변경 없으면 무시

    setIsSaving(true);
    try {
      const payload = {
        savedCorrectionId: Number(savedId),
        memo: memoText.trim(),
      };
      if (hadMemoAtMount.current) {
        await patchSavedMemo(payload); // ✅ 수정
      } else {
        await postSavedMemo(payload); // ✅ 최초 등록
        hadMemoAtMount.current = true;
      }
      setBaselineMemo(memoText.trim()); // ✅ 저장 성공 시 기준값 갱신 → 이후 수정 버튼 정상 동작
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    } catch (e) {
      console.error("❌", e);
      alert(t.SaveMemoFail);
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
      setBaselineMemo(""); // ✅ 기준값도 비우기
      hadMemoAtMount.current = false;
      qc.invalidateQueries({ queryKey: ["savedCorrections"] });
    } catch (e) {
      console.error("❌", e);
      alert(t.DeleteMemoFail);
    } finally {
      setIsDeleting(false);
    }
  };

  // ===== 댓글 (토글 시점에 로드) =====
  // 사용 안 하는 correctionId 변수는 삭제해서 TS6133 방지
  const {
    data: comments = [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    status: commentStatus,
  } = useCorrectionComments(correction.savedCorrectionId, openReply);
  const createdAtText = correction.createdAt ?? "";

  // 댓글 0개면 버튼 비활성화
  const commentDisabled = (correction.commentCount ?? 0) === 0;

  // 좋아요 클릭 핸들러 (UI 기준)
  const onClickLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((p) => p + 1);
      // TODO: 여기서 좋아요 등록 API 호출(성공/실패에 따라 롤백)
      return;
    }
    // 이미 좋아요면 모달로 확인 받고 취소
    setDeleteLikeModal(true);
  };

  const confirmUnlike = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setDeleteLikeModal(false);
    setIsLiked(false);
    setLikeCount((p) => Math.max(0, p - 1));
    // TODO: 여기서 좋아요 취소 API 호출(성공/실패에 따라 롤백)
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* 상단 프로필/시간 */}
      <div className="mb-3">
        <ProfileInCorrections
          member={correction.member}
          createdAt={createdAtText}
        />
      </div>

      {/* 다이어리 제목 */}
      {correction.diaryInfo?.diaryTitle && (
        <div className="mt-1">
          <span className="text-primary-600 font-semibold underline cursor-pointer">
            {correction.diaryInfo?.diaryTitle}
          </span>
        </div>
      )}

      {/* 본문 */}
      <div className="mt-3 space-y-3">
        {correction.original && (
          <p className="text-body1 text-gray-900">{correction.original}</p>
        )}

        {correction.corrected && (
          <div className="flex gap-2">
            <div className="w-1.5 rounded bg-primary-500 mt-1" />
            <p className="text-body1 font-semibold text-primary-600">
              {correction.corrected}
            </p>
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
            commentDisabled
              ? "opacity-40 cursor-not-allowed hover:bg-transparent"
              : ""
          }`}
        >
          <img
            src={
              openReply
                ? "/images/commentIcon.svg"
                : "/images/emptycommentIcon.svg"
            }
            alt="댓글"
            className="w-5 h-5"
          />
          <span>{correction.commentCount}</span>
        </button>

        <button
          onClick={onClickLike}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100"
        >
          <img
            src={
              isLiked ? "/images/HeartIcon.svg" : "/images/EmptyHeartIcon.svg"
            }
            alt="좋아요"
            className={`w-5 h-5 ${isLiked ? "scale-110" : ""}`}
          />
          <span className={isLiked ? "text-red-500" : undefined}>
            {likeCount}
          </span>
        </button>
      </div>

      {/* 댓글 리스트 */}
      {openReply && (
        <div className="mt-3 space-y-3">
          {commentStatus === "pending" && (
            <div className="text-sm text-gray-400">{t.PendingComments}</div>
          )}
          {commentStatus === "success" && comments.length === 0 && (
            <div className="text-sm text-gray-400">{t.FirstComment}</div>
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
              {t.More}
            </button>
          )}
        </div>
      )}

      {/* 저장 탭에서만 메모 입력 */}
      {isSavedList && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
            <img
              src="/images/MemoPlusIcon.svg"
              alt="메모 추가"
              className="w-4 h-4"
            />
            <input
              type="text"
              placeholder={t.AddNote}
              className="w-full bg-transparent text-body1 text-gray-900 placeholder-gray-400 outline-none"
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
            />
          </div>

          <button
            onClick={handleSaveMemo}
            disabled={isSaving || (!isDirty && hadMemoAtMount.current)}
            className="rounded-md bg-primary-500 px-4 py-2 text-body1 font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSaveMemo();
                }
            }}
          >
            {hadMemoAtMount.current ? t.EditDiary : t.enrollButtonText}
          </button>

          <button
            onClick={handleDeleteMemo}
            disabled={isDeleting || !hadMemoAtMount.current}
            className="rounded-md bg-gray-200 px-4 py-2 text-body1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            {t.deleteButton}
          </button>
        </div>
      )}

      <div className="mt-5 border-t border-gray-200" />

      {/* 하단 정보 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="text-body1 text-gray-700">
          <span className="mr-2 text-gray-500">
            #{correction.diaryInfo?.diaryId}
          </span>
          <span className="font-medium">
            {correction.diaryInfo?.diaryTitle || t.Untitled}
          </span>
        </div>
        <div className="ml-auto text-caption text-gray-500">
          {createdAtText}
        </div>
      </div>

      {/* ✅ 좋아요 취소 모달 */}
      {deleteLikeModal && (
        <AlertModal
          title={t.DeleteLikeAlert}
          confirmText={t.Cancle}
          onConfirm={confirmUnlike}
          onClose={(e) => {
            e.stopPropagation();
            setDeleteLikeModal(false);
          }}
          alertMessage={t.DeleteLikeAlert1}
        />
      )}
    </div>
  );
};

export default CorrectionComponent;
