import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from "../../utils/types/recentSearch";

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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 친구 목록 로드
  useEffect(() => {
    setTimeout(() => {
      const mockData: Friend[] = [
        { name: "김태현", username: "kimtaehyun", image: "" },
        { name: "홍길동", username: "honggildong", image: "" },
        { name: "이지은", username: "jieun", image: "" },
      ];
      setFriends(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // 최근 검색 로드
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // 검색어 필터링
  const filteredFriends = search
    ? friends.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // 최근 검색 클릭 시
  const handleSelectFriend = (username: string) => {
    addRecentSearch(username);
    setRecentSearches(getRecentSearches());
    onSelect(username);
  };

  // 최근 검색 삭제
  const handleRemoveRecent = (username: string) => {
    removeRecentSearch(username);
    setRecentSearches(getRecentSearches());
  };

  // 최근 검색 전체 삭제
  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <div className="h-full flex flex-col p-5 gap-5">
      {/* 검색창 */}
      <SearchBar value={search} onChange={setSearch} />

      {/* 최근 검색 헤더 */}
      {!search && (
        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>최근 검색항목</span>
          <button
            onClick={handleClearRecent}
            className="text-xs text-blue-500 hover:underline"
          >
            모두 지우기
          </button>
        </div>
      )}

      {/* 목록 */}
      {isLoading ? (
        <FriendListSkeleton count={6} />
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {/* 검색 시 → 필터링된 목록 표시 */}
          {search
            ? filteredFriends.map((friend) => (
                <FriendItem
                  key={friend.username}
                  name={friend.name}
                  username={friend.username}
                  image={friend.image}
                  onClick={() => handleSelectFriend(friend.username)}
                  isSelected={selectedUsername === friend.username}
                  showDelete={false}
                />
              ))
            : // 검색 없을 때 → 최근 검색 표시
              recentSearches.map((username) => {
                const friend = friends.find((f) => f.username === username);
                if (!friend) return null;
                return (
                  <FriendItem
                    key={username}
                    name={friend.name}
                    username={friend.username}
                    image={friend.image}
                    onClick={() => handleSelectFriend(friend.username)}
                    isSelected={selectedUsername === friend.username}
                    showDelete={true}
                    // X 버튼 동작
                    onDelete={() => handleRemoveRecent(username)}
                  />
                );
              })}
        </ul>
      )}
    </div>
  );
};

export default FriendListPanel;
