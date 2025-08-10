import type { CorrectionCommentDeleteResponseDTO, CorrectionCommentDeleteRequestDTO, CorrectionCommentGetRequestDTO, CorrectionCommentGetResponseDTO, CorrectionCommentRequestDTO, CorrectionCommentResponseDTO } from "../utils/types/correctionComment";
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

export const getCorrectionComments = async (
    body: CorrectionCommentGetRequestDTO,
): Promise<CorrectionCommentGetResponseDTO> => {
    const { correctionId, page = 1, size = 10 } = body;

    const { data } = await axiosInstance.get<CorrectionCommentGetResponseDTO>(
        `/corrections/${correctionId}/comments`,
        {
            params: {
                page,
                size,
            },
        },
    );
    return data;
}

export const deleteCorrectionComments = async (
    { correctionId, commentId }: CorrectionCommentDeleteRequestDTO
): Promise<CorrectionCommentDeleteResponseDTO> => {
    const { data } = await axiosInstance.delete<CorrectionCommentDeleteResponseDTO>(
        `/corrections/${correctionId}/comments/${commentId}`
    );
    return data;
}