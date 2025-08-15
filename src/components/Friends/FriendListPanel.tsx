// src/components/Friends/FriendListPanel.tsx
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FriendItem, { pickProfileImage } from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from "../../utils/types/recentSearch";
import useDebounce from "../../hooks/queries/useDebounce";
import { searchFriends } from "../../apis/friend";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

export interface Friend {
  id: number;
  name: string;
  username: string;
  image?: string | null;
  isFriend: boolean;
}

// ✅ 응답 키가 달라도 안전하게 받도록 선택지 추가
export interface FriendSearchItem {
  memberId: number;
  username: string;
  nickname: string;
  profileImageUrl?: string | null;
  profileImage?: string | null;
  profileUrl?: string | null;
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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFriends([]);
      return;
    }

    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await searchFriends(debouncedSearch);
        setFriends(data.result.members.contents);
      } catch (err) {
        console.error("❌ 친구 검색 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [debouncedSearch]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // ✅ username만 있는 경우도 서버에서 정보 조회
  const handleSelectFriend = async (username: string, userInfo?: FriendSearchItem) => {
    addRecentSearch(username);
    setRecentSearches(getRecentSearches());

    // 검색 결과에서 온 경우
    if (userInfo) {
      const friend: Friend = {
        id: userInfo.memberId,
        name: userInfo.nickname,
        username: userInfo.username,
        image: pickProfileImage(userInfo), // ✅ 보정된 이미지
        isFriend: false,
      };
      onSelect(friend);
      return;
    }

    // 최근 검색에서 온 경우 → 서버 재조회
    try {
      const data = await searchFriends(username);
      const found: FriendSearchItem | undefined = data.result.members.contents.find(
        (member: FriendSearchItem) => member.username === username
      );

      if (!found) {
        alert(t.userNotFound);
        return;
      }

      const friend: Friend = {
        id: found.memberId,
        name: found.nickname,
        username: found.username,
        image: pickProfileImage(found), // ✅ 보정된 이미지
        isFriend: false,
      };

      onSelect(friend);
    } catch (err) {
      console.error("❌ 사용자 재조회 실패:", err);
      alert(t.fetchUserFailed);
    }
  };

  const handleRemoveRecent = (username: string) => {
    removeRecentSearch(username);
    setRecentSearches(getRecentSearches());
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <div className="h-full flex flex-col p-5 gap-5">
      <SearchBar value={search} onChange={setSearch} />

      {!debouncedSearch && (
        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>{t.recentSearchTitle}</span>
          <button
            onClick={handleClearRecent}
            className="text-xs text-blue-500 hover:underline"
          >
            {t.clearAllRecent}
          </button>
        </div>
      )}

      {isLoading ? (
        <FriendListSkeleton count={6} />
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {debouncedSearch
            ? friends.map((friend) => (
                <FriendItem
                  key={friend.username}
                  name={friend.nickname}
                  username={friend.username}
                  image={pickProfileImage(friend)}   
                  onClick={() => handleSelectFriend(friend.username, friend)}
                  isSelected={selectedUsername === friend.username}
                  showDelete={false}
                />
              ))
            : recentSearches.map((username) => (
                <FriendItem
                  key={username}
                  name={username}
                  username={username}
                  image={""}
                  onClick={() => handleSelectFriend(username)} // ✅ 재조회 트리거
                  isSelected={selectedUsername === username}
                  showDelete
                  onDelete={() => handleRemoveRecent(username)}
                />
              ))}
        </ul>
      )}
    </div>
  );
};

export default FriendListPanel;
