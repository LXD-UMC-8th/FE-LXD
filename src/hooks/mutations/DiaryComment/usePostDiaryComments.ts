import { useMutation } from "@tanstack/react-query";
import type { DiaryCommentRequestDTO, DiaryCommentResponseDTO } from "../../../utils/types/diaryComment";
import { postDiaryComments } from "../../../apis/diaryComment";

export const usePostDiaryComments = () =>
    useMutation<DiaryCommentResponseDTO,
        Error,
        { diaryId: number } & DiaryCommentRequestDTO
    >({
        mutationFn: ({ diaryId, ...body }) =>
            postDiaryComments(diaryId, body),
        onSuccess: (data) => {
            console.log("댓글 등록 성공", data);
        },
        onError: (error) => {
            console.log("댓글 등록 실패", error.message);
        },
    });