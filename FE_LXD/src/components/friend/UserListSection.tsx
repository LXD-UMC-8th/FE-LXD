interface Props {
  users: { id: string; name: string; username: string }[];
  onUserCardClick?: (user: { id: string; name: string; username: string }) => void;
  onFriendButtonClick?: (user: { id: string; name: string; username: string }) => void;
}

const UserListSection = ({ users, onUserCardClick, onFriendButtonClick }: Props) => {
  return (
    <div className="w-full bg-[#F7F8FA] rounded-lg overflow-y-auto">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="text-lg font-semibold text-black mb-6">
          총 친구 수 {users.length}명
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white hover:bg-gray-100 transition-colors cursor-pointer rounded-xl px-4 py-3 flex items-center justify-between gap-2 shadow-sm"
              onClick={() => onUserCardClick?.(user)}
            >
              {/* 유저 정보 */}
              <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
                <div className="truncate">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">@{user.username}</div>
                </div>
              </div>

              {/* 친구 버튼 - 작은 화면(sm 이하)에서는 숨김 */}
              {onFriendButtonClick && (
                <div className="shrink-0 hidden sm:block">
                  <button
                    className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFriendButtonClick(user);
                    }}
                  >
                    친구
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserListSection;


