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
      const r = last?.result as unknown;

      // ✅ hasNext가 있는 API이면 그걸 사용
      if (r && typeof r === "object" && "hasNext" in (r as any)) {
        return (r as any).hasNext ? allPages.length + 1 : undefined;
      }

      // ✅ hasNext가 없으면 길이로 추정
      const count = pickList(last?.result).length;
      return count === pageSize ? allPages.length + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((p) => pickList(p.result).map(mapToUI)),
  });
}
