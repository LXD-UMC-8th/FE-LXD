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
    onSuccess: (data) => {
      console.log("교정 댓글 목록 불러오기 성공", data);
    },
    onError: (error) => {
      console.log("교정 댓글 불러오기 실패", error.message);
    },
  });
};
