import { useState } from "react";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";

interface Friend {
  name: string;
  username: string;
}

interface FriendListPanelProps {
  onSelect: (username: string | null) => void;
  selectedUsername: string | null;
}

export default function FriendListPanel({
  onSelect,
  selectedUsername,
}: FriendListPanelProps) {
  const [search, setSearch] = useState("");

  // 임시 더미 데이터
  const friends: Friend[] = [
    { name: "김태현", username: "kimtaehyun" },
    { name: "홍길동", username: "honggildong" },
    { name: "이지은", username: "jieun" },
  ];

  return (
    <div
      className="bg-white flex flex-col border-r"
      style={{
        width: "419px",
        height: "786px",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* 검색창 */}
      <SearchBar value={search} onChange={setSearch} />

      {/* 최근 검색 목록 헤더 */}
      <div className="text-sm font-semibold flex justify-between text-gray-700 font-[Pretendard]">
        <span>최근 검색항목</span>
        <button className="text-xs text-blue-500 hover:underline font-[Pretendard]">
          모두 지우기
        </button>
      </div>

      {/* 친구 리스트 */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-4">
        {friends.map((f, idx) => (
          <FriendItem
            key={idx}
            name={f.name}
            username={f.username}
            onClick={() => onSelect(f.username)}
            isSelected={selectedUsername === f.username}
          />
        ))}
      </ul>
    </div>
  );
}
