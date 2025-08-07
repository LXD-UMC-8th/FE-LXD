import { useState } from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";
import AlertModal from "../../Common/AlertModal";
import ProfileModal from "../ProfileModal";
import { addRecentSearch } from "../../../utils/types/recentSearch";
import { postFriendRequest } from "../../../apis/friend";

interface Friend {
  id: number;
  name: string;
  username: string;
  image?: string;
  isFriend: boolean;
}

const FindTab = () => {
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
      if (err?.response?.status === 409) {
        // 이미 친구 요청 보낸 상태
        successOrAlreadySent = true;
      } else {
        alert("친구 요청에 실패했습니다.");
      }
    }

    if (successOrAlreadySent) {
      setRequestingUsernames((prev) => [...prev, username]);

      // ✅ 리렌더링 유도
      setSelectedUser((prev) => {
        if (prev?.username === username) {
          return { ...prev };
        }
        return prev;
      });
    }

    setShowProfileModal(false);
  };

  const handleSelectUser = (user: Friend | null) => {
    setSelectedUser(user);
    if (user) {
      addRecentSearch(user.username);
    }
  };

  const onClearSelection = () => setSelectedUser(null);

  const onUnfriendClick = () => setShowConfirmModal(true);

  const onConfirmDelete = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8F9FA] font-[Pretendard]">
      {/* 왼쪽 친구 검색 패널 */}
      <div className="hidden lg:block w-[420px] border-r border-gray-200 bg-white">
        <FriendListPanel
          onSelect={handleSelectUser}
          selectedUsername={selectedUser?.username ?? null}
        />
      </div>

      {/* 오른쪽 상세 프로필 */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 md:px-10 max-w-full md:max-w-[700px] mx-auto pt-8">
        {selectedUser ? (
          <ProfileView
            user={selectedUser}
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
              className="w-[250000px] max-w-full mb-6 rounded-xl"
            />
            <p className="text-xl font-semibold text-black">
              전 세계에서 친구를 찾아보세요
            </p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              검색창에 아이디를 입력해서 친구를 찾아보세요.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              다른 사람과 친구를 맺고, 다이어리를 구경해보세요.
            </p>
          </div>
        )}
      </div>

      {/* 친구 취소 확인 모달 */}
      {showConfirmModal && selectedUser && (
        <AlertModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={onConfirmDelete}
          title={`${selectedUser.name}님과 친구를 취소하시겠습니까?`}
          confirmText="친구 취소하기"
          alertMessage={`${selectedUser.name}님과 친구 취소가 완료되었습니다.`}
        />
      )}

      {/* 프로필 모달 */}
      {showProfileModal && selectedUser && (
        <ProfileModal
          user={selectedUser}
          onClose={() => setShowProfileModal(false)}
          onUnfriendClick={() => {
            setShowProfileModal(false);
            setShowConfirmModal(true);
          }}
          isRequesting={isRequesting(selectedUser.username)}
          onSendRequestClick={() =>
            handleSendRequest(selectedUser.username, selectedUser.id)
          }
        />
      )}
    </div>
  );
};

export default FindTab;
