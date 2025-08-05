import Avatar from "../Common/Avatar";
import type {
  NotificationContentProps,
  patchRedirectNotificationRequestDTO,
} from "../../utils/types/notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useNavigate } from "react-router-dom";
import { postFriendAccept, postFriendRefuse } from "../../apis/friend";
import type { FriendRequesterId } from "../../utils/types/friend";
import { patchRedirectNotification } from "../../apis/notification";

const NotificationContent = ({
  notifications,
}: {
  notifications: NotificationContentProps;
}) => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  const handleAcceptFriend = () => {
    postFriendAccept(notifications.id as FriendRequesterId);
    patchRedirectNotification(
      notifications.id as patchRedirectNotificationRequestDTO,
    );
  };
  const handleRefuseFriend = () => {
    postFriendRefuse(notifications.id as FriendRequesterId);
    patchRedirectNotification(
      notifications.id as patchRedirectNotificationRequestDTO,
    );
  };

  const handleNotificationContentClick = () => {
    patchRedirectNotification(
      notifications.id as patchRedirectNotificationRequestDTO,
    );
  };

  return (
    <div
      className={`${
        notifications.read ? "bg-gray-200" : "bg-white"
      } w-full h-25 flex items-center shadow-[2px_4px_30px_0px_rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:scale-102 transition-transform`}
      //redirectUrl이 없다면 활성화되면 안 되는 건데 이 거는 어떻게 처리?
      role="link"
      onClick={handleNotificationContentClick}
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
