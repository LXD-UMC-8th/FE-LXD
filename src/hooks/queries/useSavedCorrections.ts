import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedCorrections } from "../../apis/correctionsSaved";
import type {
  SavedCorrectionsResponseDTO,
  SavedCorrectionItem,
} from "../../utils/types/savedCorrection";
import { normalizeSavedCorrection } from "../../utils/types/savedCorrection";

export function useSavedCorrections() {
  return useInfiniteQuery<
    SavedCorrectionsResponseDTO, // 서버 원본
    unknown,                     // 에러
    SavedCorrectionItem[],       // select 후 컴포넌트로 나가는 타입
    ["savedCorrections"],        // 키
    number                       // pageParam
  >({
    queryKey: ["savedCorrections"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getSavedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last.result.savedCorrections.hasNext
        ? last.result.savedCorrections.page + 1
        : undefined,
    select: (data) =>
      data.pages.flatMap((p) =>
        (p.result.savedCorrections.contents ?? []).map(normalizeSavedCorrection)
      ),
  });
}
