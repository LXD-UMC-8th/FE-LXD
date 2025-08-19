import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CorrectionLikeResponseDTO } from "../../../utils/types/correctionLike";
import { postCorrectionLike } from "../../../apis/correctionLikes";
import { QUERY_KEY } from "../../../constants/key";

type Vars = { correctionId: number; liked?: boolean };

type ToggleLikeResult = {
  correctionId: number;
  memberId: number;
  likeCount: number;
  liked: boolean;
};

export const useToggleCorrectionLike = () => {
  const qc = useQueryClient();
  return useMutation<ToggleLikeResult, unknown, Vars>({
    mutationFn: async ({ correctionId }) => {
      const dto: CorrectionLikeResponseDTO = await postCorrectionLike(correctionId);
      return dto.result; 
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.providedCorrections] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.savedCorrections] });
    },
  });
};
