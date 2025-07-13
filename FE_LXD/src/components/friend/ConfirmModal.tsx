import React from "react";

interface ConfirmModalProps {
  user: {
    name: string;
    username: string;
  };
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  user,
  onConfirm,
  onClose,
}: ConfirmModalProps ) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl text-center">
        <div className="text-gray-800 font-semibold text-base mb-6">
          {user.name}님과 친구를 취소하시겠습니까?
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-[#3461F4] text-[#F9F9FB] text-sm font-medium hover:bg-blue-700"
          >
            친구 취소하기
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#DCE7FD] text-[#5076F3] text-sm font-medium hover:bg-gray-200 cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
