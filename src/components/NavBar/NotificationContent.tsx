import Avatar from "../Common/Avatar";
import type { NotificationContentProps } from "../../utils/types/notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { postFriendAccept, patchFriendRefuse } from "../../apis/friend";
import { useNavigate } from "react-router-dom";

const NotificationContent = ({
  notifications,
}: {
  notifications: NotificationContentProps;
  onClick?: () => void;
}) => {
  const { language } = useLanguage();
  const t = translate[language];

  const handleAcceptFriend = () => {
    // notifications.redirectUrl에서 memberId 추출
    const requesterId = notifications.redirectUrl?.split("/members/")[1];
    if (requesterId) {
      postFriendAccept(Number(requesterId));
      navigate(`/friendslist`, { state: { select: 1 } });
    }
  };
  const handleRefuseFriend = () => {
    // notifications.redirectUrl에서 memberId 추출
    const requesterId = notifications.redirectUrl?.split("/members/")[1];
    console.log("requesterId", requesterId, typeof Number(requesterId));
    if (requesterId) {
      patchFriendRefuse(Number(requesterId));
    }
  };

  const navigate = useNavigate();

  const navigateToEvent = () => {
    if (notifications.redirectUrl?.startsWith("/diaries")) {
      const diaryId = notifications.redirectUrl
        .split("/diaries/")[1]
        .split("/")[0];
      navigate(`/feed/${diaryId}`);
    }
  };
  return (
    <div
      className={`${
        notifications.read ? "bg-gray-200" : "bg-white"
      } w-115 h-25 flex items-center shadow-[2px_4px_30px_0px_rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:scale-102 transition-transform`}
      role="link"
      onClick={navigateToEvent}
    >
      <div className="pl-4 w-22">
        <Avatar src={notifications.profileImg} />
      </div>
      <div>
        <div className="flex">
          <p className="text-sm">
            {notifications.messageParts.map((part, idx) => {
              if (part.type === "bold") {
                return (
                  <span key={idx} className="font-bold">
                    {part.value}
                  </span>
                );
              } else {
                return <span key={idx}>{part.value}</span>;
              }
            })}
            <span className="text-gray-500">
              &nbsp;&nbsp;&nbsp; {notifications.createdAt}
            </span>
          </p>
          {notifications.buttonField && (
            <div
              className="ml-auto flex items-center mr-10 gap-1"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={handleAcceptFriend}
                className="px-3 py-1 bg-blue-500 text-white border rounded hover:bg-blue-600 cursor-pointer min-w-fit"
              >
                {t.notificationButtonText1}
              </button>
              <button
                onClick={handleRefuseFriend}
                className="px-3 py-1 bg-white text-black border border-gray-500 rounded hover:bg-gray-200 cursor-pointer min-w-fit"
              >
                {t.notificationButtonText2}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
