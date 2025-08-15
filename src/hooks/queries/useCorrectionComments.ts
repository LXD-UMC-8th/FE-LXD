// hooks/queries/useCorrectionComments.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCorrectionComments } from "../../apis/correctionComment";
import type {
  CorrectionCommentDTO,
  CorrectionCommentGetResponseDTO,
  UICorrectionComment,
} from "../../utils/types/correctionComment";

const mapToUI = (c: CorrectionCommentDTO): UICorrectionComment => ({
  commentId: c.commentId,
  content: c.content,
  createdAt: c.createdAt,
  member: {
    memberId: c.memberId,
    username: c.username,
    nickname: c.nickname,
    profileImageUrl: c.profileImage,
  },
});

// result.content 또는 result.contents 둘 다 지원
const pickList = (r: any): CorrectionCommentDTO[] =>
  (Array.isArray(r?.contents) ? r?.contents : r?.content) ?? [];

export function useCorrectionComments(
  correctionId?: number,
  enabled: boolean = true,
  pageSize: number = 10
) {
  return useInfiniteQuery<
    CorrectionCommentGetResponseDTO,
    unknown,
    UICorrectionComment[],
    [string, number | undefined, number],
    number
  >({
    queryKey: ["correctionComments", correctionId, pageSize],
    enabled: !!correctionId && enabled,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCorrectionComments({
        correctionId: correctionId as number,
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (last, allPages) => {
      const count = last?.result?.contents?.length ?? 0;
      return count === pageSize ? allPages.length + 1 : undefined;
    },
    select: (data) =>
      data.pages.flatMap((p) => (p.result.contents ?? []).map(mapToUI)),
  });
}
