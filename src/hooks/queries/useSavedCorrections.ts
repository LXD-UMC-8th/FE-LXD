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
    select: (data) => {
      if (!data.pages.length) {
        return [];
      }
      
      // 1. API 응답에서 '현재 로그인한 사용자 ID'를 가져옵니다.
      const currentUserId = data.pages[0].result.memberId;

      // 2. 모든 페이지의 데이터를 하나로 합치고, 정제(normalize)합니다.
      const allItems = data.pages.flatMap((p) =>
        (p.result.savedCorrections.contents ?? []).map(normalizeSavedCorrection)
      );

      // 3. 정제된 데이터 목록에서 '일기 작성자 ID'가 '현재 사용자 ID'와 일치하는 항목만 필터링합니다.
      const filteredItems = allItems.filter(item => item.diaryWriterId === currentUserId);
      
      return filteredItems;
    },
  });
}
