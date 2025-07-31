// hooks/useWritingSubmit.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  DiaryUploadRequestDTO,
  DiaryUploadResponseDTO,
} from "../../utils/types/diary";
import { postDiary } from "../../apis/diary";
import { QUERY_KEY } from "../../constants/key";

export function useWritingSubmit() {
  const qc = useQueryClient();

  return useMutation<DiaryUploadResponseDTO, Error, DiaryUploadRequestDTO>({
    mutationKey: [QUERY_KEY.diaryUpload],
    mutationFn: (newDiary) => postDiary(newDiary),
    onSuccess: () => {
      // clear draft
      localStorage.removeItem("style");
      localStorage.removeItem("title");
      localStorage.removeItem("content");
      // refresh diry list
      qc.invalidateQueries([QUERY_KEY.diaryList]);
      console.log("writing submit successful");
    },
    onError: (err) => {
      console.error("Writing submission failed:", err);
    },
  });
}
