import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
    onClose: () => void;
}

const NavProfileModal = ({onClose}: ProfileModalProps) => {
  const [active, setActive] = useState< "edit" | "logout">();
  const navigate = useNavigate();

  const handleAction = (action: "edit" | "logout") => {
    setActive(action);

    if(action === "edit") {
      navigate("/profileedit");
    } else if(action === "logout") {
      // navigate 연결
    }
  };

  return (
    <div className="w-50 h-47 border-1 border-gray-300 bg-white rounded-[10px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)]">
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
      
      <div className="flex flex-col px-4 gap-1">
        <button
          onClick={() => handleAction("edit")}
          className={`p-2 w-40 h-8 flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform duration-300 text-body1
            ${active === "edit"
              ? "text-black bg-gray-200 rounded-[5px] font-medium"
              : "text-gray-600"
            }`}
        >
          <img 
            src={active === "edit" ? "/images/ExitOnIcon.svg" : "/images/ExitOffIcon.svg"}
            alt="프로필 수정 아이콘"
            className="w-6 h-6"
          />
          프로필 수정하기
        </button>
        <button
          onClick={() => handleAction("logout")}
          className={`p-2 w-40 h-8 flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform duration-300 text-body1
            ${active === "logout"
              ? "text-black bg-gray-200 rounded-[5px] font-medium"
              : "text-gray-600"
            }`}
        >
          <img 
            src={active === "logout" ? "/images/ExitOnIcon.svg" : "/images/ExitOffIcon.svg"}
            alt="로그아웃 아이콘"
            className="w-6 h-6"
          />
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default NavProfileModal
