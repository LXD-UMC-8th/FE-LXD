import { useMutation } from "@tanstack/react-query";

import type { CorrectionLikeResponseDTO } from "../../../utils/types/correctionLike";
import { deleteCorrectionLike, postCorrectionLike } from "../../../apis/correctionLikes";

type Vars = { correctionId: number; liked: boolean };

export const useToggleCorrectionLike = () => {
  return useMutation<CorrectionLikeResponseDTO, unknown, Vars>({
    mutationFn: async ({ correctionId, liked }) => {
      // liked === true 면 현재 좋아요 상태이므로 "취소" => DELETE
      // liked === false 면 현재 비-좋아요 상태이므로 "등록" => POST
      return liked
        ? deleteCorrectionLike(correctionId)
        : postCorrectionLike(correctionId);
    },
  });
};
