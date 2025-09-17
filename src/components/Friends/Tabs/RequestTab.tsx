// src/components/Friends/Tabs/RequestTab.tsx

import { useState, useEffect } from "react";
import Avatar from "../../Common/Avatar";
import RequestSkeleton from "../Skeleton/RequestSkeleton";
import ProfileModal from "../ProfileModal"; // ✅ 1. ProfileModal 임포트
import {
  getFriendRequests,
  postFriendAccept,
  patchFriendRefuse,
  patchFriendCancel,
} from "../../../apis/friend";
import type { FriendRequestListResponseDTO } from "../../../utils/types/friend";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { useFriendCounts } from "../../../context/FriendCountsContext";

// ✅ 2. DTO에서 올바른 유저 타입을 직접 추출하여 에러 방지
type RequestUser =
  FriendRequestListResponseDTO["result"]["receivedRequests"]["contents"][number];

const RequestTab = () => {
  const { incFriend, decRequests } = useFriendCounts();
  const { language } = useLanguage();
  const t = translate[language];

  const [isLoading, setIsLoading] = useState(true);
  const [receivedRequests, setReceivedRequests] = useState<RequestUser[]>([]);
  const [sentRequests, setSentRequests] = useState<RequestUser[]>([]);

  // ✅ 3. 모달을 제어하기 위한 상태 추가
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RequestUser | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getFriendRequests();
        setReceivedRequests(data?.result?.receivedRequests?.contents ?? []);
        setSentRequests(data?.result?.sentRequests?.contents ?? []);
      } catch (err) {
        console.error("❌ 친구 요청 목록 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // ✅ 4. 모달을 열고 닫는 핸들러 함수들
  const handleUserClick = (user: RequestUser) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  const handleAccept = async (memberId: number) => {
    try {
      await postFriendAccept(memberId);
      incFriend(1);
      decRequests(1);
      setReceivedRequests((prev) =>
        prev.filter((u) => u.memberId !== memberId)
      );
    } catch (err) {
      console.error("❌ 요청 수락 실패:", err);
    }
  };

  const handleRefuse = async (memberId: number) => {
    try {
      await patchFriendRefuse(memberId);
      decRequests(1);
      setReceivedRequests((prev) =>
        prev.filter((u) => u.memberId !== memberId)
      );
    } catch (err) {
      console.error("❌ 요청 거절 실패:", err);
    }
  };

  const handleCancel = async (receiverId: number) => {
    try {
      await patchFriendCancel({ receiverId });
      decRequests(1);
      setSentRequests((prev) => prev.filter((u) => u.memberId !== receiverId));
    } catch (err) {
      console.error("❌ 요청 취소 실패:", err);
    }
  };

  const receivedCountLabel = t.requestsCountLabel.replace(
    "{count}",
    String(isLoading ? 0 : receivedRequests.length)
  );
  const sentCountLabel = t.requestsCountLabel.replace(
    "{count}",
    String(isLoading ? 0 : sentRequests.length)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 받은 요청 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {t.receivedRequestsTitle}
            </h2>
            <span className="text-sm text-[#4170FE] bg-[#CFDFFF] rounded px-2 py-0.5 font-medium">
              {receivedCountLabel}
            </span>
          </div>
          {isLoading ? (
            <RequestSkeleton count={2} />
          ) : (
            <div className="flex flex-col gap-4 bg-[#EDEEF0] rounded-2xl p-6">
              {receivedRequests.map((user) => (
                <div
                  key={user.memberId}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 border bg-[#FFFFFF] border-gray-200 rounded-xl px-4 py-3 shadow-sm h-auto"
                >
                  {/* ✅ 5. 프로필 영역에 onClick 이벤트 추가 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar
                      src={user.profileImg}
                      alt={user.nickname}
                      size="w-10 h-10"
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.nickname}
                      </div>
                      <div className="text-xs text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => handleAccept(user.memberId)}
                      className="px-3 py-1 text-xs text-white bg-[#4170FE] rounded hover:bg-blue-600 min-w-[64px] h-8 font-semibold cursor-pointer"
                    >
                      {t.acceptButton}
                    </button>
                    <button
                      onClick={() => handleRefuse(user.memberId)}
                      className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-semibold cursor-pointer"
                    >
                      {t.deleteButton}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 보낸 요청 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {t.sentRequestsTitle}
            </h2>
            <span className="text-sm text-[#4170FE] bg-[#CFDFFF] rounded px-2 py-0.5 font-medium">
              {sentCountLabel}
            </span>
          </div>
          {isLoading ? (
            <RequestSkeleton count={2} />
          ) : (
            <div className="flex flex-col gap-4 bg-[#EDEEF0] rounded-2xl p-6">
              {sentRequests.map((user) => (
                <div
                  key={user.memberId}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-[#FFFFFF] gap-3 md:gap-0 border border-gray-200 rounded-xl px-4 py-3 shadow-sm h-auto"
                >
                  {/* ✅ 5. 프로필 영역에 onClick 이벤트 추가 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar
                      src={user.profileImg}
                      alt={user.nickname}
                      size="w-10 h-10"
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.nickname}
                      </div>
                      <div className="text-xs text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled
                      className="px-3 py-1 text-xs text-[#618BFD] bg-[#EDF3FE] rounded min-w-[64px] h-8 font-semibold flex items-center justify-center gap-1"
                    >
                      <img
                        src="/images/requestingIcon.svg"
                        alt="request"
                        className="w-5 h-5 mr-2"
                      />
                      {t.pendingLabel}
                    </button>
                    <button
                      onClick={() => handleCancel(user.memberId)}
                      className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-semibold cursor-pointer"
                    >
                      {t.cancelButton}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ 6. ProfileModal을 조건부로 렌더링 */}
      {showProfileModal && selectedUser && (
        <ProfileModal
          user={{
            memberId: selectedUser.memberId,
            name: selectedUser.nickname,
            username: selectedUser.username,
            profileImage: selectedUser.profileImg,
          }}
          onClose={handleCloseModal}
          onUnfriendClick={handleCloseModal} // 모달 내에서 친구끊기 시 일단 닫기만 처리
          onSendRequestClick={handleCloseModal} // 모달 내에서 친구요청 시 일단 닫기만 처리
        />
      )}
    </div>
  );
};

export default RequestTab;