import { useEffect, useState } from "react";
import Avatar from "../Common/Avatar";
import { getLocalStorageItem } from "../../apis/axios";
import MoreMenuDelete from "./MoreMenuDelete";
import { useLikeDiaryComment } from "../../hooks/mutations/DiaryComment/useLikeDiaryComment";

interface ReplyItemProps {
  reply: any;
  depth?: number;
  onDelete: (id: number) => void;
  menuWrapperRef: React.RefObject<HTMLDivElement | null>;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  t: any;
  navigate: (url: string) => void;
}

const ReplyItem = ({
  reply,
  depth = 1,
  onDelete,
  menuWrapperRef,
  openMenuId,
  setOpenMenuId,
  t,
  navigate,
}: ReplyItemProps) => {
  const isOwner =
    Number(getLocalStorageItem("userId")) === Number(reply.memberId);
  const { mutate: likeComment, isPending } = useLikeDiaryComment();

  const [liked, setLiked] = useState<boolean>(!!reply.liked);
  const [likeCount, setLikeCount] = useState<number>(
    Number(reply.likeCount ?? 0)
  );

  useEffect(() => {
    setLiked(!!reply?.liked);
    setLikeCount(Number(reply?.likeCount ?? 0));
  }, [reply?.commentId, reply?.liked, reply?.likeCount]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPending) return;

    const prevLiked = liked;
    const prevCount = likeCount;

    setLiked(!prevLiked);
    setLikeCount(Math.max(0, prevCount + (prevLiked ? -1 : 1)));

    likeComment(
      { commentId: reply.commentId },
      {
        onError: () => {
          setLiked(prevLiked);
          setLikeCount(prevCount);
        },
        onSuccess: (data: any) => {
          const r = data?.result ?? data;
          if (r) {
            if (typeof r.liked !== "undefined") setLiked(!!r.liked);
            if (typeof r.likeCount !== "undefined")
              setLikeCount(Math.max(0, Number(r.likeCount)));
          }
        },
      }
    );
  };

  return (
    <div style={{ marginLeft: depth * 12 }} className="mb-3">
      <div className="p-2 border-t border-gray-200" />
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center gap-3 mb-2 cursor-pointer"
          onClick={() => navigate(`/diaries/member/${reply.memberProfile.id}`)}
        >
          <Avatar
            src={reply.memberProfile.profileImage}
            alt="profile"
            size="w-8 h-8"
          />
          <span className="text-sm font-semibold">
            {reply.memberProfile.nickname ?? "사용자"}
          </span>
          <div className="w-[0.5px] h-5 bg-gray-500" />
          <span className="text-xs text-gray-600">
            @{reply.memberProfile.username ?? "user"}
          </span>
        </div>
        <span className="ml-auto text-xs text-gray-500">{reply.createdAt}</span>

        <MoreMenuDelete
          targetId={reply.commentId}
          isOwner={isOwner}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          menuWrapperRef={menuWrapperRef}
          onDelete={onDelete}
          confirmText={t.DeleteReplyAlert}
          buttonLabel={t.DeleteDiary}
          align="left"
        />
      </div>

      <p className="text-sm whitespace-pre-line">
        {reply.content ?? reply.commentText}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="ml-auto flex items-center gap-1 disabled:opacity-60"
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
          <span className="text-sm text-gray-600">{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ReplyItem;
