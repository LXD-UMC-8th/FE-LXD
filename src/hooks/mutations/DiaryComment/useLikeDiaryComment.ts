import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  DiaryCommentLikeRequestDTO,
  DiaryCommentLikeResponseDTO,
} from "../../../utils/types/diaryComment";
import { likeDiaryComments } from "../../../apis/diaryComment";

function toggleInCommentsArray(arr: any[] | undefined, targetId: number): any[] | undefined {
  if (!Array.isArray(arr)) return arr;

  let changed = false;
  const next = arr.map((c) => {
    if (!c) return c;

    if (c.commentId === targetId) {
      changed = true;
      const wasLiked = !!c.liked;
      return {
        ...c,
        liked: !wasLiked,
        likeCount: Math.max(0, (c.likeCount ?? 0) + (wasLiked ? -1 : 1)),
      };
    }

    const nextReplies = toggleInCommentsArray(c.replies, targetId);
    if (nextReplies !== c.replies) {
      changed = true;
      return { ...c, replies: nextReplies };
    }
    return c;
  });

  return changed ? next : arr;
}

function toggleLikeInList<T>(data: T, commentId: number): T {
  if (!data) return data as T;
  const anyData = data as any;

  if (Array.isArray(anyData?.pages)) {
    let changed = false;
    const pages = anyData.pages.map((page: any) => {
      const nextComments = toggleInCommentsArray(page?.result?.comments, commentId);
      if (nextComments !== page?.result?.comments) {
        changed = true;
        return { ...page, result: { ...page.result, comments: nextComments } };
      }
      return page;
    });
    return (changed ? { ...anyData, pages } : data) as T;
  }

  if (anyData?.result?.comments) {
    const nextComments = toggleInCommentsArray(anyData.result.comments, commentId);
    return (nextComments !== anyData.result.comments
      ? { ...anyData, result: { ...anyData.result, comments: nextComments } }
      : data) as T;
  }

  if (anyData?.comments) {
    const nextComments = toggleInCommentsArray(anyData.comments, commentId);
    return (nextComments !== anyData.comments
      ? { ...anyData, comments: nextComments }
      : data) as T;
  }

  return data as T;
}

export const useLikeDiaryComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DiaryCommentLikeResponseDTO,
    Error,
    DiaryCommentLikeRequestDTO,
    { snapshots: Array<[unknown, unknown]> }
  >({
    mutationFn: likeDiaryComments,

    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ["diaryComments"] });

      const snapshots: Array<[unknown, unknown]> = [];
      queryClient.getQueriesData({ queryKey: ["diaryComments"] }).forEach(([key, oldData]) => {
        snapshots.push([key, oldData]);
        queryClient.setQueryData(key, toggleLikeInList(oldData, commentId));
      });

      return { snapshots };
    },

    onError: (_err, _vars, ctx) => {
      ctx?.snapshots?.forEach(([key, oldData]) => queryClient.setQueryData(key, oldData));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["diaryComments"] });
    },
  });
};
