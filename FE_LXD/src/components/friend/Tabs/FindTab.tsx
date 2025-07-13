import React from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";

interface FindTabProps {
  selectedUsername: string | null;
  onSelect: (username: string | null) => void;

  onClearSelection: () => void;
  friendList: { id: string; name: string; username: string }[];
}

export default function FindTab({
  selectedUsername,
  onSelect,
  onClearSelection,
  friendList,
}: FindTabProps) {
  const selectedUser = friendList.find((f) => f.username === selectedUsername);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-[400px] bg-white">
        <FriendListPanel
          onSelect={onSelect}
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
}
