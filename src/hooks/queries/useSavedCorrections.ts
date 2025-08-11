// hooks/queries/useSavedCorrections.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedCorrections } from "../../apis/correctionsSaved";
import type {
  SavedCorrectionsResponseDTO,
  SavedCorrectionItem,
  SavedCorrectionContentDTO,
} from "../../utils/types/savedCorrection";

const mapToItem = (c: SavedCorrectionContentDTO): SavedCorrectionItem => ({
  savedCorrectionId: c.savedCorrectionId,
  memo: c.memo,
  original: c.correction.originalText,
  corrected: c.correction.corrected,
  commentText: c.correction.commentText,
  createdAt: c.correction.correctionCreatedAt,
  commentCount: c.correction.commentCount,
  likeCount: c.correction.likeCount,
  diaryId: c.diary.diaryId,
  diaryTitle: c.diary.diaryTitle,
  member: {
    memberId: c.member.memberId,
    username: c.member.username,
    nickname: c.member.nickname,
    profileImageUrl: c.member.profileImageUrl,
  },
});

export function useSavedCorrections() {
  return useInfiniteQuery<
    SavedCorrectionsResponseDTO, // TQueryFnData: queryFn이 반환하는 원본 타입
    unknown,                     // TError
    SavedCorrectionItem[],       // TData: select 이후 컴포넌트에 전달할 타입
    ["savedCorrections"],        // TQueryKey
    number                       // TPageParam
  >({
    queryKey: ["savedCorrections"],
    initialPageParam: 1, // ✅ pageParam을 number로 고정
    queryFn: ({ pageParam }) => getSavedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last.result.savedCorrections.hasNext
        ? last.result.savedCorrections.page + 1
        : undefined,
    select: (data) =>
      data.pages.flatMap((p) =>
        (p.result.savedCorrections.contents ?? []).map(mapToItem)
      ),
  });
}
