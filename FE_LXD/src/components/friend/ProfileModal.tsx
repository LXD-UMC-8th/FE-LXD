import React from "react";

interface Props {
  user: {
    name: string;
    username: string;
  };
  onClose: () => void;
  onUnfriendClick: () => void;
}

const ProfileModal: React.FC<Props> = ({ user, onClose, onUnfriendClick }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-300" />
            <div>
              <div className="text-xl font-bold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onUnfriendClick}
            className="w-36 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
          >
            친구
          </button>
          <button className="w-36 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium">
            다이어리 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
