import {
  type ImageRequestDTO,
  type DiaryRefreshRequestDTO,
  type DiaryRefreshResponseDTO,
  type DiaryUploadRequestDTO,
  type DiaryUploadResponseDTO,
  type ImageResponseDTO,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";

// ✅ 일기 업로드
export const postDiaryUpload = async (
  body: DiaryUploadRequestDTO,
): Promise<DiaryUploadResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<DiaryUploadResponseDTO>(
      "/diaries",
      body
    );
    return data;
  } catch (error) {
    console.error("Error uploading diary:", error);
    throw error;
  }
};

// ✅ 질문 재요청 (랜덤 질문)
export const getDiaryRandomQuestion = async (
  body: DiaryRefreshRequestDTO,
): Promise<DiaryRefreshResponseDTO> => {
  try {
    const { data } = await axiosInstance.get<DiaryRefreshResponseDTO>(
      "/diaries/random-question",
      { params: body }
    );
    return data;
  } catch (error) {
    console.error("Error fetching random question:", error);
    throw error;
  }
};

// ✅ 일기 이미지 업로드
export const postDiaryImage = async (
  body: ImageRequestDTO,
): Promise<ImageResponseDTO> => {
  try {
    const { data } = await axiosInstance.post<ImageResponseDTO>(
      "/diaries/image",
      body
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// ✅ 일기 삭제
export const deleteDiary = async (diaryId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/diaries/${diaryId}`);
  } catch (error) {
    console.error("Error deleting diary:", error);
    throw error;
  }
};

// ✅ 일기 수정
export const updateDiary = async ({
  diaryId,
  body,
}: {
  diaryId: number;
  body: {
    title: string;
    content: string;
    visibility: string;
    commentPermission: string;
    language: string;
    style: string;
    thumbImg: string;
  };
}) => {
  try {
    const { data } = await axiosInstance.put(`/diaries/${diaryId}`, body);
    return data;
  } catch (error) {
    console.error("Error updating diary:", error);
    throw error;
  }
};

// ✅ 단일 일기 조회 (수정 시 내용 불러올 때 사용)
export const getDiaryDetail = async (diaryId: number) => {
  try {
    const { data } = await axiosInstance.get(`/diaries/${diaryId}`);
    return data;
  } catch (error) {
    console.error("Error fetching diary detail:", error);
    throw error;
  }
};
