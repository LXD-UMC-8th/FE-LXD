// src/components/CorrectionComponent.tsx
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInCorrections from "./ProfileInCorrections";
import AlertModal from "../Common/AlertModal";
import LoadingModal from "../Common/LoadingModal";
import { useNavigate } from "react-router-dom";

import { useGetCorrectionComments } from "../../hooks/mutations/CorrectionComment/useGetCorrectionComments";
import { useToggleCorrectionLike } from "../../hooks/mutations/CorrectionLike/useToggleCorrectionLike";
import { useUpsertSavedMemo, useDeleteSavedMemo } from "../../hooks/mutations/useSavedMemo";

import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";
import { QUERY_KEY } from "../../constants/key";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

interface Props {
  correction: SavedCorrectionItem;
  diaryThumbnail?: string; // ✅ 1. 부모에게 받을 diaryThumbnail prop 타입을 추가합니다.
}

const pickDeep = (obj: any, paths: string[][]) => {
  for (const path of paths) {
    let cur = obj;
    let ok = true;
    for (const key of path) {
      if (cur && key in cur) cur = cur[key];
      else { ok = false; break; }
    }
    if (ok && cur != null) return cur;
  }
  return undefined;
};

const makeSnippet = (text?: string, max = 30) => {
  if (!text) return "";
  const line = text.trim().split(/\r?\n/)[0] || "";
  return line.length > max ? line.slice(0, max) + "…" : line;
};

// ✅ 2. diaryThumbnail prop을 받도록 수정합니다.
const CorrectionComponent = ({ correction, diaryThumbnail }: Props) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translate[language];

  const normalized = (() => {
    const c: any = correction;
    const diaryTitle: string =
      c?.diaryInfo?.diaryTitle ??
      c.diaryTitle ?? c.title ??
      pickDeep(c, [
        ["diary", "title"], ["targetDiary", "title"], ["target", "title"],
        ["diaryInfo", "title"], ["sourceDiary", "title"], ["post", "title"],
        ["entry", "title"], ["content", "title"],
      ]) ?? "";
    const diaryId: number | string | undefined =
      c?.diaryInfo?.diaryId ??
      c.diaryId ?? c.postId ?? c.entryId ??
      pickDeep(c, [
        ["diary", "id"], ["targetDiary", "id"], ["target", "id"],
        ["diaryInfo", "id"], ["sourceDiary", "id"], ["post", "id"], ["entry", "id"],
      ]);
    
    // ✅ 3. 부모에게 받은 diaryThumbnail 값을 최우선으로 사용하도록 수정합니다.
    const diaryThumbnailValue: string | undefined =
      diaryThumbnail ?? // 1순위: 부모에게서 직접 받은 값
      c?.diaryInfo?.diaryThumbnail ?? // 2순위: 기존 추측 로직
      c.thumbnail ?? c.thumbnailUrl ?? c.imageUrl ??
      pickDeep(c, [
        ["diary", "thumbnail"], ["diary", "image"], ["targetDiary", "thumbnail"],
        ["post", "thumbnail"], ["post", "imageUrl"],
      ]);

    const createdAt: string =
      c.createdAt ?? c.providedAt ?? c.updatedAt ?? c.createdDate ?? c?.diaryInfo?.diaryCreatedAt ?? "";
    const member = c.member ?? c.receiver ?? c.writer ?? c.owner ?? c.author ?? c.user ?? {};
    const original: string | undefined = c.original ?? c.originalText;
    const likedFlag = Boolean(c.liked ?? c.isLiked ?? c.hasLiked);
    const likeCountVal = typeof c.likeCount === "number" ? c.likeCount : (c.likes ?? 0);
    const savedCorrectionId = c.savedCorrectionId;

    return {
      diaryTitle, diaryId, createdAt, member, original,
      likedFlag, likeCountVal, savedCorrectionId,
      diaryThumbnail: diaryThumbnailValue, // 최종 썸네일 값 반환
    };
  })();

  // (이하 다른 로직들은 변경사항 없습니다)
  const displayTitle =
    normalized.diaryTitle ||
    makeSnippet(normalized.original) ||
    makeSnippet((correction as any).corrected) ||
    makeSnippet((correction as any).commentText) ||
    "";
  const correctionId = (correction as any).correctionId;
  const savedId = normalized.savedCorrectionId;
  const isSavedList = !!savedId;
  const initiallyLiked = isSavedList ? true : normalized.likedFlag;
  const [liked, setLiked] = useState<boolean>(initiallyLiked);
  const [likeCount, setLikeCount] = useState<number>(normalized.likeCountVal);
  const [liking, setLiking] = useState(false);
  const [deleteLikeOpen, setDeleteLikeOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  const qc = useQueryClient();
  const { mutateAsync: toggleLike } = useToggleCorrectionLike();
  const onClickLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liking || removed) return;
    if (isSavedList && liked) {
      setDeleteLikeOpen(true);
      return;
    }
    setLiking(true);
    try {
      const res: any = await toggleLike({ correctionId });
      const nextLiked = Boolean(res?.liked);
      const nextCount =
        typeof res?.likeCount === "number"
          ? res.likeCount
          : nextLiked
          ? likeCount + 1
          : Math.max(0, likeCount - 1);
      setLiked(nextLiked);
      setLikeCount(nextCount);
      qc.invalidateQueries({ queryKey: [QUERY_KEY.providedCorrections] });
    } finally {
      setLiking(false);
    }
  };
  const confirmUnlike = async (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    if (liking || removed) return;
    setDeleteLikeOpen(false);
    setLiking(true);
    try {
      const res: any = await toggleLike({ correctionId });
      const nextLiked = Boolean(res?.liked);
      const nextCount =
        typeof res?.likeCount === "number" ? res.likeCount : Math.max(0, likeCount - 1);
      setLiked(nextLiked);
      setLikeCount(nextCount);
      if (isSavedList) setRemoved(true);
      qc.invalidateQueries({ queryKey: [QUERY_KEY.savedCorrections] });
    } finally {
      setLiking(false);
    }
  };
  const [openReply, setOpenReply] = useState(false);
  const [commentCount, setCommentCount] = useState<number>((correction as any).commentCount ?? 0);
  const { mutate: fetchComments, data: listData, isPending: listLoading } = useGetCorrectionComments();
  const comments = useMemo(() => {
    const r: any = listData?.result;
    if (!r) return [];
    if (Array.isArray(r.content)) return r.content;
    if (Array.isArray(r.contents)) return r.contents;
    return [];
  }, [listData]);
  const toggleReply = () => {
    const next = !openReply;
    setOpenReply(next);
    if (next) fetchComments({ correctionId, page: 1, size: 20 });
  };
  useEffect(() => {
    const total = (listData as any)?.result?.totalElements;
    if (typeof total === "number") setCommentCount(total);
  }, [listData]);
  const primedRef = useRef(false);
  useEffect(() => {
    if (primedRef.current) return;
    if (((correction as any).commentCount ?? 0) > 0) {
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
        onError: () => { primedRef.current = true; },
      }
    );
  }, [correctionId]);
  const baselineRef = useRef<string>((correction as any).memo ?? "");
  const [memoText, setMemoText] = useState<string>(baselineRef.current);
  const isDirty = memoText !== baselineRef.current;
  const { mutateAsync: upsertMemo, isPending: isSaving } = useUpsertSavedMemo();
  const { mutateAsync: removeMemo, isPending: isDeleting } = useDeleteSavedMemo();
  const handleSaveMemo = async () => {
    if (!isSavedList) return alert(t.SaveMemoFail1);
    const trimmed = memoText.trim();
    if (!trimmed) return alert(t.PlzEnterInContent ?? "메모 내용을 입력해 주세요.");
    if (!isDirty) return;
    try {
      await upsertMemo({
        savedCorrectionId: Number(savedId),
        memo: trimmed,
        hadMemo: Boolean(baselineRef.current),
      } as any);
      baselineRef.current = trimmed;
      setMemoText(trimmed);
    } catch (e) {
      console.error("❌ 메모 저장 실패:", e);
      alert(t.SaveMemoFail ?? "메모 저장에 실패했습니다.");
    }
  };
  const handleDeleteMemo = async () => {
    if (!isSavedList) return;
    try {
      await removeMemo(Number(savedId));
      baselineRef.current = "";
      setMemoText("");
    } catch (e) {
      console.error("❌ 메모 삭제 실패:", e);
      alert(t.DeleteMemoFail ?? "메모 삭제에 실패했습니다.");
    }
  };

  const handleNavigate = () => {
    if (normalized.diaryId) {
      navigate(`/feed/${normalized.diaryId}`);
    }
  };

  if (removed) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div onClick={handleNavigate} className="cursor-pointer">
        <div className="mb-3">
          <ProfileInCorrections member={normalized.member} createdAt={normalized.createdAt || ""} />
        </div>
        {!!displayTitle && (
          <div className="mt-1">
            <span className="text-primary-600 font-semibold underline">
              {displayTitle}
            </span>
          </div>
        )}
        <div className="mt-3 space-y-3">
          {!!normalized.original && (
            <p className="text-body1 text-gray-900">{normalized.original}</p>
          )}
          {!!(correction as any).corrected && (
            <div className="flex gap-2">
              <div className="w-1.5 rounded bg-primary-500 mt-1" />
              <p className="text-body1 font-semibold text-primary-600">
                {(correction as any).corrected}
              </p>
            </div>
          )}
          {!!(correction as any).commentText && (
            <p className="text-body2 text-gray-700">{(correction as any).commentText}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-6 text-sm text-gray-500">
        <button
          onClick={toggleReply}
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100 cursor-pointer"
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
          className="flex items-center gap-1 rounded px-1.5 py-1 hover:bg-gray-100 disabled:opacity-60 cursor-pointer"
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

      {openReply && (
        <div className="mt-3 space-y-3">
          {listLoading && <LoadingModal />}
          {!listLoading && comments.length === 0 && (
            <div className="text-sm text-gray-400">{t.NoComments ?? "댓글이 없습니다."}</div>
          )}
          {!listLoading &&
            comments.map((c: any) => (
              <div key={c.commentId} className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img
                    src={c.profileImage ?? c.member?.profileImageUrl ?? "/images/profileImage.svg"}
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
      {!!isSavedList && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
            <img src="/images/MemoPlusIcon.svg" alt="메모 추가" className="w-4 h-4" />
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
            disabled={isSaving || !isDirty}
            className="rounded-md bg-primary-500 px-4 py-2 text-body1 font-semibold text-white hover:bg-blue-600 disabled:opacity-60 cursor-pointer"
          >
            {baselineRef.current ? t.editmemo : t.postmemo}
          </button>
          <button
            onClick={handleDeleteMemo}
            disabled={isDeleting || !baselineRef.current}
            className="rounded-md bg-gray-200 px-4 py-2 text-body1 text-gray-700 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          >
            {t.DeleteMemo}
          </button>
        </div>
      )}

      <div className="mt-5 border-t border-gray-200" />

      <div
        className="mt-4 flex cursor-pointer items-center gap-3"
        onClick={handleNavigate}
      >
        {normalized.diaryThumbnail ? (
          <img
            src={normalized.diaryThumbnail}
            alt={displayTitle || "게시물 썸네일"}
            className="h-9 w-9 rounded-md bg-gray-200 object-cover"
          />
        ) : (
          <div className="h-9 w-9 rounded-md bg-gray-200" />
        )}

        <div className="text-body1 text-gray-700">
          {(normalized.diaryId ?? correctionId) != null && (
            <span className="mr-2 text-gray-500">
              #{normalized.diaryId ?? correctionId}
            </span>
          )}
          {displayTitle && <span className="font-medium">{displayTitle}</span>}
        </div>
        <div className="ml-auto text-caption text-gray-500">{normalized.createdAt || ""}</div>
      </div>

      {deleteLikeOpen && (
        <AlertModal
          title={t.DeleteLikeAlert}
          confirmText={t.Cancle}
          onConfirm={confirmUnlike}
          onClose={(e) => {
            e.stopPropagation();
            setDeleteLikeOpen(false);
          }}
          alertMessage={t.DeleteLikeAlert1}
        />
      )}
    </div>
  );
};

export default CorrectionComponent;