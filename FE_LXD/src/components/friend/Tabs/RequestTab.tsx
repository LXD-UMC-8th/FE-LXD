import { useState } from "react";

const RequestTab = () => {
  // API를 통해서 받아와야 하는 데이터
  const receivedRequests = [
    { id: "3", name: "이지은", username: "jieun" },
    { id: "4", name: "박민수", username: "parkminsu" },
  ];
  // API를 통해서 받아와야 하는 데이터
  const sentRequests = [
    { id: "5", name: "김철수", username: "kimcheolsu" },
    { id: "6", name: "오하나", username: "ohanaz" },
  ];
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const onSelectUser = (username: string) => {
    setSelectedUsername(username);
    // 여기서 프로필 모달을 열거나 다른 동작을 수행할 수 있습니다.
    console.log("선택된 사용자:", username);
  };

  return (
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
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onSelectUser(user.username)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </div>
              </div>
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
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onSelectUser(user.username)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </div>
              </div>
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
  );
};
export default RequestTab;
