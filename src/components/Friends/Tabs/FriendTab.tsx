import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import AlertModal from "../../Common/AlertModal";

const FriendTab = () => {
  const [isLoading, setIsLoading] = useState(true);

  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun" },
    { id: "2", name: "홍길동", username: "honggildong" },
    { id: "3", name: "김태현", username: "kimtaehyun" },
    { id: "4", name: "김태현", username: "kimtaehyun" },
  ];

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const selectedUser = friendList.find((u) => u.username === selectedUsername);

  const onCardClick = (user: { id: string; name: string; username: string }) => {
    setSelectedUsername(user.username);
    setShowProfileModal(true);
  };

  const onFriendButtonClick = (user: { id: string; name: string; username: string }) => {
    setSelectedUsername(user.username);
    setShowConfirmModal(true);
  };

  const onOpenConfirmModal = () => setShowConfirmModal(true);
  const onCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  const onConfirmDelete = () => {
    console.log("❌ 친구 삭제:", selectedUser);
    onCloseConfirmModal();
  };

  useEffect(() => {
    // API 호출 시뮬레이션 (1.5초 뒤 로딩 완료)
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <UserListSection
        users={friendList}
        isLoading={isLoading}
        onUserCardClick={onCardClick}
        onFriendButtonClick={onFriendButtonClick}
      />

      {showProfileModal && selectedUser && (
        <ProfileModal
          user={selectedUser}
          onClose={() => setShowProfileModal(false)}
          onUnfriendClick={() => {
            setShowProfileModal(false);
            onOpenConfirmModal();
          }}
        />
      )}

      {showConfirmModal && selectedUser && (
        <AlertModal 
          onClose={onCloseConfirmModal}
          onConfirm={onConfirmDelete}
          title={`${selectedUser.name}님과 친구를 취소하시겠습니까?`}
          confirmText="친구 취소하기"
          alertMessage={`${selectedUser.name}님과 친구 취소가 완료되었습니다.`}
        />
      )}
    </div>
  );
};

export default FriendTab;
