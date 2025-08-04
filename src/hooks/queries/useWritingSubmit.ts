// hooks/useWritingSubmit.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type {
  DiaryUploadRequestDTO,
  DiaryUploadResponseDTO,
} from "../../utils/types/diary";
import { postDiaryUpload } from "../../apis/diary";
import { QUERY_KEY } from "../../constants/key";

export function useWritingSubmit() {
  const navigate = useNavigate();
  return useMutation<DiaryUploadResponseDTO, Error, DiaryUploadRequestDTO>({
    mutationKey: [QUERY_KEY.diaryUpload],
    mutationFn: (newDiary) => postDiaryUpload(newDiary),
    onSuccess: (data) => {
      // clear draft
      localStorage.removeItem("style");
      localStorage.removeItem("title");
      localStorage.removeItem("content");
      console.log("writing submit successful");
      console.log(data);
      navigate(`/feed/${data.result.diaryId}`);
    },
    onError: (err) => {
      console.error("Writing submission failed:", err);
      alert();
    },
  });
}
