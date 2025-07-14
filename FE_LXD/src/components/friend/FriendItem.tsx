import React from "react";

interface FriendItemProps {
  name: string;
  username: string;
  isSelected: boolean;
  onClick: () => void;
}

const FriendItem = ({
  name,
  username,
  isSelected,
  onClick,
}: FriendItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`h-[87px] cursor-pointer px-4 py-3 rounded-xl flex items-center gap-4 font-[Pretendard] ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-100"
      }`}
    >
      {/* 프로필 이미지 자리 */}
      <div className="w-10 h-10 rounded-full bg-gray-200" />

      {/* 이름과 아이디 */}
      <div className="flex flex-col">
        <div className="text-sm font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">@{username}</div>
      </div>

      {/* X 버튼 - 최근 검색에서 쓸 때만 조건부로 보여주기 가능 */}
      <div className="ml-auto text-gray-400 hover:text-gray-600 text-lg">✕</div>
    </li>
  );
};

export default FriendItem;
