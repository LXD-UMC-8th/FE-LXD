import { useMutation } from "@tanstack/react-query"
import type { DiaryCommentGetRequestDTO, DiaryCommentGetResponseDTO } from "../../../utils/types/diaryComment"
import { getDiaryComments } from "../../../apis/diaryComment"

export const useGetDiaryComments = () => {
    return useMutation<DiaryCommentGetResponseDTO, Error, DiaryCommentGetRequestDTO>({
        mutationFn: getDiaryComments,
        onSuccess: (data) => {
            console.log("일기 댓글 목록 불러오기 성공", data);
        },
        onError: (error) => {
            console.log("일기 댓글 불러오기 실패", error.message);
        }
    })
}