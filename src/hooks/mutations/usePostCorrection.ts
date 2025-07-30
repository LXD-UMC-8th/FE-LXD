import { useMutation } from "@tanstack/react-query";
import type { CorrectionsUploadRequestDTO, CorrectionsUploadResponseDTO } from "../../utils/types/correction";
import { postCorrection } from "../../apis/correction";

export const usePostCorrection = () =>
    useMutation<CorrectionsUploadResponseDTO, Error, CorrectionsUploadRequestDTO>({
        mutationFn: postCorrection,
        onSuccess: (data) => {
            console.log("교정 등록 성공", data);
        },
        onError: (error) => {
            console.log("수정 등록 실패", error.message);
        },
    });