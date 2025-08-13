import { useMutation } from "@tanstack/react-query"
import type { DiaryCommentDeleteRequestDTO, DiaryCommentDeleteResponseDTO } from "../../../utils/types/diaryComment"
import { deleteDiaryComments } from "../../../apis/diaryComment"

export const useDeleteDiaryComments = () => {
    return useMutation<DiaryCommentDeleteResponseDTO, Error, DiaryCommentDeleteRequestDTO>({
        mutationFn: deleteDiaryComments,
        onSuccess: () => {
            console.log("댓글 삭제 성공");
        },
        onError: (error) => {
            console.log("댓글 삭제 실패", error.message);
        },
    });
}