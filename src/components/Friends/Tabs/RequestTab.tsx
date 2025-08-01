import { useState, useEffect } from "react";
import Avatar from "../../Common/Avatar";
import RequestSkeleton from "../Skeleton/RequestSkeleton";


const RequestTab = () => {
  const [isLoading, setIsLoading] = useState(true);

  const receivedRequests = [
    { id: "3", name: "이지은", username: "jieun", image: "" },
    { id: "4", name: "박민수", username: "parkminsu", image: "" },
  ];

  const sentRequests = [
    { id: "5", name: "김철수", username: "kimcheolsu", image: "" },
    { id: "6", name: "오하나", username: "ohanaz", image: "" },
  ];

  const [_selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const onSelectUser = (username: string) => {
    setSelectedUsername(username);
    console.log("선택된 사용자:", username);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 받은 요청 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">내가 받은 요청</h2>
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
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 border bg-[#FFFFFF] border-gray-200 rounded-xl px-4 py-3 shadow-sm h-auto"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => onSelectUser(user.username)}
                  >
                    <Avatar src={user.image} alt={user.name} size="w-10 h-10" />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">@{user.username}</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button className="px-3 py-1 text-xs text-white bg-[#4170FE] rounded hover:bg-blue-600 min-w-[64px] h-8 font-[Pretendard] font-semibold flex items-center justify-center gap-1">
                      수락
                    </button>
                    <button className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-[Pretendard] font-semibold flex items-center justify-center gap-1">
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
            <h2 className="text-lg font-semibold text-gray-800">내가 보낸 요청</h2>
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
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-[#FFFFFF] gap-3 md:gap-0 border border-gray-200 rounded-xl px-4 py-3 shadow-sm h-auto"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => onSelectUser(user.username)}
                  >
                    <Avatar src={user.image} alt={user.name} size="w-10 h-10" />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">@{user.username}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs text-[#618BFD] bg-[#EDF3FE] rounded hover:bg-blue-50 min-w-[64px] h-8 font-[Pretendard] font-semibold flex items-center justify-center gap-1">
                      <img src="/images/requestingIcon.svg" alt="request" className="w-5 h-5 mr-2" />
                      요청중
                    </button>
                    <button className="px-3 py-1 text-xs text-[#747785] border-[1.5px] border-[#A4A7B2] rounded hover:bg-gray-50 min-w-[64px] h-8 font-[Pretendard] font-semibold flex items-center justify-center gap-1">
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
