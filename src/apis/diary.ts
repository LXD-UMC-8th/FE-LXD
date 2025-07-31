import {
  type ImageRequestDTO,
  type DiaryRefreshRequestDTO,
  type DiaryRefreshResponseDTO,
  type DiaryUploadRequestDTO,
  type DiaryUploadResponseDTO,
  type ImageResponseDTO,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";
import axios from "axios";

// import { DiaryItems } from "../constants/key";
// import { LOCAL_STORAGE_KEY } from "../constants/key";

export const postDiaryUpload = async (
  body: DiaryUploadRequestDTO,
): Promise<DiaryUploadResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<DiaryUploadResponseDTO>(
      "/diaries",
      body,
    );

    return data;
  } catch (error) {
    console.error("Error uploading diary:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getDiaryRandomQuestion = async (
  body: DiaryRefreshRequestDTO,
): Promise<DiaryRefreshResponseDTO> => {
  try {
    const { data } = await axiosInstance.get<DiaryRefreshResponseDTO>(
      "/diaries/random-question",
      { params: body },
    );
    return data;
  } catch (e) {
    console.log("에러 발생:", e);
    throw e;
  }
};

export const postDiaryImage = async (
  body: ImageRequestDTO,
): Promise<ImageResponseDTO> => {
  console.log("postDiaryImage called with body:", body);
  try {
    const { data } = await axiosInstance.post<ImageResponseDTO>(
      "diaries/image",
      body,
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const postDiary = async (
  body: DiaryUploadRequestDTO,
): Promise<DiaryUploadResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<DiaryUploadResponseDTO>(
      "diaries",
      body,
      { withCredentials: true },
    );

    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // err.config.data is the JSON string that was sent
      console.error("Request payload:", err.config.data);

      // If you want the original object, you can parse it:
      try {
        console.log("Parsed payload:", error.config.data);
      } catch {
        // config.data might already be an object in some setups
        console.log("Payload (raw):", err.config.data);
      }

      // And you can still log the server’s response body:
      console.error("Server replied:", err.response?.data);
    }
    throw err; // Re-throw the error after logging it
  }
};
