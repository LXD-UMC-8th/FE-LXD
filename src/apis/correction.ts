import type {
  CorrectionsGetRequestDTO,
  CorrectionsGetResponseDTO,
  CorrectionsUploadRequestDTO,
  CorrectionsUploadResponseDTO,
  CorrectionGetListResponseDTO,
} from "../utils/types/correction";
import { axiosInstance } from "./axios";

export const postCorrection = async (
  body: CorrectionsUploadRequestDTO,
): Promise<CorrectionsUploadResponseDTO> => {
  const { data } = await axiosInstance.post<CorrectionsUploadResponseDTO>(
    "/corrections",
    body,
  );
  return data;
};

export const getCorrection = async (
  body: CorrectionsGetRequestDTO
): Promise<CorrectionsGetResponseDTO> => {
  const { diaryId, page = 1, size = 10 } = body;

  const { data } = await axiosInstance.get<CorrectionsGetResponseDTO>(
    `/corrections/diary/${diaryId}`,
    { params: { page, size } }
  );

  return data;
};

export const getCorrectionList = async (
  body: CorrectionsGetRequestDTO,
): Promise<CorrectionGetListResponseDTO> => {
  const { page, size, lang } = body;
  try {
    const { data } = await axiosInstance.get<CorrectionGetListResponseDTO>(
      `/corrections/provided`,
      {
        params: {
          page,
          size,
          lang,
        },
      },
    );
    return data;
  } catch (error) {
    console.log("Error fetching correction list:", error);
    throw error;
  }
};
