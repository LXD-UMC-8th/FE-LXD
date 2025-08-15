// src/hooks/queries/useProvidedCorrections.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProvidedCorrections } from "../../apis/correctionsProvided";
import type {
  SavedCorrectionItem,
  ProvidedCorrectionsResponseDTO,
  ProvidedCorrectionContentDTO,
} from "../../utils/types/savedCorrection";

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

/** 어디에 있어도 correctionId를 찾아내는 헬퍼 */
function extractCorrectionId(raw: any): number {
  if (!raw || typeof raw !== "object") return 0;
  const keys = [
    "correctionId",
    "id",
    "targetCorrectionId",
    "diaryCorrectionId",
  ];

  // 1) 1차 키 검사
  for (const k of keys) {
    const v = raw?.[k];
    if (Number.isFinite(Number(v)) && Number(v) > 0) return Number(v);
  }

  // 2) 1단계 중첩 검사
  for (const v of Object.values(raw)) {
    if (v && typeof v === "object") {
      for (const k of keys) {
        const vv = (v as any)[k];
        if (Number.isFinite(Number(vv)) && Number(vv) > 0) return Number(vv);
      }
    }
  }

  // 3) 재귀적 탐색
  for (const v of Object.values(raw)) {
    if (v && typeof v === "object") {
      const id = extractCorrectionId(v);
      if (id) return id;
    }
  }

  return 0;
}

/** 서버 → 화면용 매핑 (제공 탭 원본을 SavedCorrectionItem으로) */
const mapToItem = (
  raw: ProvidedCorrectionContentDTO,
  me: any
): SavedCorrectionItem => {
  const correctionId = extractCorrectionId(raw);
  return {
    savedCorrectionId: 0,
    memo: "",
    correctionId,
    original: raw?.originalText ?? raw?.original ?? "",
    corrected: raw?.corrected ?? raw?.correctedText ?? "",
    commentText: raw?.commentText ?? "",
    createdAt:
      raw?.createdAt ?? raw?.correctionCreatedAt ?? raw?.updatedAt ?? "",
    commentCount: raw?.commentCount ?? 0,
    likeCount: raw?.likeCount ?? 0,
    diaryId: raw?.diaryInfo?.diaryId ?? raw?.diary?.diaryId ?? 0,
    diaryTitle: raw?.diaryInfo?.diaryTitle ?? raw?.diary?.diaryTitle ?? "",
    liked: raw?.liked ?? raw?.correction?.liked ?? undefined,
    member: {
      memberId: me?.memberId ?? 0,
      username: me?.username ?? "",
      nickname: me?.nickname ?? "",
      profileImageUrl: me?.profileImageUrl ?? "",
    },
  };
};

export function useProvidedCorrections() {
  return useInfiniteQuery<
    ProvidedCorrectionsResponseDTO,
    unknown,
    SavedCorrectionItem[],
    ["providedCorrections"],
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
      const likedMap = readLikedMap();

      return data.pages.flatMap((p) => {
        const me = p?.result?.member ?? {};
        const contents = p?.result?.corrections?.contents ?? [];

        return contents.map((c: any) => {
          const item = mapToItem(c, me);

          /** ✅ 서버 값 우선, 로컬 보조 + 가드 */
          const serverLiked =
            typeof item.liked === "boolean" ? item.liked : undefined;

          // id가 유효할 때만 로컬을 사용
          const localLiked =
            item.correctionId > 0
              ? (likedMap as any)[item.correctionId]
              : undefined;

          // 최종 liked 병합
          let liked = serverLiked ?? localLiked ?? false;

          // 서버가 liked를 안 주고 likeCount가 0이면 로컬 true를 무시(유령 하트 방지)
          if (serverLiked === undefined && (item.likeCount ?? 0) === 0) {
            liked = false;
          }

          return { ...item, liked };
        });
      });
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
