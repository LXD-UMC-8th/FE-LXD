import { useState } from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";

const FindTab = () => {
  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun" },
    { id: "2", name: "홍길동", username: "honggildong" },
    { id: "3", name: "김태현", username: "kimtaehyun" },
    { id: "4", name: "김태현", username: "kimtaehyun" },
  ];

  const selectedUser = friendList.find((f) => f.username === selectedUsername);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const onClearSelection = () => {
    setSelectedUsername(null);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-[400px] bg-white">
        <FriendListPanel
          onSelect={setSelectedUsername}
          selectedUsername={selectedUsername}
        />
      </div>
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-gray-400">
        {selectedUser ? (
          <ProfileView user={selectedUser} onClose={onClearSelection} />
        ) : (
          <span className="text-lg font-medium">
            전세계에서 친구를 찾아보세요.
          </span>
        )}
      </div>
    </div>
  );
};

export default FindTab;
