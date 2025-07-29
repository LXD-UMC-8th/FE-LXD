import { useState } from "react";
import FriendListPanel from "../FriendListPanel";
import ProfileView from "../ProfileView";
import AlertModal from "../../Common/AlertModal";
import ProfileModal from "../ProfileModal";

const FindTab = () => {
  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun", isFriend: true },
    { id: "2", name: "홍길동", username: "honggildong", isFriend: true },
    { id: "3", name: "이지은", username: "jieun", isFriend: false },
  ];

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [requestingUsernames, setRequestingUsernames] = useState<string[]>([]);

  const selectedUser = friendList.find((f) => f.username === selectedUsername);

  const isRequesting = (username: string) => requestingUsernames.includes(username);

  const handleSendRequest = (username: string) => {
    if (!isRequesting(username)) {
      setRequestingUsernames((prev) => [...prev, username]);
      console.log("📨 친구 요청 전송:", username);
    }
    setShowProfileModal(false);
  };

  const onClearSelection = () => setSelectedUsername(null);

  const onUnfriendClick = () => {
    setShowConfirmModal(true);
  };

  const onConfirmDelete = () => {
    console.log("❌ 친구 취소 완료:", selectedUser);
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8F9FA] font-[Pretendard]">
      {/* 친구 목록 패널 */}
      <div className="hidden lg:block w-[420px] border-r border-gray-200 bg-white">
        <FriendListPanel
          onSelect={setSelectedUsername}
          selectedUsername={selectedUsername}
        />
      </div>

      {/* 본문 영역 */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 md:px-10 max-w-full md:max-w-[700px] mx-auto pt-8">
        {selectedUser ? (
          <ProfileView
            user={selectedUser}
            onClose={onClearSelection}
            onUnfriendClick={onUnfriendClick}
            onAvatarClick={() => setShowProfileModal(true)}
            isRequesting={isRequesting(selectedUser.username)}
            onSendRequestClick={() => handleSendRequest(selectedUser.username)}
          />
        ) : (
          <div className="flex flex-col items-start bg-[#F5F7FE] w-full rounded-xl px-8 py-10 text-left">
            <img
              src="/images/findtabpic.svg"
              alt="find friends"
              className="w-[25000px] max-w-full mb-6 rounded-xl"
            />
            <p className="text-xl font-semibold text-black">
              전 세계에서 친구를 찾아보세요
            </p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              검색창에 아이디를 입력해서 친구를 찾아보세요.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              다른 사람들과 친구를 맺고, 다이어리를 구경해보세요.
            </p>
          </div>
        )}
      </div>

      {/* 친구 취소 모달 */}
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
          onSendRequestClick={() => handleSendRequest(selectedUser.username)}
        />
      )}
    </div>
  );
};

export default FindTab;
