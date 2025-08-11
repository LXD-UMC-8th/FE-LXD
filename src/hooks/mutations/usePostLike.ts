import { useMutation } from "@tanstack/react-query";
import type {
  getLikeResponseDTO,
  LikeResponseDto,
  LikeTargetType,
} from "../../utils/types/likes";
import { postLike } from "../../apis/likes";
import { queryClient } from "../../App.tsx";

interface Params {
  targetType: LikeTargetType;
  targetId: number;
}

export const usePostLike = ({ targetType, targetId }: Params) => {
  return useMutation<LikeResponseDto, Error, Params>({
    mutationKey: ["postLike", targetType, targetId],
    mutationFn: ({ targetType, targetId }) => postLike(targetType, targetId),
    onMutate: async ({ targetType, targetId }) => {
      await queryClient.cancelQueries({
        queryKey: ["postLike", targetType, targetId],
      });

      const previousData = queryClient.getQueryData<getLikeResponseDTO>([
        "postLike",
        targetType,
        targetId,
      ]);

      console.log("previous data: ", previousData);

      if (previousData) {
        const nextResult = {
          ...previousData.result,
          liked: !previousData.result.liked,
          likeCount: previousData.result.liked
            ? previousData.result.likeCount - 1
            : previousData.result.likeCount + 1,
        };
        const nextData = { ...previousData, result: nextResult };

        queryClient.setQueryData(["postLike", targetType, targetId], nextData);
      }

      return { previousData, targetType, targetId };
    },
    onSuccess: (data) => {
      console.log("좋아요 완료", data);
    },
    onError: (_err: Error, variables, data) => {
      console.error("좋아요 실패", _err.message);
      const context = data as { previousData?: getLikeResponseDTO };
      if (context.previousData) {
        queryClient.setQueryData(
          ["postLike", variables.targetType, variables.targetId],
          context.previousData
        );
      }
    },
    onSettled: (_data, targetId, targetType) => {
      queryClient.invalidateQueries({
        queryKey: ["postLike", targetType, targetId],
      });
    },
  });
};
