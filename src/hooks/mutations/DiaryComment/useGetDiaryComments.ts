import { useMutation } from "@tanstack/react-query";
import type {
  DiaryCommentGetRequestDTO,
  DiaryCommentGetResponseDTO,
} from "../../../utils/types/diaryComment";
import { getDiaryComments } from "../../../apis/diaryComment";

export const useGetDiaryComments = () => {
  return useMutation<
    DiaryCommentGetResponseDTO,
    Error,
    DiaryCommentGetRequestDTO
  >({
    mutationFn: getDiaryComments,
    onSuccess: () => {},
    onError: (error) => {
      console.log("일기 댓글 불러오기 실패", error.message);
    },
  });
};
