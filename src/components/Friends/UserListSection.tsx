import Avatar from "../Common/Avatar";
import UserListSkeleton from "./Skeleton/UserListSkeleton";


interface Props {
  users: { id: string; name: string; username: string; image?: string }[];
  isLoading?: boolean;
  onUserCardClick?: (user: { id: string; name: string; username: string }) => void;
  onFriendButtonClick?: (user: { id: string; name: string; username: string }) => void;
}

const UserListSection = ({ users, isLoading, onUserCardClick, onFriendButtonClick }: Props) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="w-full flex flex-col items-center px-4">
        <div className="text-lg font-semibold text-black mb-4 self-start">
          총 친구 수 {isLoading ? 0 : users.length}명
        </div>

        {isLoading ? (
          <UserListSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white hover:bg-gray-100 transition-colors cursor-pointer rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-[#E5E5E5]"
                onClick={() => onUserCardClick?.(user)}
              >
                {/* 유저 정보 */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar src={user.image} alt={user.name} size="w-10 h-10" />
                  <div className="truncate">
                    <div className="text-sm font-semibold text-gray-900 truncate font-[Pretendard]">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate font-[Pretendard]">
                      @{user.username}
                    </div>
                  </div>
                </div>

                {/* 친구 버튼 */}
                {onFriendButtonClick && (
                  <button
                    className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors font-[Pretendard] shrink-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFriendButtonClick(user);
                    }}
                  >
                    친구
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListSection;
