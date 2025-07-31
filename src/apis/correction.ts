import {
  type CorrectionsGetRequestDTO,
  type CorrectionsGetResponseDTO,
  type CorrectionsUploadRequestDTO,
  type CorrectionsUploadResponseDTO,
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
  body: CorrectionsGetRequestDTO,
): Promise<CorrectionsGetResponseDTO> => {
  const { diaryId, page, size } = body;

  const { data } = await axiosInstance.get<CorrectionsGetResponseDTO>(
    `/corrections/diary/${diaryId}`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return data;
};

export const getCorrectionList = async (page: number, size: number) => {
  try {
    const { data } = await axiosInstance.get<CorrectionsGetResponseDTO>(
      `/corrections/provided`,
      {
        params: {
          page,
          size,
        },
      },
    );
    return data;
  } catch (e) {
    console.log("error in getCorrectionList", e);
  }
};
