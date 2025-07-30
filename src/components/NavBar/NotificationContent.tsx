import Avatar from "../Common/Avatar";

type part = { type: string; value: string };
interface NotificationContentProps {
  title?: string;
  id?: number;
  profileImg?: string;
  message: { parts: part[] };
  redirectUrl?: string;
  createdAt?: string;
  read?: boolean;
}
const NotificationContent = ({
  notifications,
}: {
  notifications: NotificationContentProps;
}) => {
  return (
    <div
      className={`${
        notifications.read ? "bg-gray-200" : "bg-white"
      } w-full h-25 flex items-center gap-2 shadow-[2px_4px_30px_0px_rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:scale-102 transition-transform`}
    >
      <div className="px-4">
        <Avatar />
      </div>
      <div>
        <div className="flex">
          <p className="text-sm">
            {notifications.message.parts.map((part, idx) => {
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
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
