import type {
  ImageRequestDTO,
  DiaryRefreshRequestDTO,
  DiaryRefreshResponseDTO,
  DiaryUploadRequestDTO,
  DiaryUploadResponseDTO,
  ImageResponseDTO,
  CalendarDiaryRequestDTO,
  CalendarDiaryResponseDTO,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";

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
      "/diaries/image",
      body,
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getDiaryStats = async (
  body: CalendarDiaryRequestDTO,
): Promise<CalendarDiaryResponseDTO | undefined> => {
  try {
    const { data } = await axiosInstance.get("/diaries/stats", {
      params: body,
    });
    return data;
  } catch (e) {
    console.log("Error fetching diary stats:", e);
    return undefined; // Explicitly return undefined in case of an error
  }
};
