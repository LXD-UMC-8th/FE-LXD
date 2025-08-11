import { useMutation } from "@tanstack/react-query";
import type { CorrectionCommentDeleteResponseDTO, CorrectionCommentDeleteRequestDTO } from "../../../utils/types/correctionComment";
import { deleteCorrectionComments } from "../../../apis/correctionComment";

export const useDeleteCorrectionComment = () =>
    useMutation<CorrectionCommentDeleteResponseDTO, Error, CorrectionCommentDeleteRequestDTO>({
        mutationFn: deleteCorrectionComments,
        onSuccess: () => {
            console.log("댓글 삭제 성공");
        },
        onError: (error) => {
            console.log("댓글 삭제 실패", error.message);
        },
    });