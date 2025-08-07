import {
  type ImageRequestDTO,
  type DiaryRefreshRequestDTO,
  type DiaryRefreshResponseDTO,
  type DiaryUploadRequestDTO,
  type DiaryUploadResponseDTO,
  type ImageResponseDTO,
  type DiaryUpdateRequestDTO,
  type DiaryDeleteRequestDTO,
  type CalendarDiaryRequestDTO,
  type CalendarDiaryResponseDTO,
  type getDiarySummary,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";

export const postDiaryUpload = async (
  body: DiaryUploadRequestDTO,
): Promise<DiaryUploadResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<DiaryUploadResponseDTO>(
      "diaries",
      body,
    );
    return data;
  } catch (error) {
    console.error("Error uploading diary:", error);
    throw error;
  }
};

export const getDiaryRandomQuestion = async (
  body: DiaryRefreshRequestDTO,
): Promise<DiaryRefreshResponseDTO> => {
  try {
    const { data } = await axiosInstance.get<DiaryRefreshResponseDTO>(
      "diaries/random-question",
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

export const getDiaryStats = async (
  body: CalendarDiaryRequestDTO,
): Promise<CalendarDiaryResponseDTO | undefined> => {
  try {
    const { data } = await axiosInstance.get("diaries/stats", {
      params: body,
    });
    console.log("getDiaryStats response data:", data);
    return data;
  } catch (e) {
    console.log("Error fetching diary stats:", e);
    return undefined; // Explicitly return undefined in case of an error
  }
};

export const deleteDiary = async ({
  diaryId,
}: DiaryDeleteRequestDTO): Promise<void> => {
  try {
    await axiosInstance.delete(`diaries/${diaryId}`);
  } catch (error) {
    console.error("Error deleting diary:", error);
    throw error;
  }
};

//Promise 타입 정의필요
export const updateDiary = async (
  diaryId: number,
  body: DiaryUpdateRequestDTO,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`diaries/${diaryId}`, body);
    return data;
  } catch (error) {
    console.error("Error updating diary:", error);
    throw error;
  }
};

//Promise 타입 정의필요
export const getDiaryDetail = async (diaryId: number): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`diaries/${diaryId}`);
    return data;
  } catch (error) {
    console.error("Error fetching diary detail:", error);
    throw error;
  }
};

export const getMyDiaries = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("diaries/my", {
      params: {
        page,
        size: 4,
      },
    });
    console.log("getMyDiaries response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching my diaries:", error);
    throw error;
  }
};

export const getMyLikesDiary = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("diaries/liked", {
      params: {
        page,
        size: 4,
      },
    });
    console.log("getMyLikesDiray response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching my liked diaries:", error);
    throw error;
  }
};

export const getDiaryMySummary = async (): Promise<getDiarySummary> => {
  try {
    const { data } = await axiosInstance.get("diaries/my/diary-summary");
    return data;
  } catch (error) {
    console.error("Error fetching my diary summary:", error);
    throw error;
  }
};

export const getUserDiarySummary = async (memberId: number) => {
  try {
    const { data } = await axiosInstance.get(
      `diaries/member/${memberId}/diary-summary`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching user diary summary:", error);
    throw error;
  }
};
