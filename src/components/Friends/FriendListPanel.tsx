import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";

interface Friend {
  name: string;
  username: string;
  image?: string;
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
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 요청 시뮬레이션 (2초 후에 데이터 로드)
    setTimeout(() => {
      const mockData: Friend[] = [
        { name: "김태현", username: "kimtaehyun", image: "" },
        { name: "홍길동", username: "honggildong", image: "" },
        { name: "이지은", username: "jieun", image: "" },
      ];
      setFriends(mockData);
      setIsLoading(false);
    }, 2000);
  }, []);

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

      {/* 친구 리스트 (스켈레톤 vs 실제 데이터) */}
      {isLoading ? (
        <FriendListSkeleton count={6} />
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {friends.map((f, idx) => (
            <FriendItem
              key={idx}
              name={f.name}
              username={f.username}
              image={f.image}
              onClick={() => onSelect(f.username)}
              isSelected={selectedUsername === f.username}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendListPanel;
