import type { CorrectionCommentGetRequestDTO, CorrectionCommentGetResponseDTO, CorrectionCommentRequestDTO, CorrectionCommentResponseDTO } from "../utils/types/correctionComment";
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
    const { diaryId, page, size } = body;

    const { data } = await axiosInstance.get<CorrectionCommentGetResponseDTO>(
        `/diaries/${diaryId}/comments`,
        {
            params: {
                page,
                size,
            },
        },
    );
    return data;
}