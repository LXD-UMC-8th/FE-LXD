import { useState } from "react";
import TabButton from "../components/friend/TabButton";
import FindTab from "../components/friend/Tabs/FindTab";
import FriendTab from "../components/friend/Tabs/FriendTab";
import RequestTab from "../components/friend/Tabs/RequestTab";
import ModalWithTabs from "../components/ModalWithTabs";

export default function FriendsListPage() {
  const [activeTab, setActiveTab] = useState<"find" | "friend" | "request">(
    "find",
  );
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const selectedUser = [
    ...friendList,
    ...receivedRequests,
    ...sentRequests,
  ].find((u) => u.username === selectedUsername);

  const handleDeletefriend = () => {
    console.log("❌ 친구 삭제:", selectedUser);
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedUsername(null);
  };

  return (
    <div className="h-screen bg-gray-100 overflow-auto">
      {/* 탭 메뉴 */}
      <div className="flex gap-6 bg-white px-6 h-14 items-end pt-2">
        <ModalWithTabs
          title1="친구찾기/친구"
          title2="친구/친구"
          title3="요청/친구"
        />
      </div>

      {activeTab === "friend" && (
        <FriendTab
          showConfirmModal={showConfirmModal}
          onUserCardClick={(user) => {
            setSelectedUsername(user.username);
            setShowProfileModal(true);
          }}
          onFriendButtonClick={(user) => {
            setSelectedUsername(user.username);
            setShowConfirmModal(true);
          }}
          onCloseProfileModal={() => setShowProfileModal(false)}
          onOpenConfirmModal={() => setShowConfirmModal(true)}
          onCloseConfirmModal={closeConfirmModal}
          onConfirmDelete={handleDeletefriend}
        />
      )}

      {activeTab === "request" && (
        <RequestTab
          receivedRequests={receivedRequests}
          sentRequests={sentRequests}
          onSelectUser={(username) => setSelectedUsername(username)}
        />
      )}
    </div>
  );
}
