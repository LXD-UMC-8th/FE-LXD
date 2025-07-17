interface User {
  id: string;
  name: string;
  username: string;
}

interface UserListSectionProps {
  users: User[];
  onUserCardClick?: (user: User) => void;
  onFriendButtonClick?: (user: User) => void;
}

const UserListSection = ({
  users,
  onUserCardClick,
  onFriendButtonClick,
}: UserListSectionProps) => {
  return (
    <div className="w-full h-[803px] bg-[#F7F8FA] rounded-lg overflow-y-auto">
      <div className="px-8 pt-6">
        {/* 친구 수 */}
        <div className="text-lg font-semibold text-black mb-6">
          총 친구 수 {users.length}명
        </div>

        {/* 유저 카드 그리드 */}
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between h-[68px] px-4 rounded-xl bg-white hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => onUserCardClick?.(user)}
            >
              {/* 유저 정보 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </div>
              </div>

              {/* 친구 버튼 */}
              <button
                className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onFriendButtonClick?.(user);
                }}
              >
                친구
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserListSection;
