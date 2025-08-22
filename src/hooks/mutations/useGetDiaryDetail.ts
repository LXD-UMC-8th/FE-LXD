import { useMutation } from "@tanstack/react-query";
import type {
  DiaryGetRequestDTO,
  DiaryGetResponseDTO,
} from "../../utils/types/diary";
import { getDiaryDetail } from "../../apis/diary";

export const useGetDiaryDetail = () => {
  return useMutation<DiaryGetResponseDTO, Error, DiaryGetRequestDTO>({
    mutationFn: (variables: DiaryGetRequestDTO) =>
      getDiaryDetail(variables.diaryId),

    onError: (error) => {
      console.log("일기 상세 조회 실패", error.message);
    },
  });
};
