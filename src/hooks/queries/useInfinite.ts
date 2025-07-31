// types (adjust to your actual API types)
interface CorrectionItem {
  // whatever fields a correction has
  id: string;
  text: string;
}

interface CorrectionListResponse {
  items: CorrectionItem[];
  nextCursor?: number;
}

// Hook
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCorrectionList } from "../../apis/correction";

export function useInfiniteCorrectionList(size: number, lang: "KO" | "EN") {
  return useInfiniteQuery<CorrectionListResponse, Error>({
    queryKey: ["correctionList", size, lang],
    queryFn: ({ pageParam = 0 }) =>
      // make sure to return the promise
      getCorrectionList(
        {
          cursor: pageParam,
          size,
          lang,
        },
        undefined,
      ),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
