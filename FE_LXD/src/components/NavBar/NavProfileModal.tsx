import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import LogoutModal from "./LogoutModal";
import AlertModal from "../Common/AlertModal";

interface ProfileModalProps {
    onClose: () => void;
}

const NavProfileModal = ({onClose}: ProfileModalProps) => {
  const [active, setActive] = useState< "edit" | "logout">();
  const navigate = useNavigate();
  const [showlogoutModal, setShowlogoutModal ] = useState(false);

  const commonIcon = {
    on: "/images/ExitOnIcon.svg",
    off: "/images/ExitOffIcon.svg",
  }
  const actions: {
    key: "edit" | "logout";
    label: string;
    onClick: () => void;
  }[] =[
    {
      key: "edit",
      label: "프로필 수정하기",
      onClick: () => {
        setActive("edit");
        navigate("/editprofile");
      }
    },
    {
      key: "logout",
      label: "로그아웃",
      onClick: () => {
        setActive("logout");
        setShowlogoutModal(true);
      },
    },
  ];

  return (
    <div className="w-55 h-50 border-1 border-gray-300 bg-white rounded-[10px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-end">
        <img 
          src="/images/DeleteButton.svg" 
          alt="창 닫기 버튼"
          className="p-3 cursor-pointer"
          onClick = {onClose}
        />
      </div>
      {/* 프로필 */}
      <div className="flex px-4 gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col">
          <div className="text-body1 font-bold">김태현 님</div>
          <div className="text-caption text-gray-600">@kimtaehxun</div>
        </div>
      </div>

      <div className="h-px my-3 mx-4 bg-gray-400"/>
      
      {/* 버튼 */}
      <div className="flex flex-col px-4">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={action.onClick}
            className={`p-2 w-45 h-10 flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform duration-300 text-body1
              ${active === action.key
                ? "text-black bg-gray-200 rounded-[5px] font-medium"
                : "text-gray-600"}`}
          >
            <img
              src={active === action.key ? commonIcon.on : commonIcon.off}
              alt={`${action.label} 아이콘`}
              className="w-6 h-6"
            />
            {action.label}
          </button>
        ))}
      </div>

      {/* 모달 */}
      {/* {showlogoutModal && <LogoutModal onClose={()=> setShowlogoutModal(false)}/>} */}
      {showlogoutModal && 
        <AlertModal 
          onClose={()=> setShowlogoutModal(false)}
          title="정말 로그아웃 하시겠습니까?"
          description="LXD에서 kimtaehyun0809@gmail.com 계정을 로그아웃 하시겠습니까?"
          confirmText="로그아웃"
          alertMessage="로그아웃이 완료되었습니다."
          onConfirm={() => navigate("/home")}
        />}
    </div>
  )
}

export default NavProfileModal
