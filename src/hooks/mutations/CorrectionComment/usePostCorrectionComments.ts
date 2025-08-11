import { useMutation } from "@tanstack/react-query";
import type { CorrectionCommentResponseDTO, CorrectionCommentRequestDTO } from "../../../utils/types/correctionComment";
import { postCorrectionComments } from "../../../apis/correctionComment";

export const usePostCorrectionComment = () =>
    useMutation<CorrectionCommentResponseDTO,
        Error, 
        { correctionId: string } & CorrectionCommentRequestDTO
      >({
        mutationFn: ({ correctionId, ...body }) => 
            postCorrectionComments(correctionId, body),
        onSuccess: (data) => {
            console.log("댓글 등록 성공", data);
        },
        onError: (error) => {
            console.log("댓글 등록 실패", error.message);
        },  
    });