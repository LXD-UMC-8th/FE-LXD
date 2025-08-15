import { axiosInstance } from "./axios";
import type { CorrectionLikeResponseDTO } from "../utils/types/correctionLike";

export const postCorrectionLike = async (
  correctionId: number
): Promise<CorrectionLikeResponseDTO> => {
  const { data } = await axiosInstance.post<CorrectionLikeResponseDTO>(
    `/corrections/${correctionId}/likes`
  );
  return data;
};

export const deleteCorrectionLike = async (
  correctionId: number
): Promise<CorrectionLikeResponseDTO> => {
  const { data } = await axiosInstance.delete<CorrectionLikeResponseDTO>(
    `/corrections/${correctionId}/likes`
  );
  return data;
};
