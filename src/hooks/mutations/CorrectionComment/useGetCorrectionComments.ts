import { useMutation } from "@tanstack/react-query";
import type {
  CorrectionCommentGetRequestDTO,
  CorrectionCommentGetResponseDTO,
} from "../../../utils/types/correctionComment";
import { getCorrectionComments } from "../../../apis/correctionComment";

export const useGetCorrectionComments = () => {
  return useMutation<
    CorrectionCommentGetResponseDTO,
    Error,
    CorrectionCommentGetRequestDTO
  >({
    mutationFn: getCorrectionComments,
    onSuccess: () => {
    
    },
    onError: () => {
      
    },
  });
};
