import {
  type DiaryUploadRequestDTO,
  type DiaryUploadResponseDTO,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const postDiaryUpload = async (
  body: DiaryUploadRequestDTO,
): Promise<DiaryUploadResponseDTO> => {
  const { data } = await axiosInstance.post<DiaryUploadResponseDTO>(
    "/diaries",
    body,
  );

  return data;
};
