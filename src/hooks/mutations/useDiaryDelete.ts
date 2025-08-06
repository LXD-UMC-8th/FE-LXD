import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteDiary } from "../../apis/diary";
import type { DiaryDeleteRequestDTO } from "../../utils/types/diary";

export const useDeleteDiaryMutation = (diaryId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteDiary({ diaryId } as DiaryDeleteRequestDTO),
    onSuccess: () => {
      alert("일기가 삭제되었습니다.");
      navigate("/mydiary");
    },
    onError: (err) => {
      alert("삭제에 실패했습니다.");
      console.error(err);
    },
  });
};
