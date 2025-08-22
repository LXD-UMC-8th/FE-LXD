import { useEffect, useRef, useState } from "react";
import { data, NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import NavProfileModal from "./NavProfileModal";
import Notification from "./Notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import Avatar from "../Common/Avatar";
import { getMemberProfile } from "../../apis/members";
import type { MemberProfileDTO } from "../../utils/types/member";
import { getSubscribeToNotifications } from "../../apis/notification";
import { getNotifications } from "../../apis/notification";
import type { NotificationContentProps } from "../../utils/types/notification";

type OpenModal = "notifications" | "profile" | false;
const NavBar = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const [isModalOpen, setIsModalOpen] = useState<OpenModal>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [profileData, setProfileData] = useState<
    MemberProfileDTO | undefined
  >();
  const [_hasAnyRead, setHasAnyRead] = useState(false);
  const [onChangeSetting, setOnChangeSetting] = useState<boolean>(false);
  useOutsideClick(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    console.log("Setting up SSE");

    const es = getSubscribeToNotifications();
    es.addEventListener("notification", (event) => {
      console.log("📨 새 알림 도착:", event);
      // 알림 UI 업데이트 등
    });
    es.addEventListener("read", (event) => {
      console.log("📨 알림 읽음:", event);
      setOnChangeSetting((prev) => !prev);
    });

    es.addEventListener("connect", (event) => {
      console.log("📨 SSE 연결 성공:", event);
    });

    es.addEventListener("notification-created", (event) => {
      console.log("📨 새 알림:", event);
    });

    es.addEventListener("notification-deleted", (event) => {
      console.log("📨 알림 삭제됨:", event);
      setOnChangeSetting((prev) => !prev);
    });

    es.onmessage = (event) => {
      console.log("SSE message:", event.data);
      setOnChangeSetting((prev) => !prev);
    };

    es.onopen = () => {
      console.log("SSE connection opened");
      console.log("readyState (onopen):", es.readyState);
    };

    es.onerror = (error) => {
      console.error("SSE error:", error);
    };

    console.log("readyState:", es.readyState); // this line happens too early, before it's open

    return () => {
      es.close();
    };
  }, []);

  useEffect(() => {
    getMemberProfile().then((data) => {
      setProfileData(data?.result);
    });
  }, []);

  useEffect(() => {
    const checkReadStatus = async () => {
      const TotalData = await getNotifications(1, 30);
      const result = TotalData.result.contents?.every(
        (note: NotificationContentProps) => note.read === true
      );
      console.log("TotalData", result);
      setHasAnyRead(result);
    };

    checkReadStatus();
  }, [onChangeSetting, _hasAnyRead]);

  return (
    <>
      <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6">
        {/* 로고 */}
        <NavLink to="/feed" className="flex items-center gap-2 cursor-pointer">
          <img src="/images/LXD_logo.svg" alt="LXD" className="w-7 h-7" />
          <img src="/images/LXDTitleIcon.svg" alt="LXD" className="w-9 h-4" />
        </NavLink>

        {/* 알림 + 프로필 */}
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              setIsModalOpen(
                isModalOpen === "notifications" ? false : "notifications"
              );
              setOnChangeSetting((onChangeSetting) => !onChangeSetting);
            }}
          >
            {/* 알림 아이콘 25.08.20 알람이 전혀 없을 때 빨간 점이 뜨는 bug있음. */}
            {!_hasAnyRead ? (
              <img
                src="/images/NotificationAlertIcon.svg"
                alt={t.alertImage}
                className="w-7 h-7 cursor-pointer"
              />
            ) : (
              <img
                src="/images/NoticeIcon.svg"
                alt={t.alertImage}
                className="w-7 h-7 cursor-pointer"
              />
            )}
          </div>
          <div
            className="flex items-center gap-2"
            onClick={() =>
              setIsModalOpen(isModalOpen === "profile" ? false : "profile")
            }
          >
            <div className="cursor-pointer">
              <Avatar
                src={profileData?.profileImg ?? undefined}
                size="w-8 h-8"
              />
            </div>

            <div className="text-body2 font-semibold text-gray-800 cursor-pointer">
              {profileData?.nickname}&nbsp;{t.User}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 모달 */}
      {isModalOpen === "notifications" && (
        <div ref={modalRef} className="absolute top-full right-20 z-10 mt-2">
          <Notification
            onChangeSetting={_hasAnyRead}
            setOnChangeSetting={setHasAnyRead}
          />
        </div>
      )}

      {/* 프로필 모달 */}
      {isModalOpen === "profile" && (
        <div ref={modalRef} className="absolute top-full right-6 z-10 mt-2">
          <NavProfileModal
            onClose={() => setIsModalOpen(false)}
            profileData={profileData ?? undefined}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
