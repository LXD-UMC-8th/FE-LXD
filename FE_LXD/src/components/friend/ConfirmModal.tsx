import React from "react";

interface Props {
  user: {
    name: string;
    username: string;
  };
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<Props> = ({ user, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl text-center">
        <div className="text-gray-800 font-semibold text-base mb-6">
          {user.name}님과 친구를 취소하시겠습니까?
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-[#3461F4] text-white text-sm font-medium cursor-pointer hover:bg-blue-700"
          >
            친구 취소하기
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium cursor-pointer hover:bg-gray-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;