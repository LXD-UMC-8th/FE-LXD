import { useState } from "react";
import FriendListPanel from "../components/friend/FriendListPanel";
import UserListSection from "../components/friend/UserListSection";
import ProfileView from "../components/friend/ProfileView";
import ProfileModal from "../components/friend/ProfileModal";
import ConfirmModal from "../components/friend/ConfirmModal";

export default function FriendsListPage() {
  const [activeTab, setActiveTab] = useState<"find" | "friend" | "request">("find");
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const friendList = [
    { id: "1", name: "김태현", username: "kimtaehyun" },
    { id: "2", name: "홍길동", username: "honggildong" },
    { id: "3", name: "김태현", username: "kimtaehyun" },
    { id: "4", name: "김태현", username: "kimtaehyun" }
  ];

  const receivedRequests = [
    { id: "3", name: "이지은", username: "jieun" },
    { id: "4", name: "박민수", username: "parkminsu" },
  ];

  const sentRequests = [
    { id: "5", name: "김철수", username: "kimcheolsu" },
    { id: "6", name: "오하나", username: "ohanaz" },
  ];

  const selectedUser = [...friendList, ...receivedRequests, ...sentRequests].find(
    (u) => u.username === selectedUsername
  );

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
        <button
          onClick={() => {
            setActiveTab("find");
            setSelectedUsername(null);
          }}
          className={`font-[Pretendard] text-base pb-[2px] cursor-pointer ${
            activeTab === "find"
              ? "text-black font-semibold border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          친구찾기
        </button>
        <button
          onClick={() => {
            setActiveTab("friend");
            setSelectedUsername(null);
          }}
          className={`relative font-[Pretendard] text-base pb-[2px] cursor-pointer ${
            activeTab === "friend"
              ? "text-black font-semibold border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          친구
          <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-medium">
            {friendList.length}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("request");
            setSelectedUsername(null);
          }}
          className={`relative font-[Pretendard] text-base pb-[2px] cursor-pointer ${
            activeTab === "request"
              ? "text-black font-semibold border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          요청
          <span className="ml-1 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-medium">
            {receivedRequests.length + sentRequests.length}
          </span>
        </button>
      </div>

      {/* 친구찾기 탭 */}
      {activeTab === "find" && (
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-[400px] bg-white">
            <FriendListPanel
              onSelect={(username) => setSelectedUsername(username)}
              selectedUsername={selectedUsername}
            />
          </div>
          <div className="flex-1 bg-gray-50 flex items-center justify-center text-gray-400">
            {selectedUsername ? (
              <ProfileView
                user={friendList.find((f) => f.username === selectedUsername)!}
                onClose={() => setSelectedUsername(null)}
              />
            ) : (
              <span className="text-lg font-medium">
                전세계에서 친구를 찾아보세요.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 친구 탭 */}
      {activeTab === "friend" && (
        <div className="max-w-5xl mx-auto p-6">
          <UserListSection
            users={friendList}
            onUserCardClick={(user) => {
              setSelectedUsername(user.username);
              setShowProfileModal(true);
            }}
            onFriendButtonClick={(user) => {
              setSelectedUsername(user.username);
              setShowConfirmModal(true);
            }}
          />

          {showProfileModal && selectedUser && (
            <ProfileModal
              user={selectedUser}
              onClose={() => setShowProfileModal(false)}
              onUnfriendClick={() => {
                setShowProfileModal(false);
                setShowConfirmModal(true);
              }}
            />
          )}

          {showConfirmModal && selectedUser && (
            <ConfirmModal
              user={selectedUser}
              onConfirm={handleDeletefriend}
              onClose={closeConfirmModal}
            />
          )}
        </div>
      )}

      {/* 요청 탭 */}
      {activeTab === "request" && (
        <div className="max-w-7xl mx-auto p-6">
          {/* 탭 제목 */}
          <div className="flex gap-8 text-gray-800 text-base font-semibold mb-8">
            <div className="flex items-center gap-2">
              <span>내가 받은 요청</span>
              <span className="text-xs text-blue-500 bg-blue-50 rounded px-2 py-0.5 font-medium">
                {receivedRequests.length}개
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>내가 보낸 요청</span>
              <span className="text-xs text-blue-500 bg-blue-50 rounded px-2 py-0.5 font-medium">
                {sentRequests.length}개
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* 받은 요청 */}
            <div className="flex flex-col gap-4">
              {receivedRequests.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                >
                  {/* 유저 정보 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedUsername(user.username)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">@{user.username}</div>
                    </div>
                  </div>
                  {/* 버튼들 */}
                  <div className="flex gap-2">
                    <button className="px-4 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                      수락
                    </button>
                    <button className="px-4 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 보낸 요청 */}
            <div className="flex flex-col gap-4">
              {sentRequests.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                >
                  {/* 유저 정보 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedUsername(user.username)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">@{user.username}</div>
                    </div>
                  </div>
                  {/* 버튼들 */}
                  <div className="flex gap-2">
                    <button className="px-4 py-1 text-xs text-blue-500 border border-blue-500 rounded hover:bg-blue-50 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
                        />
                      </svg>
                      요청중
                    </button>
                    <button className="px-4 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                      취소
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
