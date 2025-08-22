import { useMutation } from "@tanstack/react-query"
import type { CorrectionsGetRequestDTO, CorrectionsGetResponseDTO } from "../../utils/types/correction"
import { getCorrection } from "../../apis/correction"

export const useGetCorrections = () => {
    return useMutation<CorrectionsGetResponseDTO, Error, CorrectionsGetRequestDTO>({
        mutationFn: getCorrection,
        onSuccess: () => {
           // console.log("교정 목록 불러오기 성공", data);
        },
        onError: () => {
            console.error("교정 목록 불러오기 실패");
        }
    })
}