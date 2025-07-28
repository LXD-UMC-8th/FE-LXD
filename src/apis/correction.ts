import type { CorrectionsUploadRequestDTO, CorrectionsUploadResponseDTO } from "../utils/types/correction";
import { axiosInstance } from "./axios";

export const postCorrection = async (
    body: CorrectionsUploadRequestDTO
): Promise<CorrectionsUploadResponseDTO> => {
    const { data } = await axiosInstance.post<CorrectionsUploadResponseDTO>(
        "/corrections",
        body
    );
    return data;
}