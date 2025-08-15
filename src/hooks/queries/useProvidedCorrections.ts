// src/hooks/queries/useProvidedCorrections.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProvidedCorrections } from "../../apis/correctionsProvided";
import type { SavedCorrectionItem } from "../../utils/types/savedCorrection";

/** ---- localStorage for liked map ---- */
const LIKED_KEY = "lxd-liked-corrections";

function readLikedMap(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || "{}");
  } catch {
    return {};
  }
}

/** raw 객체 어디에 있어도 correctionId를 찾아내기 위한 안전한 헬퍼 */
function extractCorrectionId(raw: any): number {
  if (!raw || typeof raw !== "object") return 0;
  const keys = ["correctionId", "id", "targetCorrectionId", "diaryCorrectionId"];

  // 1) 최상위
  for (const k of keys) {
    const v = raw?.[k];
    if (Number.isFinite(Number(v)) && Number(v) > 0) return Number(v);
  }
  // 2) 1-depth
  for (const v of Object.values(raw)) {
    if (v && typeof v === "object") {
      for (const k of keys) {
        const vv = (v as any)[k];
        if (Number.isFinite(Number(vv)) && Number(vv) > 0) return Number(vv);
      }
    }
  }
  // 3) 깊이 탐색
  for (const v of Object.values(raw)) {
    if (v && typeof v === "object") {
      const id = extractCorrectionId(v);
      if (id) return id;
    }
  }
  return 0;
}

/** 서버 응답을 화면용으로 변환 (제공 탭) */
const mapToItem = (raw: any, me: any): SavedCorrectionItem => {
  const correctionId = extractCorrectionId(raw);
  return {
    // 제공 탭은 저장 ID/메모 없음 → 0 / ""
    savedCorrectionId: 0,
    memo: "",

    correctionId,

    // 본문
    original: raw?.originalText ?? raw?.original ?? "",
    corrected: raw?.corrected ?? raw?.correctedText ?? "",
    commentText: raw?.commentText ?? "",
    createdAt: raw?.createdAt ?? raw?.correctionCreatedAt ?? raw?.updatedAt ?? "",
    commentCount: raw?.commentCount ?? 0,
    likeCount: raw?.likeCount ?? 0,

    diaryId: raw?.diaryInfo?.diaryId ?? raw?.diary?.diaryId ?? 0,
    diaryTitle: raw?.diaryInfo?.diaryTitle ?? raw?.diary?.diaryTitle ?? "",

    // 서버가 주면 사용, 없으면 후에 캐시로 덮어씀
    liked: raw?.liked ?? raw?.correction?.liked ?? undefined,

    member: {
      // “내가 작성한 교정” → 작성자는 내 정보(me)
      memberId: me?.memberId ?? 0,
      username: me?.username ?? "",
      nickname: me?.nickname ?? "",
      profileImageUrl: me?.profileImageUrl ?? "",
    },
  };
};

export function useProvidedCorrections() {
  return useInfiniteQuery<
    any,                         // 서버 원본
    unknown,
    SavedCorrectionItem[],       // select 후 UI 타입
    ["providedCorrections"],     // 쿼리 키
    number
  >({
    queryKey: ["providedCorrections"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProvidedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last?.result?.corrections?.hasNext
        ? (last?.result?.corrections?.page ?? 1) + 1
        : undefined,
    select: (data) => {
      const likedMap = readLikedMap(); // ✅ 캐시 읽기
      return data.pages.flatMap((p: any) => {
        const me = p?.result?.member ?? {};
        const contents = p?.result?.corrections?.contents ?? [];
        return contents.map((c: any) => {
          const item = mapToItem(c, me);
          // ✅ 캐시가 있으면 캐시 우선 → 없으면 서버 → 없으면 false
          const liked = (likedMap as any)[item.correctionId] ?? item.liked ?? false;
          return { ...item, liked };
        });
      });
    },
    // 깜빡임 줄이기
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
