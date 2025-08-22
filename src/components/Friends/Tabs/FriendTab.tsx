import { useState, useEffect } from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import AlertModal from "../../Common/AlertModal";
import { getFriends, deleteFriendSmart } from "../../../apis/friend";
import type { FriendListResponseDTO } from "../../../utils/types/friend";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { useFriendCounts } from "../../../context/FriendCountsContext";

type RawFriend = FriendListResponseDTO["result"]["friends"]["contents"][number];
type FriendItem = RawFriend & { friendId?: number };

const FriendTab = () => {
  const { decFriend } = useFriendCounts();
  const { language } = useLanguage();
  const t = translate[language];

  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState<FriendItem[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const selectedUser = friendList.find((u) => u.username === selectedUsername) || null;

  // 관계 ID 후보를 정규화(실제 응답에 없으면 undefined)
  const normalizeFriendId = (u: any): number | undefined =>
    u?.friendId ?? u?.id ?? u?.friendshipId ?? u?.relationId ?? u?.friendsId ?? undefined;

  // 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const data = await getFriends(1, 10);
        const contents = (data?.result?.friends?.contents ?? []) as RawFriend[];

        const normalized = contents.map((u) => ({
          ...u,
          friendId: normalizeFriendId(u),
        }));

        setFriendList(normalized);
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

  // ✅ 버튼은 항상 반응하도록: guard 제거
  const onFriendButtonClick = (user: { id: string; name: string; username: string }) => {
    setSelectedUsername(user.username);
    setShowConfirmModal(true);
  };

  const onOpenConfirmModal = () => setShowConfirmModal(true);
  const onCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  // ✅ 실제 삭제 실행 시점에 friendId 없는 경우 안내하고 중단
  const onConfirmDelete = async () => {
    if (!selectedUser) return;

    if (typeof selectedUser.friendId !== "number") {
      console.warn("🟠 friendId가 없어 삭제할 수 없습니다. 서버가 목록에 관계 ID를 내려줘야 합니다.", selectedUser);
      // 필요 시 사용자 토스트/알림:
      alert("삭제 권한이 없거나 서버에서 거부되었습니다.");
      onCloseConfirmModal();
      return;
    }

    const ok = await deleteFriendSmart({
      friendId: selectedUser.friendId,  // friendId만 사용
      memberId: selectedUser.memberId,  // 현재 서버에선 사용되지 않음(형식상)
    });

    if (!ok) {
      console.warn("🟠 삭제 실패: 서버에서 거부되었습니다.");
      // alert(t.unfriendFailedToast ?? "삭제 권한이 없거나 서버에서 거부되었습니다.");
      return;
    }

    decFriend(1);
    setFriendList((prev) => prev.filter((f) => f.username !== selectedUser.username));
    onCloseConfirmModal();
  };

  const onSendRequestClick = () => {
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
            memberId: selectedUser.memberId,
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
          alertMessage={t.unfriendDoneToast2}
        />
      )}
    </div>
  );
};

export default FriendTab;
