// src/components/Friends/FriendItem.tsx
import Avatar from "../Common/Avatar";

const API = import.meta.env.VITE_API_BASE_URL;

export type ImageLike = {
  profileImageUrl?: string | null;
  profileImage?: string | null;
  profileUrl?: string | null;
};

// 상대 경로를 절대 경로로 보정
export const toAbsoluteImg = (u?: string | null) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return `${API}${u.startsWith("/") ? u : `/${u}`}`;
};

// 응답 형태가 달라도 최선의 키를 집어옴
export const pickProfileImage = (m: ImageLike) =>
  toAbsoluteImg(m.profileImageUrl ?? m.profileImage ?? m.profileUrl ?? "");

interface FriendItemProps {
  name: string;
  username: string;
  image?: string | null;
  isSelected: boolean;
  onClick: () => void;
  showDelete?: boolean; // X 버튼 표시 여부
  onDelete?: () => void; // X 버튼 클릭 이벤트
}

const FriendItem = ({
  name,
  username,
  image,
  isSelected,
  onClick,
  showDelete = true,
  onDelete,
}: FriendItemProps) => {
  return (
    <li
      className={`h-[87px] px-4 py-3 rounded-xl flex items-center gap-4 cursor-pointer ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-100"
      }`}
    >
      {/* 프로필 클릭 영역 */}
      <div className="flex items-center gap-4 flex-1" onClick={onClick}>
        <Avatar src={image || ""} alt={`${name} profile`} size="w-10 h-10" />
        <div className="flex flex-col">
          <div className="text-sm font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">@{username}</div>
        </div>
      </div>

      {/* X 버튼 */}
      {showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-auto text-gray-400 hover:text-gray-600 text-lg"
        >
          ✕
        </button>
      )}
    </li>
  );
};

export default FriendItem;
