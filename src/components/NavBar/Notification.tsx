import NotificationContent from "./NotificationContent";
import {
  subscribeToNotifications,
  fetchNotifications,
} from "../../apis/notification";
import { useEffect } from "react";
import { useState } from "react";

const Notification = () => {
  //mock data
  const notifications = [
    {
      id: 20,
      profileImg: "string",
      message: {
        parts: [
          { type: "bold", value: "@hyunzzip" },
          { type: "text", value: "님이 친구 요청을 보냈습니다." },
        ],
      },
      redirectUrl: "/>H9L$lr=yXC+B*",
      createdAt: "2025. 07. 30 오후 03:07",
      read: false,
    },
    {
      id: 31,
      profileImg: "string",
      message: {
        parts: [
          { type: "bold", value: "@hyunzzip" },
          { type: "text", value: "님이 친구 요청을 보냈습니다." },
        ],
      },
      redirectUrl: "/>H9L$lr=yXC+B*",
      createdAt: "2025. 07. 30 오후 02:07",
      read: true,
    },
  ];
  const [_notifications, setNotifications] = useState(notifications);
  // useEffect(() => {
  //   const es = subscribeToNotifications<any>(
  //     (newNotif) => {
  //       console.log("got a new notif:", newNotif);
  //     },
  //     (err) => {
  //       console.error("SSE crashed", err);
  //     },
  //   );
  //   console.log("subscribe notification", es);

  //   fetchNotifications().then((pastNotifs) => {
  //     setNotifications((prev) => [...prev, pastNotifs]);
  //   });
  // }, []);

  const handleReadAll = () => {
    console.log("모두 읽음 클릭됨");
  };
  return (
    <div className="w-120 h-150 flex flex-col bg-white rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-white p-5 rounded-t-lg border-b-1 border-gray-300">
        <div className="mt-2 flex justify-between">
          <h1 className="font-bold text-xl">알림</h1>
          <button className="white cursor-pointer" onClick={handleReadAll}>
            모두 읽음
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex-1 overflow-y-auto rounded-b-lg p-4">
        <div className="flex flex-col gap-4 justify-center items-center ">
          {notifications.map((_note) => (
            // 2) Use map to repeat — **always** give a unique key
            <NotificationContent key={_note.id} notifications={_note} />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Notification;
