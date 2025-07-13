import React from "react";

interface ProfileModalProps {
  user: {
    name: string;
    username: string;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onUnfriendClick,
}:ProfileModalProps ) => {
  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
        {/* 프로필 상단 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-300" />
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {user.name}
              </div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onUnfriendClick}
            className="min-w-[144px] py-2 rounded-lg bg-[#4170FE] text-[#FFFFFF] text-sm font-medium hover:bg-blue-700 cursor-pointer"
          >
            친구
          </button>
          <button className="min-w-[144px] py-2 rounded-lg bg-[#EDF3FE] text-[#618BFD] text-sm font-medium hover:bg-gray-200">
            다이어리 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
