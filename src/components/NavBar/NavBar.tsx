import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import NavProfileModal from "./NavProfileModal";
import Notification from "./Notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import Avatar from "../Common/Avatar";
import { getMemberProfile } from "../../apis/members";
import type { MemberProfileDTO } from "../../utils/types/member";
import { getSubscribeToNotifications } from "../../apis/notification";

type OpenModal = "notifications" | "profile" | false;
const NavBar = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const [isModalOpen, setIsModalOpen] = useState<OpenModal>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [profileData, setProfileData] = useState<
    MemberProfileDTO | undefined
  >();

  useOutsideClick(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    getMemberProfile().then((data) => {
      setProfileData(data?.result);
      console.log("Profile data: ", data?.result);
    });
  }, []);
  
  useEffect(() => {
    let es: EventSource | null = null;
    const setupSSE = () => {
      if (es) {
        es.close();
      }
      es = getSubscribeToNotifications();
    };

    setupSSE();

    const intervalId = setInterval(() => {
      console.log("🔁 Re-subscribing to SSE after 50 minutes...");
      setupSSE();
    }, 50 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      if (es) es.close();
    };
  }, []);

  return (
    <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      {/* 로고 */}
      <NavLink to="/feed" className="flex items-center gap-2 cursor-pointer">
        <img src="/images/LXD_logo.svg" alt="LXD 로고" className="w-7 h-7" />
        <img src="/images/LXDTitleIcon.svg" alt="LXD" className="w-9 h-4" />
      </NavLink>

      {/* 알림 + 프로필 */}
      <div className="flex items-center gap-5">
        <div
          onClick={() =>
            setIsModalOpen(
              isModalOpen === "notifications" ? false : "notifications"
            )
          }
        >
          <img
            src="/images/NoticeIcon.svg"
            alt={t.alertImage}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
        <div
          className="flex items-center gap-2"
          onClick={() =>
            setIsModalOpen(isModalOpen === "profile" ? false : "profile")
          }
        >
          <div className="cursor-pointer">
            <Avatar src={profileData?.profileImg ?? undefined} size="w-8 h-8" />
          </div>

          <div className="text-body2 font-semibold text-gray-800 cursor-pointer">
            {profileData?.nickname}&nbsp;{t.User}
          </div>
        </div>
      </div>

      {/* 알림 모달 */}
      {isModalOpen === "notifications" && (
        <div ref={modalRef} className="absolute top-full right-20 z-10 mt-2">
          <Notification />
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
    </div>
  );
};

export default NavBar;
