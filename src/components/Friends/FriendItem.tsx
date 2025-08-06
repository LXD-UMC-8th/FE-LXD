import Avatar from "../Common/Avatar";

interface FriendItemProps {
  name: string;
  username: string;
  image?: string;
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
      className={`h-[87px] px-4 py-3 rounded-xl flex items-center gap-4 font-[Pretendard] cursor-pointer ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-100"
      }`}
    >
      {/* 프로필 클릭 영역 */}
      <div className="flex items-center gap-4 flex-1" onClick={onClick}>
        <Avatar src={image} alt={`${name} profile`} size="w-10 h-10" />
        <div className="flex flex-col">
          <div className="text-sm font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">@{username}</div>
        </div>
      </div>

      {/* X 버튼 */}
      {showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭 이벤트 막기
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
