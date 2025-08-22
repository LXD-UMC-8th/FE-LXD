import { useEffect, useState } from "react";
import Avatar from "../Common/Avatar";
import { getLocalStorageItem } from "../../apis/axios";
import ReplyItem from "./ReplyItem";
import MoreMenuDelete from "./MoreMenuDelete";
import { useLikeDiaryComment } from "../../hooks/mutations/DiaryComment/useLikeDiaryComment";

interface CommentItemProps {
  comment: any;
  replyTexts: Record<number, string>;
  onReplyChange: (id: number, value: string) => void;
  onReplySubmit: (id: number) => void;
  onDelete: (id: number) => void;
  menuWrapperRef: React.RefObject<HTMLDivElement | null>;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  t: any;
  isPostingComment: boolean;
  navigate: (url: string) => void;
}

const CommentItem = ({
  comment,
  replyTexts,
  onReplyChange,
  onReplySubmit,
  onDelete,
  menuWrapperRef,
  openMenuId,
  setOpenMenuId,
  t,
  isPostingComment,
  navigate,
}: CommentItemProps) => {
  const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0;
  const isOwner = Number(getLocalStorageItem("userId")) === Number(comment.memberId);

  const { mutate: likeComment, isPending } = useLikeDiaryComment();

  const [liked, setLiked] = useState<boolean>(!!comment.liked);
  const [likeCount, setLikeCount] = useState<number>(Number(comment.likeCount ?? 0));

  useEffect(() => {
    setLiked(!!comment?.liked);
    setLikeCount(Number(comment?.likeCount ?? 0));
  }, [comment?.commentId, comment?.liked, comment?.likeCount]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPending) return;

    const prevLiked = liked;
    const prevCount = likeCount;

    setLiked(!prevLiked);
    setLikeCount(Math.max(0, prevCount + (prevLiked ? -1 : 1)));

    likeComment(
      { commentId: comment.commentId },
      {
        onError: () => {
          setLiked(prevLiked);
          setLikeCount(prevCount);
        },
        onSuccess: (data: any) => {
          const r = data?.result ?? data;
          if (r) {
            if (typeof r.liked !== "undefined") setLiked(!!r.liked);
            if (typeof r.likeCount !== "undefined") setLikeCount(Math.max(0, Number(r.likeCount)));
          }
        },
      }
    );
  };

  return (
    <div className="p-4 border-t border-gray-200">
      {/* 작성자 */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center gap-3 mb-2 cursor-pointer"
          onClick={() => navigate(`/diaries/member/${comment.memberId}`)}
        >
          <Avatar src={comment.profileImage} alt="profile" size="w-9 h-9" />
          <span className="font-semibold text-sm">{comment.nickname ?? "사용자"}</span>
          <div className="w-[0.5px] h-5 bg-gray-500" />
          <span className="text-xs text-gray-600">@{comment.username ?? "user"}</span>
        </div>
        <p className="text-caption text-gray-500 ml-auto">{comment.createdAt}</p>

        <MoreMenuDelete
          targetId={comment.commentId}
          isOwner={isOwner}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          menuWrapperRef={menuWrapperRef}
          onDelete={onDelete}
          confirmText={t.DeleteCommentAlert}
          buttonLabel={t.DeleteDiary}
          align="left"
        />
      </div>

      {/* 본문 */}
      <p className="text-body2 mb-4 whitespace-pre-line">
        {comment.content ?? comment.commentText}
      </p>

      {/* 답글 수 + 좋아요 */}
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
        <div className="flex items-center gap-1">
          <img src="/images/CommonComponentIcon/CommentIcon.svg" className="w-5 h-5" />
          <span>{comment.replyCount ?? comment.replies?.length ?? 0}</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 disabled:opacity-60"
          disabled={isPending}
          aria-pressed={liked}
          onClick={handleLikeClick}
        >
          <img
            src={
              liked
                ? "/images/CommonComponentIcon/LikeFullIcon.svg"
                : "/images/CommonComponentIcon/LikeIcon.svg"
            }
            className="w-5 h-5 cursor-pointer"
            alt="like"
          />
          <span>{likeCount}</span>
        </button>
      </div>

      {/* 답글 리스트 */}
      {hasReplies && (
        <div className="mt-5 mb-3">
          {comment.replies.map((reply: any) => (
            <ReplyItem
              key={reply.commentId}
              reply={reply}
              depth={1}
              onDelete={onDelete}
              menuWrapperRef={menuWrapperRef}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              t={t}
              navigate={navigate}
            />
          ))}
        </div>
      )}

      {/* 답글 입력창 */}
      <div className="flex items-center gap-2">
        <textarea
          rows={1}
          placeholder={t.ReplyPlaceholder}
          className="flex-1 bg-gray-200 text-sm text-gray-800 resize-none border border-gray-300 rounded-[5px] px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-gray-200"
          value={replyTexts[comment.commentId] ?? ""}
          onChange={(e) => onReplyChange(comment.commentId, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onReplySubmit(comment.commentId);
            }
          }}
          disabled={isPostingComment}
        />
        <button
          onClick={() => onReplySubmit(comment.commentId)}
          disabled={isPostingComment || !replyTexts[comment.commentId]?.trim()}
          className="bg-gray-900 text-white text-sm px-4 py-[10px] rounded-[5px] text-caption font-semibold 
                     hover:bg-gray-800 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.CommentSubmit}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
