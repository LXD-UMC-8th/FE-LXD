import NotificationContent from "./NotificationContent";
import { getNotifications } from "../../apis/notification";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { useNotificationReadAll } from "../../hooks/mutations/useNotification";
import { useInfiniteScroll } from "../../hooks/queries/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import type { getNotificationsResponseDTO } from "../../utils/types/notification";
import { useNotifications } from "../../hooks/mutations/useNotification";
import { QUERY_KEY } from "../../constants/key";

interface NotificationProps {
  onChangeSetting?: boolean;
  setOnChangeSetting: Dispatch<SetStateAction<boolean>>;
}
const Notification = ({ setOnChangeSetting }: NotificationProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const [_isRender, setIsRender] = useState<boolean>(false);

  const { mutate: patchReadAllNotifications } = useNotificationReadAll();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteScroll({
    queryKey: [QUERY_KEY.notifications],
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam as number, 5),
    getNextPageParam: (last: getNotificationsResponseDTO) =>
      last.result.hasNext ? last.result.page + 1 : undefined,
  });

  const { mutate: patchRedirectNotification } = useNotifications();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleReadAll = () => {
    patchReadAllNotifications(data?.pages[0].result.totalElements as number);
    setIsRender((prev) => !prev);
    setOnChangeSetting((prev) => !prev);
  };

  return (
    <div className="w-120 h-140 flex flex-col bg-white rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] overflow-y-auto overflow-x-hidden">
      <div className="bg-white p-5 rounded-t-lg border-b-1 border-gray-300">
        <div className="mt-2 flex justify-between">
          <h1 className="font-bold text-xl">{t.notificationHeader}</h1>
          <button
            className="white cursor-pointer border border-gray-500 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
            onClick={() => {
              handleReadAll();
            }}
          >
            {t.allReadInNotification}
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex-1 overflow-y-auto rounded-b-lg p-4">
        <div className="flex flex-col gap-4 justify-center items-center ">
          {!data?.pages[0].result.totalElements ? (
            <div className="flex items-center text-gray-500 justify-center flex-col h-full">
              {t.ContentNotification}
            </div>
          ) : (
            data.pages.flatMap((page) =>
              page.result.contents.map((note, _idx) => (
                <div
                  onClick={() => {
                    patchRedirectNotification({ notificationId: note.id });
                    setOnChangeSetting((onChangeSetting) => !onChangeSetting);
                  }}
                  key={_idx}
                >
                  <NotificationContent
                    notifications={note}
                    onClick={() => setIsRender((prev) => !prev)}
                  />
                </div>
              ))
            )
          )}
        </div>
        <div ref={ref} />
        {!isFetching && hasNextPage && (
          <div className="flex items-center text-gray-500 justify-center flex-col h-40">
            <div className="w-10 h-10 mb-4 border-4 border-gray-200 border-t-gray-300 rounded-full animate-spin" />
            {t.LoadingNotification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
