// src/components/Friends/Tabs/FriendTab.tsx
import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import { getFriends, deleteFriend } from "../../../apis/friend";
import type { FriendListResponseDTO } from "../../../utils/types/friend";
import { useFriendCounts } from "../../../context/FriendCountsContext";

const FriendTab = () => {
  const { decFriend } = useFriendCounts();
  


  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState<
    FriendListResponseDTO["result"]["friends"]["contents"]
  >([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const selectedUser =
    friendList.find((u) => u.username === selectedUsername) || null;

  // 목록 불러오기
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

  // 리스트 카드의 “친구” 버튼 클릭 → 바로 삭제 (팝업 없음)
  const onFriendButtonClick = async (user: {
    id: string;
    name: string;
    username: string;
  }) => {
    const memberId = Number(user.id);
    if (!Number.isFinite(memberId)) {
      console.error("Invalid memberId:", user.id);
      return;
    }
    try {
      const res = await deleteFriend(memberId); // friendId = memberId
      const ok = typeof res === "boolean" ? res : !!res?.ok;
      if (!ok) return; // 실패시 조용히 무시(원하면 토스트로 바꾸세요)

      // 성공 시 UI만 갱신
      setFriendList((prev) =>
        prev.filter((f) => f.memberId !== memberId && f.username !== user.username)
      );
      decFriend(1);
    } catch (e) {
      console.error("❌ 친구 삭제 요청 실패:", e);
    }
  };

  const onCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedUsername(null);
  };

  // 프로필 모달 안의 “친구 끊기”도 팝업 없이 즉시 삭제
  const onUnfriendInModal = async () => {
    if (!selectedUser) return;
    try {
      const res = await deleteFriend(selectedUser.memberId);
      const ok = typeof res === "boolean" ? res : !!res?.ok;
      if (!ok) return;

      setFriendList((prev) =>
        prev.filter((f) => f.memberId !== selectedUser.memberId)
      );
      decFriend(1);
    } catch (e) {
      console.error("❌ 친구 삭제 요청 실패:", e);
    } finally {
      onCloseProfileModal();
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
        onFriendButtonClick={onFriendButtonClick} // ← 클릭 즉시 삭제, alert 없음
      />

      {showProfileModal && selectedUser && (
        <ProfileModal
          user={{
            name: selectedUser.nickname,
            username: selectedUser.username,
            profileImage: selectedUser.profileImg,
            memberId: selectedUser.memberId,
            isFriend: true,
          }}
          onClose={onCloseProfileModal}
          onUnfriendClick={onUnfriendInModal}  // ← 모달에서도 즉시 삭제, alert 없음
          onSendRequestClick={onSendRequestClick}
        />
      )}
    </div>
  );
};

export default FriendTab;
