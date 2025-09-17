import { useEffect, useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import FriendItem, { pickProfileImage } from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";
import useDebounce from "../../hooks/queries/useDebounce";
import {
  searchFriends,
  getRecentFriendSearches,
  deleteRecentSearch,
  clearAllRecentSearches,
} from "../../apis/friend";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

// 타입 정의
export interface Friend {
  id: number;
  name: string;
  username: string;
  image?: string | null;
  isFriend: boolean;
}

export interface FriendSearchItem {
  memberId: number;
  username: string;
  nickname: string;
  profileImg?: string | null;
  profileImageUrl?: string | null;
}

interface FriendListPanelProps {
  onSelect: (user: Friend | null) => void;
  selectedUsername: string | null;
}

const FriendListPanel = ({ onSelect, selectedUsername }: FriendListPanelProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<FriendSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<FriendSearchItem[]>([]);
  const debouncedSearch = useDebounce(search, 300);

  // '최근 검색 기록'을 불러오는 함수 (이제 search 상태에 의존하지 않음)
  const fetchRecent = useCallback(async () => {
    setIsLoading(true);
    try {
      const { result: usernames } = await getRecentFriendSearches();
      if (!usernames || usernames.length === 0) {
        setRecentSearches([]);
        return;
      }
      const userSearchPromises = usernames.map(username => searchFriends(username, 1, 1));
      const searchResults = await Promise.all(userSearchPromises);
      const fullUserObjects = searchResults
        .map(res => res.result.members.contents[0])
        .filter(Boolean);
      setRecentSearches(fullUserObjects);
    } catch (err) {
      console.error("❌ 최근 검색 기록 조회/변환 실패:", err);
      setRecentSearches([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // ✅ 의존성 배열을 비워 불필요한 재실행 방지

  // ✅ 데이터 로딩 로직을 하나의 useEffect로 통합하여 안정성 확보
  useEffect(() => {
    // 시나리오 1: 사용자가 검색어를 입력한 경우
    if (debouncedSearch.trim()) {
      const fetchFriends = async () => {
        setIsLoading(true);
        try {
          const data = await searchFriends(debouncedSearch);
          setFriends(data.result.members.contents);
        } catch (err) {
          console.error("❌ 친구 검색 실패:", err);
          setFriends([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFriends();
    }
    // 시나리오 2: 검색어가 비어있는 경우 (초기 로드 포함)
    else {
      setFriends([]); // 이전 검색 결과 비우기
      fetchRecent();
    }
  }, [debouncedSearch, fetchRecent]);

  // 친구 선택 핸들러
  const handleSelectFriend = (userInfo: FriendSearchItem) => {
    const friend: Friend = {
      id: userInfo.memberId,
      name: userInfo.nickname,
      username: userInfo.username,
      image: pickProfileImage(userInfo),
      isFriend: false,
    };
    onSelect(friend);
  };

  // 최근 검색 개별 삭제 핸들러
  const handleRemoveRecent = async (username: string) => {
    try {
      await deleteRecentSearch(username);
      // 삭제 성공 시, UI 즉시 업데이트
      setRecentSearches((prev) => prev.filter((item) => item.username !== username));
    } catch (err) {
      console.error("❌ 최근 검색 기록 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  // 최근 검색 전체 삭제 핸들러
  const handleClearRecent = async () => {
    try {
      await clearAllRecentSearches();
      setRecentSearches([]);
    } catch (err) {
      console.error("❌ 최근 검색 기록 전체 삭제 실패:", err);
      alert("전체 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="h-full flex flex-col p-5 gap-5">
      <SearchBar value={search} onChange={setSearch} />
      {!debouncedSearch.trim() && (
        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>{t.recentSearchTitle}</span>
          <button onClick={handleClearRecent} className="text-xs text-blue-500 hover:underline">
            {t.clearAllRecent}
          </button>
        </div>
      )}
      {isLoading ? (
        <FriendListSkeleton count={8} />
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {debouncedSearch.trim()
            ? friends.map((friend) => (
                <FriendItem
                  key={friend.memberId}
                  name={friend.nickname}
                  username={friend.username}
                  image={pickProfileImage(friend)}
                  onClick={() => handleSelectFriend(friend)}
                  isSelected={selectedUsername === friend.username}
                  showDelete={false}
                />
              ))
            : recentSearches.map((item) => (
                <FriendItem
                  key={item.memberId}
                  name={item.nickname}
                  username={item.username}
                  image={pickProfileImage(item)}
                  onClick={() => handleSelectFriend(item)}
                  isSelected={selectedUsername === item.username}
                  showDelete
                  onDelete={() => handleRemoveRecent(item.username)}
                />
              ))}
        </ul>
      )}
    </div>
  );
};

export default FriendListPanel;