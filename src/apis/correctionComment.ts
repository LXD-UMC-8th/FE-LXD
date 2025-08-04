import type { CorrectionCommentRequestDTO, CorrectionCommentResponseDTO } from "../utils/types/correctionComment";
import { axiosInstance } from "./axios";

export const postCorrectionComments = async (
    correctionId: string,
    body: CorrectionCommentRequestDTO,
): Promise<CorrectionCommentResponseDTO> => {
    const { data } = await axiosInstance.post<CorrectionCommentResponseDTO>(
        `/corrections/${correctionId}/comments`,
        body,
    );
    return data;
}