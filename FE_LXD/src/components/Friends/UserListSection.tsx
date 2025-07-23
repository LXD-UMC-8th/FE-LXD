interface Props {
  users: { id: string; name: string; username: string }[];
  onUserCardClick?: (user: { id: string; name: string; username: string }) => void;
  onFriendButtonClick?: (user: { id: string; name: string; username: string }) => void;
}

const UserListSection = ({ users, onUserCardClick, onFriendButtonClick }: Props) => {
  return (
    <div className="w-full">
      {/* 친구 수 텍스트 */}
      <div className="text-base font-semibold text-black mb-5 font-[Pretendard]">
        총 친구 수 {users.length}명
      </div>

      {/* 카드 레이아웃 */}
      <div className="flex flex-wrap justify-start gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-[353px] h-[87px] bg-white hover:bg-gray-100 transition-colors cursor-pointer rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-[#E5E5E5]"
            onClick={() => onUserCardClick?.(user)}
          >
            {/* 유저 정보 */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
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
                className="ml-3 px-3 py-1 text-xs text-[#747785] bg-[#EDEEF0] rounded-lg hover:bg-gray-300 transition-colors font-semibold font-[Pretendard] shrink-0 whitespace-nowrap w-12 h-8 cursor-pointer"
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
    </div>
  );
};

export default UserListSection;