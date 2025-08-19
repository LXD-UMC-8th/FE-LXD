// src/utils/types/recentSearch.ts

const RECENT_SEARCH_KEY = "recentSearches";

// V2 저장 포맷: 메타 포함
export interface RecentSearch {
  username: string;
  image?: string | null; // 프로필 이미지 URL
  name?: string;         // 닉네임(옵션)
}

// 내부: 저장
function saveRaw(items: RecentSearch[]) {
  try {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("recentSearches 저장 실패:", e);
  }
}

// 내부: 읽기 + 레거시(string[]) 마이그레이션
function readRaw(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCH_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // 1) 이미 객체 배열인 경우 -> 정상화
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object") {
      const normalized: RecentSearch[] = parsed
        .map((v: any) => ({
          username: String(v?.username ?? ""),
          // ✅ 백엔드 스펙 대응: profileImg 우선 포함
          image:
            v?.image ??
            v?.profileImg ??
            v?.profileImage ??
            v?.profileImageUrl ??
            v?.profileUrl ??
            null,
          name: v?.name ?? v?.nickname ?? undefined,
        }))
        .filter((v) => v.username);

      // 혹시 잘못 저장된 값이 섞였으면 정상화본으로 다시 저장
      saveRaw(normalized);
      return normalized;
    }

    // 2) 레거시(string[]) → 객체 배열로 마이그레이션
    if (Array.isArray(parsed) && (parsed.length === 0 || typeof parsed[0] === "string")) {
      const migrated: RecentSearch[] = (parsed as string[]).map((username) => ({ username }));
      saveRaw(migrated);
      return migrated;
    }

    // 그 외 형태면 초기화
    return [];
  } catch (e) {
    console.warn("recentSearches 파싱 실패:", e);
    return [];
  }
}

/** ✅ 기존 API 유지: usernames만 반환 (호환성 유지) */
export const getRecentSearches = (): string[] => {
  return readRaw().map((item) => item.username);
};

/** ✅ 메타 포함 버전: 이미지/닉네임까지 반환 */
export const getRecentSearchesWithMeta = (): RecentSearch[] => {
  return readRaw();
};

/** ✅ 추가: 이미지/닉네임까지 함께 저장 (기존 사용법도 그대로 동작) */
export const addRecentSearch = (username: string, image?: string | null, name?: string) => {
  if (!username) return;

  let items = readRaw();

  // 중복 제거
  items = items.filter((it) => it.username !== username);

  // 맨 앞에 추가
  items.unshift({ username, image: image ?? null, name });

  // 최대 10개 제한
  if (items.length > 10) items = items.slice(0, 10);

  saveRaw(items);
};

/** ✅ username의 메타만 갱신 */
export const updateRecentSearchMeta = (
  username: string,
  image?: string | null,
  name?: string,
) => {
  if (!username) return;
  const items = readRaw();
  const idx = items.findIndex((it) => it.username === username);
  if (idx === -1) return;

  items[idx] = {
    ...items[idx],
    image: image ?? items[idx].image ?? null,
    name: name ?? items[idx].name,
  };

  saveRaw(items);
};

/** ✅ 기존 API 유지 */
export const removeRecentSearch = (username: string) => {
  const items = readRaw().filter((it) => it.username !== username);
  saveRaw(items);
};

/** ✅ 기존 API 유지 */
export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCH_KEY);
};
