// src/components/Friends/FriendListPanel.tsx
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FriendItem, { pickProfileImage } from "./FriendItem";
import FriendListSkeleton from "./Skeleton/FriendListSkeleton";
import {
  getRecentSearchesWithMeta,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  updateRecentSearchMeta,
  type RecentSearch,
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
  profileImg?: string | null; // ✅ 백엔드 스펙 대응 (/members/profile 등)
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
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

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

  // 초기 로드: 최근검색 불러오기 + 이미지 비어있는 항목 메타 백필
  useEffect(() => {
    const items = getRecentSearchesWithMeta();
    setRecentSearches(items);

    // 이미지 없는 항목을 서버 재조회로 보정 (한 번만)
    (async () => {
      const need = items.filter((it) => !it.image);
      if (need.length === 0) return;

      for (const it of need) {
        try {
          const data = await searchFriends(it.username);
          const found: FriendSearchItem | undefined =
            data.result.members.contents.find(
              (m: FriendSearchItem) => m.username === it.username,
            );
          if (!found) continue;

          const img = found.profileImg || pickProfileImage(found);
          const name = found.nickname;
          updateRecentSearchMeta(it.username, img, name);
        } catch {
          // 무시하고 다음으로
        }
      }

      setRecentSearches(getRecentSearchesWithMeta());
    })();
  }, []);

  // ✅ username만 있는 경우도 서버에서 정보 조회
  const handleSelectFriend = async (username: string, userInfo?: FriendSearchItem) => {
    // 검색 결과에서 온 경우
    if (userInfo) {
      const img = userInfo.profileImg || pickProfileImage(userInfo);
      addRecentSearch(username, img, userInfo.nickname); // ✅ 이미지/닉네임 저장
      setRecentSearches(getRecentSearchesWithMeta());

      const friend: Friend = {
        id: userInfo.memberId,
        name: userInfo.nickname,
        username: userInfo.username,
        image: img,
        isFriend: false,
      };
      onSelect(friend);
      return;
    }

    // 최근 검색에서 온 경우 → 서버 재조회
    try {
      const data = await searchFriends(username);
      const found: FriendSearchItem | undefined = data.result.members.contents.find(
        (member: FriendSearchItem) => member.username === username,
      );

      if (!found) {
        alert(t.userNotFound);
        return;
      }

      const img = found.profileImg || pickProfileImage(found);
      addRecentSearch(found.username, img, found.nickname); // ✅ 메타 갱신
      setRecentSearches(getRecentSearchesWithMeta());

      const friend: Friend = {
        id: found.memberId,
        name: found.nickname,
        username: found.username,
        image: img,
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
    setRecentSearches(getRecentSearchesWithMeta());
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
                  // ✅ 검색 결과: 서버가 주는 profileImg 우선 사용, 없으면 보정
                  image={friend.profileImg || pickProfileImage(friend)}
                  onClick={() => handleSelectFriend(friend.username, friend)}
                  isSelected={selectedUsername === friend.username}
                  showDelete={false}
                />
              ))
            : recentSearches.map((item) => (
                <FriendItem
                  key={item.username}
                  name={item.name ?? item.username}
                  username={item.username}
                  // ✅ 저장된 이미지 그대로 표시 (없으면 빈 문자열 → 컴포넌트에서 기본아바타)
                  image={item.image ?? ""}
                  onClick={() => handleSelectFriend(item.username)} // ✅ 재조회 트리거
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
