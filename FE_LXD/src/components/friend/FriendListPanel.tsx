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

const FriendListPanel = ({
  onSelect,
  selectedUsername,
}: FriendListPanelProps) => {
  const [search, setSearch] = useState("");

  const friends: Friend[] = [
    { name: "김태현", username: "kimtaehyun" },
    { name: "홍길동", username: "honggildong" },
    { name: "이지은", username: "jieun" },
  ];

  return (
    <div className="h-full flex flex-col p-5 gap-5">
      {/* 검색창 */}
      <SearchBar value={search} onChange={setSearch} />

      {/* 최근 검색 헤더 */}
      <div className="flex justify-between text-sm font-semibold text-gray-700">
        <span>최근 검색항목</span>
        <button className="text-xs text-blue-500 hover:underline">
          모두 지우기
        </button>
      </div>

      {/* 친구 리스트 */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
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
};

export default FriendListPanel;
