import { useState } from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";

const FindTab = () => {
  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun" },
    { id: "2", name: "홍길동", username: "honggildong" },
    { id: "3", name: "이지은", username: "jieun" },
  ];

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const selectedUser = friendList.find((f) => f.username === selectedUsername);

  const onClearSelection = () => setSelectedUsername(null);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8F9FA] font-[Pretendard]">
      {/* 친구 목록 패널 */}
      <div className="hidden lg:block w-[420px] border-r border-gray-200 bg-white">
        <FriendListPanel
          onSelect={setSelectedUsername}
          selectedUsername={selectedUsername}
        />
      </div>

      {/* 우측 본문 */}
      <div
        className="
          flex-1 flex items-center justify-center bg-[#F8F9FA]
          px-4 sm:px-6 md:px-10 max-w-full md:max-w-[700px] mx-auto
        "
      >
        {selectedUser ? (
          <ProfileView user={selectedUser} onClose={onClearSelection} />
        ) : (
          <div className="flex flex-col items-center justify-center bg-[#F5F7FE] w-full h-[60%] rounded-xl text-center px-6">
            <p className="text-xl font-semibold text-gray-900">
              전 세계에서 친구를 찾아보세요
            </p>
            <p className="text-sm text-gray-500 mt-2">
              검색창에 아이디를 입력해서 친구를 찾아보세요.
            </p>
            <p className="text-sm text-gray-500">
              다른 사람들과 친구를 맺고, 다이어리를 구경해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTab;
