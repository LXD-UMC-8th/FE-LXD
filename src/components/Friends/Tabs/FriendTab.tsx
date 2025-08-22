// src/components/Friends/Tabs/FriendTab.tsx
import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import AlertModal from "../../Common/AlertModal";
import { getFriends, deleteFriend } from "../../../apis/friend";
import type { FriendListResponseDTO } from "../../../utils/types/friend";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { useFriendCounts } from "../../../context/FriendCountsContext";

const FriendTab = () => {
  const { decFriend } = useFriendCounts();
  const { language } = useLanguage();
  const t = translate[language];

  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState<
    FriendListResponseDTO["result"]["friends"]["contents"]
  >([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const selectedUser =
    friendList.find((u) => u.username === selectedUsername) || null;

  // 📌 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends(1, 10);
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

  const onFriendButtonClick = (user: {
    id: string;
    name: string;
    username: string;
  }) => {
    setSelectedUsername(user.username);
    setShowConfirmModal(true);
  };

  const onOpenConfirmModal = () => setShowConfirmModal(true);
  const onCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  // ✅ 친구 삭제 (friendId = memberId)
  const onConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const res = await deleteFriend(selectedUser.memberId); // memberId = friendId
      if (!res) {
        alert("친구 삭제에 실패했습니다.");
        return;
      }

      // 성공 시 UI 반영
      setFriendList((prev) =>
        prev.filter((f) => f.username !== selectedUser.username)
      );
      decFriend(1);
      alert(t?.unfriendDoneToast2 ?? "친구를 삭제했습니다.");
      onCloseConfirmModal();
    } catch (error) {
      console.error("❌ 친구 삭제 요청 실패:", error);
      alert("친구 삭제에 실패했습니다.");
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
            memberId: selectedUser.memberId, // friendId로 사용
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
          title={t.unfriendConfirmTitle.replace("{name}", selectedUser.nickname)}
          confirmText={t.unfriendConfirmAction2}
          alertMessage={undefined as any}
        />
      )}
    </div>
  );
};

export default FriendTab;
