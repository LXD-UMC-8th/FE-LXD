import { useMutation, type InfiniteData } from "@tanstack/react-query";
import type { LikeResponseDto, LikeTargetType } from "../../utils/types/likes";
import { postLike } from "../../apis/likes";
import { queryClient } from "../../App.tsx";
import type { getDiariesResponseDTO, diaries } from "../../utils/types/diary";
import { QUERY_KEY } from "../../constants/key.ts";

interface Params {
  targetType: LikeTargetType;
  targetId: number;
}

// Closed-over params pattern: mutate() with no args (variables = void)
export const usePostLike = ({ targetType, targetId }: Params) => {
  return useMutation<
    LikeResponseDto,
    Error,
    void,
    { previousFeed?: InfiniteData<getDiariesResponseDTO> }
  >({
    mutationKey: ["postLike", targetType, targetId],
    mutationFn: () => postLike(targetType, targetId),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: [QUERY_KEY.postLike, targetType, targetId],
        }),
        queryClient.cancelQueries({
          queryKey: [QUERY_KEY.diaries],
          exact: false,
        }),
      ]);

      // Snapshot
      const previousFeed = queryClient.getQueryData<
        InfiniteData<getDiariesResponseDTO>
      >(["diaries"]);

      // Compute + apply optimistic update inside the feed pages
      // NOTE: Make sure ["diaries"] matches the queryKey used in your useInfiniteQuery for the feed (e.g., FEED_QK)
      if (previousFeed?.pages) {
        const nextFeed: InfiniteData<getDiariesResponseDTO> = {
          ...previousFeed,
          pages: previousFeed.pages.map((page) => ({
            ...page,
            result: {
              ...page.result,
              diaries: page.result.contents.map((d: diaries) => {
                if (d.diaryId === targetId && typeof d.likeCount === "number") {
                  const nextLiked = !d.isLiked;
                  const nextCount = nextLiked
                    ? d.likeCount + 1
                    : Math.max(0, d.likeCount - 1);

                  return { ...d, isLiked: nextLiked, likeCount: nextCount };
                }
                return d;
              }),
            },
          })),
        };
        queryClient.setQueryData(["diaries"], () => nextFeed);
      }

      // (Optional) also update the dedicated like-detail cache if you use it elsewhere
      // queryClient.setQueryData(["postLike", targetType, targetId], ...);

      return { previousFeed };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousFeed) {
        queryClient.setQueryData([QUERY_KEY.diaries], ctx.previousFeed);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.diaries] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.postLike, targetType, targetId],
      });
    },
  });
};
