import Avatar from "../Common/Avatar";
import { getLocalStorageItem } from "../../apis/axios";
import MoreMenuDelete from "./MoreMenuDelete";

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
  const isOwner = Number(getLocalStorageItem("userId")) === Number(reply.memberId);

  return (
    <div style={{ marginLeft: depth * 12 }} className="mb-3">
        <div className="p-2 border-t border-gray-200"/>
      <div
        className="flex items-center gap-3 mb-2"
      >
        <div
          className="flex items-center gap-3 mb-2 cursor-pointer"
          onClick={() => navigate(`/diaries/member/${reply.memberId}`)}
        >
          <Avatar src={reply.profileImage} alt="profile" size="w-8 h-8" />
          <span className="text-sm font-semibold">{reply.nickname ?? "사용자"}</span>
          <div className="w-px h-5 bg-gray-500" />
          <span className="text-xs text-gray-600">@{reply.username ?? "user"}</span>
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

      <p className="text-sm whitespace-pre-line">{reply.content ?? reply.commentText}</p>
    </div>
  );
};

export default ReplyItem;
