import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import AlertModal from "../../Common/AlertModal";
import { getFriends, deleteFriend } from "../../../apis/friend";
import type { FriendListResponseDTO } from "../../../utils/types/friend";

const FriendTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState<
    FriendListResponseDTO["result"]["friends"]["contents"]
  >([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const selectedUser = friendList.find((u) => u.username === selectedUsername);

  // 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends(1, 10); // page=1, size=10
        setFriendList(data?.result?.friends?.contents || []);
      } catch (err) {
        console.error("❌ 친구 목록 불러오기 실패:", err);
        setFriendList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFriends();
  }, []);

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

  // ✅ 친구 삭제 API 연동
  const onConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteFriend(selectedUser.memberId);
      console.log("✅ 친구 삭제 성공:", selectedUser.nickname);

      // 삭제 후 리스트에서 제거
      setFriendList((prev) =>
        prev.filter((f) => f.username !== selectedUser.username)
      );

      onCloseConfirmModal();
    } catch (error) {
      console.error("❌ 친구 삭제 실패:", error);
    }
  };

  const onSendRequestClick = () => {
    console.log("📨 친구 요청 보냄:", selectedUser);
    setShowProfileModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <UserListSection
        users={friendList.map((u) => ({
          id: String(u.memberId),
          name: u.nickname,
          username: u.username,
          image: u.profileImg,
        }))}
        isLoading={isLoading}
        onUserCardClick={onCardClick}
        onFriendButtonClick={onFriendButtonClick}
      />

      {showProfileModal && selectedUser && (
        <ProfileModal
          user={{
            name: selectedUser.nickname,
            username: selectedUser.username,
            profileImage: selectedUser.profileImg,
            isFriend: true,
          }}
          onClose={() => setShowProfileModal(false)}
          onUnfriendClick={() => {
            setShowProfileModal(false);
            onOpenConfirmModal();
          }}
          onSendRequestClick={onSendRequestClick}
        />
      )}

      {showConfirmModal && selectedUser && (
        <AlertModal
          onClose={onCloseConfirmModal}
          onConfirm={onConfirmDelete}
          title={`${selectedUser.nickname}님과 친구를 취소하시겠습니까?`}
          confirmText="친구 취소하기"
          alertMessage={`${selectedUser.nickname}님과 친구 취소가 완료되었습니다.`}
        />
      )}
    </div>
  );
};

export default FriendTab;
