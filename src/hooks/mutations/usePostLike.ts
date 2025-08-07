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

export const usePostLike = () => {
  return useMutation<LikeResponseDto, Error, Params>({
    mutationFn: (Targets) => postLike(Targets),
    onMutate: async (Targets) => {
      await queryClient.cancelQueries({
        queryKey: ["postLike", Targets],
      });

      //여기 type지정까지 잘 해놨음 ㅇㅇ,,
      const previousDiaryPost = queryClient.getQueryData(["postLike", Targets]);

      queryClient.setQueryData(["postLike", Targets], (oldData) => [
        ...oldData,
        Targets,
      ]);

      return { previousDiaryPost };
    },
    mutationKey: ["postLike"],
    onSuccess: (data) => {
      console.log("좋아요 완료", data);
    },
    onError: (err) => {
      console.error("좋아요 실패", err.message);
    },
  });
};
