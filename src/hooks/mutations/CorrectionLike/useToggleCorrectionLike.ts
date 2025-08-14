import { useMutation } from "@tanstack/react-query";
import type { CorrectionLikeResponseDTO } from "../../../utils/types/correctionLike";
import { postCorrectionLike } from "../../../apis/correctionLikes";

type Vars = { correctionId: number; liked: boolean }; 

export const useToggleCorrectionLike = () => {
  return useMutation<CorrectionLikeResponseDTO, unknown, Vars>({
    mutationFn: async ({ correctionId }) => {
      return postCorrectionLike(correctionId);
    },
  });
};
