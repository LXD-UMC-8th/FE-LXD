import { useState } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import ConfirmModal from "../ConfirmModal";

const FriendTab = () => {
  //더미데이터
  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun" },
    { id: "2", name: "홍길동", username: "honggildong" },
    { id: "3", name: "김태현", username: "kimtaehyun" },
    { id: "4", name: "김태현", username: "kimtaehyun" },
  ];
  const receivedRequests = [
    { id: "3", name: "이지은", username: "jieun" },
    { id: "4", name: "박민수", username: "parkminsu" },
  ];

  const sentRequests = [
    { id: "5", name: "김철수", username: "kimcheolsu" },
    { id: "6", name: "오하나", username: "ohanaz" },
  ];

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const selectedUser = [
    ...friendList,
    ...receivedRequests,
    ...sentRequests,
  ].find((u) => u.username === selectedUsername);

  const onCloseProfileModal = () => {};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <UserListSection
        users={friendList}
        onUserCardClick={onUserCardClick}
        onFriendButtonClick={onFriendButtonClick}
      />

      {showProfileModal && selectedUser && (
        <ProfileModal
          user={selectedUser}
          onClose={onCloseProfileModal}
          onUnfriendClick={() => {
            onCloseProfileModal();
            onOpenConfirmModal();
          }}
        />
      )}

      {showConfirmModal && selectedUser && (
        <ConfirmModal
          user={selectedUser}
          onConfirm={onConfirmDelete}
          onClose={onCloseConfirmModal}
        />
      )}
    </div>
  );
};

export default FriendTab;
