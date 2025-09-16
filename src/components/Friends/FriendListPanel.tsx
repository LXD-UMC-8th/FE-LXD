// src/components/Friends/FriendListPanel.tsx

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FriendItem, { pickProfileImage } from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";
import useDebounce from "../../hooks/queries/useDebounce";
// ✅ 1. 로컬 스토리지 유틸리티를 제거하고, 새로운 API 함수들을 임포트합니다.
import {
  searchFriends,
  getRecentFriendSearches,
  deleteRecentSearch,
  clearAllRecentSearches,
} from "../../apis/friend";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

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
  profileImageUrl?: string | null;
  profileImage?: string | null;
  profileUrl?: string | null;
  profileImg?: string | null;
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
  // ✅ 2. 최근 검색 목록의 타입을 API 응답과 맞춥니다.
  const [recentSearches, setRecentSearches] = useState<FriendSearchItem[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  // '검색어'가 있을 때 API로 친구를 검색하는 로직 (기존과 동일)
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

  // ✅ 3. 컴포넌트가 마운트될 때, 로컬 스토리지가 아닌 API로 '최근 검색 기록'을 불러옵니다.
  useEffect(() => {
    const fetchRecent = async () => {
      setIsLoading(true);
      try {
        // API 응답 구조를 result.contents로 가정했습니다. 실제 구조에 맞게 수정이 필요할 수 있습니다.
        const data = await getRecentFriendSearches();
        setRecentSearches(data.result.contents || []);
      } catch (err) {
        console.error("❌ 최근 검색 기록 조회 실패:", err);
        setRecentSearches([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecent();
  }, []);

  // ✅ 4. 친구 선택 시, 로컬 스토리지에 저장하는 로직을 제거합니다.
  const handleSelectFriend = (userInfo: FriendSearchItem) => {
    const friend: Friend = {
      id: userInfo.memberId,
      name: userInfo.nickname,
      username: userInfo.username,
      image: userInfo.profileImg || pickProfileImage(userInfo),
      isFriend: false, // 이 정보는 ProfileView에서 useFriendship 훅이 다시 정확하게 판단합니다.
    };
    onSelect(friend);
  };

  // ✅ 5. 최근 검색 기록 '개별 삭제'를 API로 처리합니다.
  const handleRemoveRecent = async (username: string) => {
    try {
      await deleteRecentSearch(username);
      // API 호출 성공 시, 화면(state)에서 해당 항목을 즉시 제거합니다.
      setRecentSearches((prev) =>
        prev.filter((item) => item.username !== username)
      );
    } catch (err) {
      console.error("❌ 최근 검색 기록 삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  // ✅ 6. 최근 검색 기록 '전체 삭제'를 API로 처리합니다.
  const handleClearRecent = async () => {
    try {
      await clearAllRecentSearches();
      // API 호출 성공 시, 화면(state)에서 모든 항목을 즉시 제거합니다.
      setRecentSearches([]);
    } catch (err) {
      console.error("❌ 최근 검색 기록 전체 삭제 실패:", err);
      alert("전체 삭제에 실패했습니다.");
    }
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
                  key={friend.memberId}
                  name={friend.nickname}
                  username={friend.username}
                  image={friend.profileImg || pickProfileImage(friend)}
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
                  image={item.profileImg || pickProfileImage(item)}
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