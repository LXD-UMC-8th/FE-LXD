import NotificationContent from "./NotificationContent";
import {
  subscribeToNotifications,
  fetchNotifications,
} from "../../apis/notification";
import { useEffect } from "react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import type { NotificationContentProps } from "../../utils/types/notification";

const Notification = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const [_notifications, setNotifications] =
    useState<NotificationContentProps>();

  useEffect(() => {
    let es: EventSource | null = null;
    const setupSSE = () => {
      if (es) {
        es.close();
      }
      es = subscribeToNotifications();

      es.onopen = (data) => {
        console.log("📡 onopen: connection established.", data);
      };
      es.onerror = (err) => console.error("❗onerror:", err);
    };

    setupSSE();

    fetchNotifications().then((pastNotifs) => {
      console.log("pastNotifs", pastNotifs);
      setNotifications(pastNotifs.result?.content || []);
      console.log(_notifications);
    });

    const intervalId = setInterval(() => {
      console.log("🔁 Re-subscribing to SSE after 50 minutes...");
      setupSSE();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (es) es.close();
    };
  }, []);

  const handleReadAll = () => {
    console.log("모두 읽음 클릭됨");
  };
  return (
    <div className="w-120 h-150 flex flex-col bg-white rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-white p-5 rounded-t-lg border-b-1 border-gray-300">
        <div className="mt-2 flex justify-between">
          <h1 className="font-bold text-xl">{t.notificationHeader}</h1>
          <button
            className="white cursor-pointer border border-gray-500 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
            onClick={handleReadAll}
          >
            {t.allReadInNotification}
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex-1 overflow-y-auto rounded-b-lg p-4">
        <div className="flex flex-col gap-4 justify-center items-center ">
          {!_notifications ? (
            <div className="flex items-center text-gray-500 justify-center flex-col h-full">
              <div
                className="
            w-10 h-10 mb-4 border-4 border-gray-200
            border-t-gray-300 rounded-full animate-spin
          "
              />
              Loading notifications...
            </div>
          ) : (
            _notifications.map((_note) => (
              <NotificationContent key={_note.id} notifications={_note} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
