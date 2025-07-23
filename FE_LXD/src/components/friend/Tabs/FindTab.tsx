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
      {/*  친구 목록 패널: lg 이상일 때만 표시 */}

      <div className="hidden lg:block w-[419px] border-r border-gray-200 bg-white">
        <FriendListPanel
          onSelect={setSelectedUsername}
          selectedUsername={selectedUsername}
        />
      </div>

      {/*  우측 본문 */}
      <div
        className="
          flex-1 flex items-center justify-center bg-[#F8F9FA] 
          px-4 sm:px-6 md:px-10
          max-w-full md:max-w-[700px] mx-auto
        "
      >
        {selectedUser ? (
          <ProfileView user={selectedUser} onClose={onClearSelection} />
        ) : (
          <div className="text-center text-gray-400 px-4">
            <p className="text-lg font-semibold">
              전세계에서 친구를 찾아보세요
            </p>
            <p className="text-sm mt-1">아이디를 검색해서</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTab;
