import type {
  DiaryRefreshRequestDTO,
  DiaryRefreshResponseDTO,
  DiaryUploadRequestDTO,
  DiaryUploadResponseDTO,
  ImageResponseDTO,
  DiaryDeleteRequestDTO,
  CalendarDiaryRequestDTO,
  CalendarDiaryResponseDTO,
  getDiarySummary,
  DiaryGetResponseDTO,
} from "../utils/types/diary";
import { axiosInstance } from "./axios";

export const postDiaryUpload = async (
  body: DiaryUploadRequestDTO
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

export const getDiaryRandomQuestion = async (
  body: DiaryRefreshRequestDTO
): Promise<DiaryRefreshResponseDTO> => {
  try {
    const { data } = await axiosInstance.get<DiaryRefreshResponseDTO>(
      "/diaries/random-question",
      { params: body }
    );
    return data;
  } catch (e) {
    console.log("에러 발생:", e);
    throw e;
  }
};

export const postDiaryImage = async (
  body: FormData
): Promise<ImageResponseDTO> => {
  console.log("postDiaryImage called with body:", body);
  try {
    const { data } = await axiosInstance.post<ImageResponseDTO>(
      "/diaries/image",
      body,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getDiaryStats = async (
  body: CalendarDiaryRequestDTO
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

export const deleteDiary = async ({
  diaryId,
}: DiaryDeleteRequestDTO): Promise<void> => {
  try {
    await axiosInstance.delete(`/diaries/${diaryId}`);
  } catch (error) {
    console.error("Error deleting diary:", error);
    throw error;
  }
};

export const updateDiary = async (
  body: DiaryUploadRequestDTO
): Promise<DiaryGetResponseDTO> => {
  try {
    const { data } = await axiosInstance.patch(
      `/diaries/${body.diaryId}`,
      {
        title: body.title,
        content: body.content,
        visibility: body.visibility,
        commentPermission: body.commentPermission,
        language: body.language,
        thumbImg: body.thumbImg,
      } // Ensure to include all necessary fields
    );
    return data;
  } catch (error) {
    console.error("Error updating diary:", error);
    throw error;
  }
};

export const getDiaryDetail = async (
  diaryId: number
): Promise<DiaryGetResponseDTO> => {
  try {
    const { data } = await axiosInstance.get<DiaryGetResponseDTO>(
      `/diaries/${diaryId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching diary detail:", error);
    throw error;
  }
};

export const getMyDiaries = async (page: number) => {
  const { data } = await axiosInstance.get("/diaries/my", {
    params: {
      page,
      size: 4,
    },
  });
  return data;
};

export const getMyLikesDiary = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("/diaries/liked", {
      params: {
        page,
        size: 4,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching my liked /diaries:", error);
    throw error;
  }
};

export const getDiaryMySummary = async (): Promise<getDiarySummary> => {
  try {
    const { data } = await axiosInstance.get("/diaries/my/diary-summary");
    return data;
  } catch (error) {
    console.error("Error fetching my diary summary:", error);
    throw error;
  }
};

export const getUserDiarySummary = async (memberId?: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/diaries/member/${memberId}/diary-summary`
    );
    return data;
  } catch (error) {
    console.error("Error fetching user diary summary:", error);
    throw error;
  }
};

export const getUserDiaries = async (memberId: number, page: number) => {
  try {
    const { data } = await axiosInstance.get(`/diaries/member/${memberId}`, {
      params: {
        page,
        size: 4,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user /diaries:", error);
    throw error;
  }
};

export const getFriendsDiaries = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("/diaries/friends", {
      params: {
        page,
        size: 4,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching friends' /diaries:", error);
    throw error;
  }
};

export const getExploreDiaries = async (page: number, lang: string) => {
  try {
    const { data } = await axiosInstance.get("/diaries/explore", {
      params: {
        page,
        size: 4,
        lang,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching explore /diaries:", error);
    throw error;
  }
};

export const getLikedDiaries = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("/diaries/liked", {
      params: {
        page,
        size: 4,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching liked /diaries:", error);
    throw error;
  }
};
