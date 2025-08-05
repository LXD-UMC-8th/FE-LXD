import NotificationContent from "./NotificationContent";
import {
  getSubscribeToNotifications,
  getNotifications,
} from "../../apis/notification";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useNotificationReadAll } from "../../hooks/mutations/useNotification";
import { useInfiniteScroll } from "../../hooks/queries/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import type { getNotificationsResponseDTO } from "../../utils/types/notification";
const Notification = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const [_isRender, setIsRender] = useState<boolean>(false);

  const { mutate: patchReadAllNotifications } = useNotificationReadAll();

  //infinite scroll
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteScroll({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam as number),
    getNextPageParam: (last: getNotificationsResponseDTO) =>
      last.result.hasNext ? last.result.page + 1 : undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    let es: EventSource | null = null;
    const setupSSE = () => {
      if (es) {
        es.close();
      }
      es = getSubscribeToNotifications();

      es.onopen = (data) => {
        console.log("📡 onopen: connection established.", data);
      };
      es.onerror = (err) => console.error("❗onerror:", err);
    };

    setupSSE();

    const intervalId = setInterval(
      () => {
        console.log("🔁 Re-subscribing to SSE after 50 minutes...");
        setupSSE();
      },
      50 * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
      if (es) es.close();
    };
  }, []);

  const handleReadAll = () => {
    console.log("모두 읽음 클릭됨");
    patchReadAllNotifications();
    setIsRender((prev) => !prev);
  };

  return (
    <div className="w-120 h-140 flex flex-col bg-white rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] overflow-y-auto">
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
          {!data ? (
            <div className="flex items-center text-gray-500 justify-center flex-col h-full">
              새로운 알림이 없습니다.
            </div>
          ) : (
            data.pages.flatMap((page) =>
              page.result.contents.map((note) => (
                <NotificationContent key={note.id} notifications={note} />
              )),
            )
          )}
        </div>
        <div ref={ref} />
        {!isFetching && hasNextPage && (
          <div className="flex items-center text-gray-500 justify-center flex-col h-40">
            <div className="w-10 h-10 mb-4 border-4 border-gray-200 border-t-gray-300 rounded-full animate-spin" />
            Loading notifications...
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
