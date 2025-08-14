import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import LogoutModal from "./LogoutModal";
import AlertModal from "../Common/AlertModal";
import type { MemberProfileDTO } from "../../utils/types/member";
import { useLanguage, Language } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import Avatar from "../Common/Avatar";
import { removeLocalStorageItem } from "../../apis/axios";

interface ProfileModalProps {
  onClose: () => void;
  profileData?: MemberProfileDTO;
}

const NavProfileModal = ({ onClose, profileData }: ProfileModalProps) => {
  const [active, setActive] = useState<"edit" | "logout">();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { language } = useLanguage();
  const t = translate[language];

  const commonIcon = {
    on: "/images/ExitOnIcon.svg",
    off: "/images/ExitOffIcon.svg",
  };
  const actions: {
    key: "edit" | "logout";
    label: string;
    onClick: () => void;
  }[] = [
    {
      key: "edit",
      label: t.EditProfile,
      onClick: () => {
        setActive("edit");
        navigate("/editprofile");
      },
    },
    {
      key: "logout",
      label: t.SignOut,
      onClick: () => {
        setActive("logout");
        setShowLogoutModal(true);
      },
    },
  ];
  const alertMessage = t.CompleteLogOut;
  const handleSignout = () => {
    if (alertMessage) {
      alert(alertMessage);
    }
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
    onClose();
    navigate("/home");
  };

  return (
    <div className="w-55 h-50 border-1 border-gray-300 bg-white rounded-[10px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-end">
        <img
          src="/images/DeleteButton.svg"
          alt="close button"
          className="p-3 cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 프로필 */}
      <div className="flex px-4 gap-3">
        <div className="px-1">
          <Avatar src={profileData?.profileImg ?? undefined} />
        </div>
        <div className="flex flex-col">
          <div className="text-body1 font-bold">
            {profileData?.username}&nbsp;{t.User}
          </div>
          <div className="text-caption text-gray-600">
            @{profileData?.nickname}
          </div>
        </div>
      </div>

      <div className="h-px my-3 mx-4 bg-gray-400" />

      {/* 버튼 */}
      <div className="flex flex-col px-4">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={action.onClick}
            className={`p-2 w-45 h-10 flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform duration-300 text-body1
              ${
                active === action.key
                  ? "text-black bg-gray-200 rounded-[5px] font-medium"
                  : "text-gray-600"
              }`}
          >
            <img
              src={active === action.key ? commonIcon.on : commonIcon.off}
              alt={`${action.label}`}
              className="w-6 h-6"
            />
            {action.label}
          </button>
        ))}
      </div>

      {/* 모달 */}
      {/* {showLogoutModal && <LogoutModal onClose={()=> setShowLogoutModal(false)}/>} */}
      {showLogoutModal && (
        <AlertModal
          onClose={() => setShowLogoutModal(false)}
          title={t.WantToLogOut}
          description={
            language === Language.KOREAN
              ? `${t.LogOutStatementFront} ${profileData?.email} ${t.LogOutStatementBack}`
              : `${t.LogOutStatementFront} ${profileData?.email} ${t.LogOutStatementBack}`
          }
          confirmText={t.SignOut}
          alertMessage={t.CompleteLogOut}
          onConfirm={handleSignout}
        />
      )}
    </div>
  );
};

export default NavProfileModal;
