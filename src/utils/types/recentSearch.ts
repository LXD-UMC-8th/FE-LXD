const RECENT_SEARCH_KEY = "recentSearches";

export interface RecentSearch {
  username: string;
  image?: string | null; 
  name?: string;         
}


function saveRaw(items: RecentSearch[]) {
  try {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("recentSearches 저장 실패:", e);
  }
}


function readRaw(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCH_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object") {
      const normalized: RecentSearch[] = parsed
        .map((v: any) => ({
          username: String(v?.username ?? ""),
          
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

     
      saveRaw(normalized);
      return normalized;
    }

    
    if (Array.isArray(parsed) && (parsed.length === 0 || typeof parsed[0] === "string")) {
      const migrated: RecentSearch[] = (parsed as string[]).map((username) => ({ username }));
      saveRaw(migrated);
      return migrated;
    }

    
    return [];
  } catch (e) {
    console.warn("recentSearches 파싱 실패:", e);
    return [];
  }
}


export const getRecentSearches = (): string[] => {
  return readRaw().map((item) => item.username);
};


export const getRecentSearchesWithMeta = (): RecentSearch[] => {
  return readRaw();
};


export const addRecentSearch = (username: string, image?: string | null, name?: string) => {
  if (!username) return;

  let items = readRaw();

  
  items = items.filter((it) => it.username !== username);

  
  items.unshift({ username, image: image ?? null, name });


  if (items.length > 10) items = items.slice(0, 10);

  saveRaw(items);
};


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


export const removeRecentSearch = (username: string) => {
  const items = readRaw().filter((it) => it.username !== username);
  saveRaw(items);
};


export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCH_KEY);
};
