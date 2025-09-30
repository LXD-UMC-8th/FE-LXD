// src/hooks/queries/useProvidedCorrections.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProvidedCorrections } from "../../apis/correctionsProvided";
import type {
  SavedCorrectionItem,
  ProvidedCorrectionsResponseDTO,
  ProvidedCorrectionContentDTO,
} from "../../utils/types/savedCorrection";

/** 어디에 있어도 correctionId를 찾아내는 헬퍼 */
function extractCorrectionId(raw: any): number {
  if (!raw || typeof raw !== "object") return 0;
  const keys = [ "correctionId", "id", "targetCorrectionId", "diaryCorrectionId" ];
  // ... (이하 복잡한 ID 찾기 로직은 그대로 유지)
  for (const k of keys) {
    const v = raw?.[k];
    if (Number.isFinite(Number(v)) && Number(v) > 0) return Number(v);
  }
  for (const v of Object.values(raw)) {
    if (v && typeof v === "object") {
      for (const k of keys) {
        const vv = (v as any)[k];
        if (Number.isFinite(Number(vv)) && Number(vv) > 0) return Number(vv);
      }
    }
  }
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
    liked: raw?.liked, // liked 정보는 select 함수에서 최종 결정
    member: {
      memberId: me?.memberId ?? me?.id ?? 0,
      username: me?.username ?? "",
      nickname: me?.nickname ?? "",
      profileImageUrl: me?.profileImageUrl ?? me?.profileImage ?? "",
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
      // ✅ [최종 수정] localStorage 관련 로직을 모두 제거합니다.
      return data.pages.flatMap((p) => {
        const me = p?.result?.member ?? p?.result?.memberProfile ?? {};
        const contents = p?.result?.corrections?.contents ?? [];

        return contents.map((c: any) => {
          const item = mapToItem(c, me);

          // ✅ [최종 수정] 'likeCount'가 0보다 크면 'liked' 상태를 true로 간주합니다.
          const liked = (item.likeCount ?? 0) > 0;

          return { ...item, liked };
        });
      });
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}