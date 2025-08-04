import Avatar from "../Common/Avatar";
import type { NotificationContentProps } from "../../utils/types/notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const NotificationContent = ({
  notifications,
}: {
  notifications: NotificationContentProps;
}) => {
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div
      className={`${
        notifications.read ? "bg-gray-200" : "bg-white"
      } w-full h-25 flex items-center shadow-[2px_4px_30px_0px_rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:scale-102 transition-transform`}
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
            <div className="ml-auto flex items-center mr-10 gap-1">
              <button className="px-3 py-1 bg-blue-500 text-white border rounded hover:bg-blue-600 cursor-pointer min-w-fit">
                {t.notificationButtonText1}
              </button>
              <button className="px-3 py-1 bg-white text-black border border-gray-500 rounded hover:bg-gray-200 cursor-pointer min-w-fit">
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
