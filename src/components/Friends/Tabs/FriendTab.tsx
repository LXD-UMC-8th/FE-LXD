// src/components/Friends/Tabs/FriendTab.tsx
import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import AlertModal from "../../Common/AlertModal"; // ✅ 1. AlertModal 임포트
import { getFriends, deleteFriend } from "../../../apis/friend";
import type { FriendListResponseDTO } from "../../../utils/types/friend";
import { useFriendCounts } from "../../../context/FriendCountsContext";
import { useLanguage } from "../../../context/LanguageProvider"; // ✅ 2. 언어 관련 훅 임포트
import { translate } from "../../../context/translate";

const FriendTab = () => {
  const { decFriend } = useFriendCounts();
  const { language } = useLanguage(); // ✅ 3. 언어 설정 가져오기
  const t = translate[language];

  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState<
    FriendListResponseDTO["result"]["friends"]["contents"]
  >([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ✅ 4. 확인 모달 상태 추가
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

  // ✅ 5. 리스트 카드의 버튼 클릭 -> 이제 즉시 삭제가 아닌 모달을 엽니다.
  const onFriendButtonClick = (user: {
    id: string;
    name: string;
    username: string;
  }) => {
    setSelectedUsername(user.username);
    setShowConfirmModal(true);
  };

  const onCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedUsername(null);
  };

  const onCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  // ✅ 6. 프로필 모달의 '친구 끊기' 클릭 -> 프로필 모달 닫고 확인 모달 열기
  const onUnfriendInModal = () => {
    if (!selectedUser) return;
    setShowProfileModal(false); // 프로필 모달은 닫고
    setShowConfirmModal(true); // 확인 모달을 연다
  };

  // ✅ 7. 확인 모달에서 '삭제'를 눌렀을 때 실행될 함수 (실제 API 호출)
  const onConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const res = await deleteFriend(selectedUser.memberId);
      const ok = typeof res === "boolean" ? res : !!res?.ok;
      if (!ok) {
        alert(t.unfriendFailToast ?? "친구 삭제에 실패했습니다.");
        return;
      }

      // 성공 시 UI 반영
      setFriendList((prev) =>
        prev.filter((f) => f.memberId !== selectedUser.memberId)
      );
      decFriend(1);
      alert(t.unfriendDoneToast2 ?? "친구를 삭제했습니다.");
    } catch (e) {
      console.error("❌ 친구 삭제 요청 실패:", e);
      alert(t.unfriendFailToast ?? "친구 삭제에 실패했습니다.");
    } finally {
      onCloseConfirmModal();
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
        onFriendButtonClick={onFriendButtonClick} // ← 이제 모달을 엽니다
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
          onUnfriendClick={onUnfriendInModal} // ← 이제 모달을 엽니다
          onSendRequestClick={onSendRequestClick}
        />
      )}

      {/* ✅ 8. 확인 모달(AlertModal) JSX 추가 */}
      {showConfirmModal && selectedUser && (
        <AlertModal
          onClose={onCloseConfirmModal}
          onConfirm={onConfirmDelete}
          title={t.unfriendConfirmTitle.replace("{name}", selectedUser.nickname)}
          confirmText={t.unfriendConfirmAction2} alertMessage={""}        />
      )}
    </div>
  );
};

export default FriendTab;