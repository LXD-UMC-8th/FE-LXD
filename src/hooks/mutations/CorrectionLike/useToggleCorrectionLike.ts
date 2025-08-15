import { useMutation } from "@tanstack/react-query";
import type { CorrectionLikeResponseDTO } from "../../../utils/types/correctionLike";
import { postCorrectionLike } from "../../../apis/correctionLikes";

// liked는 더 이상 필요 없으므로 Optional 로 둡니다.
// - toggleLike({ correctionId })  OK
// - toggleLike({ correctionId, liked })  OK (기존 호출부도 그대로 동작)
type Vars = { correctionId: number; liked?: boolean };

export const useToggleCorrectionLike = () => {
  return useMutation<CorrectionLikeResponseDTO, unknown, Vars>({
    // 서버는 POST 하나로 토글 ⇒ correctionId만 사용
    mutationFn: async ({ correctionId }) => postCorrectionLike(correctionId),
  });
};
