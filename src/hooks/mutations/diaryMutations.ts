import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteDiary } from "../../apis/diary";

export const useDeleteDiaryMutation = (diaryId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteDiary({ diaryId }), // 객체 형태로 넘긴 경우
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