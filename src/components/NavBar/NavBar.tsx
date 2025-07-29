import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import NavProfileModal from "./NavProfileModal";
import Notification from "./Notification";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

type OpenModal = "notifications" | "profile" | false;
const NavBar = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const [isModalOpen, setIsModalOpen] = useState<OpenModal>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(modalRef, () => setIsModalOpen(false));

// Removed unnecessary useEffect block that logged isModalOpen state.

  //해야될 것 modal은 한 번에 하나의 모달만 띄울 수 있게 설정하기
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
              isModalOpen === "notifications" ? false : "notifications",
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
          <div className="w-7 h-7 rounded-full bg-gray-300"></div>

          <div className="text-body2 font-semibold text-gray-800 cursor-pointer">
            이용자 님
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
          <NavProfileModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
