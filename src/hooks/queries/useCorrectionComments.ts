import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getCorrectionComments,
  type RawCorrectionComment,
} from "../../apis/correctionsComments";

// 화면용으로 변환된 댓글 타입
export type CommentItem = {
  commentId: number;
  content: string;
  createdAt: string;
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string; // 내부에서 통일
  };
};

const mapToItem = (r: RawCorrectionComment): CommentItem => ({
  commentId: r.commentId,
  content: r.content,
  createdAt: r.createdAt,
  member: {
    memberId: r.memberId,
    username: r.username,
    nickname: r.nickname,
    profileImageUrl: r.profileImage, // ← 필드명 매핑
  },
});

export function useCorrectionComments(
  correctionId?: number,
  enabled = true
) {
  return useInfiniteQuery({
    queryKey: ["correctionComments", correctionId],
    enabled: !!correctionId && enabled,
    initialPageParam: 1,                     // 스웨거가 1 기반
    queryFn: ({ pageParam }) =>
      getCorrectionComments(correctionId as number, pageParam, 10),
    getNextPageParam: (last) =>
      last.result.hasNext ? last.result.page + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((p) =>
        (p.result.contents ?? []).map(mapToItem)
      ),
  });
}
