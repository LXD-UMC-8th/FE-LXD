import Avatar from "../Common/Avatar";
interface NotificationContentProps {
  title?: string;
  body?: string;
}
const NotificationContent = ({ title }: NotificationContentProps) => {
  return (
    <div
      className="bg-white w-100 h-25 justify-start items-center gap-2 shadow-[2px_4px_30px_0px_rgba(0,0,0,0.1)] rounded-lg
    cursor-pointer hover:scale-102 transition-transform flex"
    >
      <div className="mx-4">
        <Avatar />
      </div>
      <div>
        <div className="flex">
          <span className="font-bold">@sdhuf</span>님
          {title === "requestFriend" && <div>이 친구를 요청했습니다</div>}
          {title === "tobeFriend" && <div>친구가 되었습니다</div>}
          {title === "commentCorrection" && (
            <div>이 diary.title에 교정을 추가했습니다</div>
          )}
          {title === "comment" && <div>이 diary.title에 댓글을 남겼습니다</div>}
          {title === "like" && <div>이 diary.title에 좋아요를 눌렀습니다</div>}
          {title === "reply" && <div>이 댓글에 답글을 남겼습니다</div>}
          {title === "replyCorrection" && (
            <div>이 diary.title에 제공한 교정에 답글을 추가했습니다.</div>
          )}
          <span className="text-gray-500"> &nbsp;&nbsp;&nbsp;N시간 전</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
