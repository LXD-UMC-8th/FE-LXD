const RECENT_SEARCH_KEY = "recentSearches";

// 최근 검색 목록 가져오기
export const getRecentSearches = (): string[] => {
  const saved = localStorage.getItem(RECENT_SEARCH_KEY);
  return saved ? JSON.parse(saved) : [];
};

// 최근 검색 추가
export const addRecentSearch = (username: string) => {
  let searches = getRecentSearches();
  searches = searches.filter((item) => item !== username);
  searches.unshift(username);
  if (searches.length > 10) {
    searches = searches.slice(0, 10);
  }
  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(searches));
};

// 특정 검색어 삭제
export const removeRecentSearch = (username: string) => {
  const updated = getRecentSearches().filter((item) => item !== username);
  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
};

// 전체 삭제
export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCH_KEY);
};
