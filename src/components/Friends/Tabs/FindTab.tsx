// src/components/Friends/Tabs/FindTab.tsx
import { useState } from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";
import AlertModal from "../../Common/AlertModal";
import ProfileModal from "../ProfileModal";
import { addRecentSearch } from "../../../utils/types/recentSearch";
import { postFriendRequest } from "../../../apis/friend";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";

interface Friend {
  id: number;            // 서버 memberId에 해당
  name: string;
  username: string;
  image?: string | null; // ✅ null 허용 (FriendListPanel과 호환)
  isFriend: boolean;
}

const FindTab = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [requestingUsernames, setRequestingUsernames] = useState<string[]>([]);

  const isRequesting = (username: string) =>
    requestingUsernames.includes(username);

  const handleSendRequest = async (username: string, memberId: number) => {
    let successOrAlreadySent = false;
    try {
      await postFriendRequest({ receiverId: memberId });
      successOrAlreadySent = true;
    } catch (err: any) {
      console.error("❌ 친구 요청 실패: ", err);
      if (err?.response?.status === 409) successOrAlreadySent = true;
      else alert(t.friendRequestFailed);
    }

    if (successOrAlreadySent) {
      setRequestingUsernames((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );
      setSelectedUser((prev) =>
        prev?.username === username ? { ...prev } : prev
      );
    }
    setShowProfileModal(false);
  };

  const handleSelectUser = (user: Friend | null) => {
    setSelectedUser(user);
    if (user) addRecentSearch(user.username);
  };

  const onClearSelection = () => setSelectedUser(null);
  const onUnfriendClick = () => setShowConfirmModal(true);
  const onConfirmDelete = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    // ✅ 고정 레이아웃: 최소 가로폭(1120px) 유지
    <div className="w-full min-w-[1120px] flex h-[calc(100vh-64px)] bg-[#F8F9FA]">
      {/* 왼쪽 친구 검색 패널 - 항상 표시 */}
      <div className="flex-none w-[420px] border-r border-gray-200 bg-white">
        <FriendListPanel
          onSelect={handleSelectUser}
          selectedUsername={selectedUser?.username ?? null}
        />
      </div>

      {/* 오른쪽 상세/빈 상태 - 고정폭 */}
      <div className="flex-none w-[700px] px-10 mx-auto pt-8 flex items-start justify-center">
        {selectedUser ? (
          <ProfileView
            user={{
              id: selectedUser.id,
              name: selectedUser.name,
              username: selectedUser.username,
              image: selectedUser.image ?? undefined, // ✅ null → undefined 정규화
              isFriend: selectedUser.isFriend,
            }}
            onClose={onClearSelection}
            onUnfriendClick={onUnfriendClick}
            onAvatarClick={() => setShowProfileModal(true)}
            isRequesting={isRequesting(selectedUser.username)}
            onSendRequestClick={() =>
              handleSendRequest(selectedUser.username, selectedUser.id)
            }
          />
        ) : (
          <div className="flex flex-col items-start bg-[#F5F7FE] w-full rounded-xl px-8 py-10 text-left">
            <img
              src="/images/findtabpic.svg"
              alt="find friends"
              className="w-[250000px] max-w-full mb-6 rounded-xl"  // ✅ 오타 수정
            />
            <p className="text-xl font-semibold text-black">
              {t.findFriendsHeadline}
            </p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {t.findFriendsDesc1}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.findFriendsDesc2}
            </p>
          </div>
        )}
      </div>

      {/* 친구 취소 확인 모달 */}
      {showConfirmModal && selectedUser && (
        <AlertModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={onConfirmDelete}
          title={t.unfriendConfirmTitle.replace("{name}", selectedUser.name)}
          confirmText={t.unfriendConfirmAction}
          alertMessage={t.unfriendDoneToast}
        />
      )}

      {/* 프로필 모달 */}
      {showProfileModal && selectedUser && (
        <ProfileModal
          user={{
            memberId: selectedUser.id,                        // ✅ id → memberId 매핑
            name: selectedUser.name,
            username: selectedUser.username,
            profileImage: selectedUser.image ?? undefined,    // ✅ null → undefined
            isFriend: selectedUser.isFriend,
            isRequesting: isRequesting(selectedUser.username),
          }}
          onClose={() => setShowProfileModal(false)}
          onUnfriendClick={() => {
            setShowProfileModal(false);
            setShowConfirmModal(true);
          }}
          onSendRequestClick={() =>
            handleSendRequest(selectedUser.username, selectedUser.id)
          }
        />
      )}
    </div>
  );
};

export default FindTab;
