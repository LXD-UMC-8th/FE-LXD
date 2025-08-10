import { useInfiniteQuery } from "@tanstack/react-query";
import { getCorrectionList } from "../../apis/correction";
import type {
  CorrectionGetListResponseDTO,
  CorrectionsGetRequestDTO,
} from "../../utils/types/correction";

type Lang = "KO" | "EN";

export function useInfiniteProvidedCorrectionList(
  size: number,
  lang: Lang,
  enabled = true,
) {
  return useInfiniteQuery<CorrectionGetListResponseDTO, Error>({
    queryKey: ["providedCorrectionList", size, lang],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getCorrectionList({
        page: pageParam,
        size,
        lang,
      } as CorrectionsGetRequestDTO & { lang: string }),
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.page + 1 : undefined,
    enabled,
  });
}
