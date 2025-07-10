import React from "react";

interface User {
  id: string;
  name: string;
  username: string;
}

interface Props {
  users: User[];
  onUserCardClick?: (user: User) => void;
  onFriendButtonClick?: (user: User) => void;
}

const UserListSection: React.FC<Props> = ({
  users,
  onUserCardClick,
  onFriendButtonClick,
}) => {
  return (
    <div
      className="rounded-lg overflow-y-auto"
      style={{
        width: "1089px",
        height: "803px",
        backgroundColor: "#F7F8FA",
      }}
    >
      <div className="px-8 pt-6">
        {/* 친구 수 */}
        <div className="text-[20px] font-[#000000] font-[Pretendard] font-semibold mb-6">
          총 친구 수 {users.length}명
        </div>

        {/* 유저 카드 그리드 */}
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 h-[68px] rounded-xl bg-white hover:bg-[#EDEEF0] cursor-pointer transition-colors"
              onClick={() => {
                onUserCardClick?.(user);
              }}
            >
              {/* 유저 정보 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div className="leading-tight">
                  <div className="text-[16px] font-[Pretendard] font-[#080808] font-semibold">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    @{user.username}
                  </div>
                </div>
              </div>

              {/* 친구 버튼 */}
              <button
                className="px-3 py-1 text-xs text-gray-600 bg-[#EDEEF0] rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
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

