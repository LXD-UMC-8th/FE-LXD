import Avatar from "../Common/Avatar";

interface FriendItemProps {
  name: string;
  username: string;
  image?: string; // 프로필 이미지 경로 (없으면 기본 Avatar 사용)
  isSelected: boolean;
  onClick: () => void;
  showDelete?: boolean; // X 버튼 노출 여부
}

const FriendItem = ({
  name,
  username,
  image,
  isSelected,
  onClick,
  showDelete = true,
}: FriendItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`h-[87px] cursor-pointer px-4 py-3 rounded-xl flex items-center gap-4 font-[Pretendard] ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-100"
      }`}
    >
      {/* 프로필 이미지 */}
      <Avatar src={image} alt={`${name} profile`} size="w-10 h-10" />

      {/* 이름과 아이디 */}
      <div className="flex flex-col">
        <div className="text-sm font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">@{username}</div>
      </div>

      {/* X 버튼 - showDelete가 true일 때만 노출 */}
      {showDelete && (
        <div className="ml-auto text-gray-400 hover:text-gray-600 text-lg">✕</div>
      )}
    </li>
  );
};

export default FriendItem;
