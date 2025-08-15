import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedCorrections } from "../../apis/correctionsSaved";
import type {
  SavedCorrectionsResponseDTO,
  SavedCorrectionItem,
} from "../../utils/types/savedCorrection";
import { normalizeSavedCorrection } from "../../utils/types/savedCorrection";

export function useSavedCorrections() {
  return useInfiniteQuery<
    SavedCorrectionsResponseDTO,
    unknown,
    SavedCorrectionItem[],
    ["savedCorrections"],
    number
  >({
    queryKey: ["savedCorrections"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getSavedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last.result.savedCorrections.hasNext
        ? last.result.savedCorrections.page + 1
        : undefined,
    select: (data: InfiniteData<SavedCorrectionsResponseDTO>) =>
      data.pages.flatMap((p) =>
        (p.result.savedCorrections.contents ?? []).map(normalizeSavedCorrection)
      ),
  });
}
