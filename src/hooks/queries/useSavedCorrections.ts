// hooks/queries/useSavedCorrections.ts
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getSavedCorrections } from "../../apis/correctionsSaved";
import type {
  SavedCorrectionsResponseDTO,
  SavedCorrectionItem,
  SavedCorrectionContentDTO,
} from "../../utils/types/savedCorrection";

const mapToItem = (content: SavedCorrectionContentDTO) => ({
  memo: content.memo,
  original: content.correction.originalText,
  corrected: content.correction.corrected,
  commentText: content.correction.commentText,
  createdAt: content.correction.correctionCreatedAt,
  commentCount: content.correction.commentCount,
  likeCount: content.correction.likeCount,
  member: {
    memberId: content.member.memberId,
    username: content.member.username,
    nickname: content.member.nickname,
    profileImageUrl: content.member.profileImageUrl,
  },
  diaryInfo: {
    diaryId: content.diary.diaryId,
    title: content.diary.diaryTitle,
  },
});

export function useSavedCorrections() {
  return useInfiniteQuery<
    SavedCorrectionsResponseDTO, // TQueryFnData: queryFn이 반환하는 원본 타입
    unknown, // TError
    SavedCorrectionItem[], // TData: select 이후 컴포넌트에 전달할 타입
    ["savedCorrections"], // TQueryKey
    number // TPageParam
  >({
    queryKey: ["savedCorrections"],
    initialPageParam: 1, // ✅ pageParam을 number로 고정
    queryFn: ({ pageParam }) => getSavedCorrections(pageParam, 10),
    getNextPageParam: (last) =>
      last.result.savedCorrections.hasNext
        ? last.result.savedCorrections.page + 1
        : undefined,
    select: (data: InfiniteData<SavedCorrectionsResponseDTO>) =>
      data.pages.flatMap((p) =>
        (p.result.savedCorrections.contents ?? []).map(mapToItem)
      ),
  });
}
