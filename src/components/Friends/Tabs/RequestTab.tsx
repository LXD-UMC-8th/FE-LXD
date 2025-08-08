import { useState, useEffect } from "react";
import Avatar from "../../Common/Avatar";
import RequestSkeleton from "../Skeleton/RequestSkeleton";
import {
  getFriendRequests,
  postFriendAccept,
  postFriendRefuse,
  patchFriendCancel,
} from "../../../apis/friend";
import type { FriendRequestListResponseDTO } from "../../../utils/types/friend";

const RequestTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [receivedRequests, setReceivedRequests] =
    useState<
      FriendRequestListResponseDTO["result"]["receivedRequests"]["contents"]
    >([]);
  const [sentRequests, setSentRequests] =
    useState<
      FriendRequestListResponseDTO["result"]["sentRequests"]["contents"]
    >([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getFriendRequests();

        // Swagger 응답 구조에 맞게 contents 사용
        setReceivedRequests(
          Array.isArray(data?.result?.receivedRequests?.contents)
            ? data.result.receivedRequests.contents
            : []
        );
        setSentRequests(
          Array.isArray(data?.result?.sentRequests?.contents)
            ? data.result.sentRequests.contents
            : []
        );
      } catch (err) {
        console.error("❌ 친구 요청 목록 불러오기 실패:", err);
        setReceivedRequests([]);
        setSentRequests([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (memberId: number) => {
    try {
      await postFriendAccept({ requesterId: memberId });
      setReceivedRequests((prev) =>
        prev.filter((u) => u.memberId !== memberId)
      );
    } catch (err) {
      console.error("❌ 요청 수락 실패:", err);
    }
  };

  const handleRefuse = async (memberId: number) => {
    try {
      await postFriendRefuse({ requesterId: memberId });
      setReceivedRequests((prev) =>
        prev.filter((u) => u.memberId !== memberId)
      );
    } catch (err) {
      console.error("❌ 요청 거절 실패:", err);
    }
  };

  const handleCancel = async (receiverId: number) => {
    try {
      // Swagger에서 body가 { receiverId: number } 형태일 경우 이렇게 보내야 함
      await patchFriendCancel({ receiverId });
      setSentRequests((prev) => prev.filter((u) => u.memberId !== receiverId));
    } catch (err) {
      console.error("❌ 요청 취소 실패:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 받은 요청 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              내가 받은 요청
            </h2>
            <span className="text-sm text-[#4170FE] bg-[#CFDFFF] rounded px-2 py-0.5 font-medium">
              {isLoading ? 0 : receivedRequests.length}개
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
                  <div className="flex items-center gap-3 cursor-pointer">
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
                      className="px-3 py-1 text-xs text-white bg-[#4170FE] rounded hover:bg-blue-600 min-w-[64px] h-8 font-[Pretendard] font-semibold cursor-pointer"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => handleRefuse(user.memberId)}
                      className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-[Pretendard] font-semibold cursor-pointer"
                    >
                      삭제
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
              내가 보낸 요청
            </h2>
            <span className="text-sm text-[#4170FE] bg-[#CFDFFF] rounded px-2 py-0.5 font-medium">
              {isLoading ? 0 : sentRequests.length}개
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
                  <div className="flex items-center gap-3 cursor-pointer">
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
                      className="px-3 py-1 text-xs text-[#618BFD] bg-[#EDF3FE] rounded min-w-[64px] h-8 font-[Pretendard] font-semibold flex items-center justify-center gap-1"
                    >
                      <img
                        src="/images/requestingIcon.svg"
                        alt="request"
                        className="w-5 h-5 mr-2"
                      />
                      요청중
                    </button>
                    <button
                      onClick={() => handleCancel(user.memberId)}
                      className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-[Pretendard] font-semibold cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestTab;
