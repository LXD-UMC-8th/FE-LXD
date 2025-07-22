import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import NavProfileModal from "./NavProfileModal";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(modalRef, () => setIsModalOpen(false));

  return (
    <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      {/* 로고 */}
      <NavLink to="/feed" className="flex items-center gap-2 cursor-pointer">
        <img src="/images/LXD_logo.svg" alt="LXD 로고" className="w-7 h-7" />
        <img src="/images/LXDTitleIcon.svg" alt="LXD" className="w-9 h-4" />
      </NavLink>

      {/* 알림 + 프로필 */}
      <div className="flex items-center gap-5">
        <img
          src="/images/NoticeIcon.svg"
          alt="알림"
          className="w-7 h-7 cursor-pointer"
        />
        <div
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="w-7 h-7 rounded-full bg-gray-300"></div>
          <div className="text-body2 font-semibold text-gray-800 cursor-pointer">
            이용자 님
          </div>
        </div>
      </div>

      {/* 프로필 모달 */}
      {isModalOpen && (
        <div 
          ref={modalRef}
          className="absolute top-full right-6 z-10"
        >
          <NavProfileModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
