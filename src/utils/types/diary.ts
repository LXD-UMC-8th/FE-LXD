import type { APIResponse } from "./APIresponse";

//diary upload
export type DiaryUploadRequestDTO = {
  title: string;
  content: string;
  style: string;
  visibility: string;
  commentPermission: string;
  language: string;
  thumbImg: string;
};

export type DiaryUploadResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DiaryUploadResult;
};

export type DiaryUploadResult = {
  diaryId: number;
  visibility: string;
  title: string;
  language: string;
  profileImg: string;
  writerNickName: string;
  writerUserName: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  correctCount: number;
  content: string;
};
export type DiaryRefreshRequestDTO = {
  language: string;
};

type DiaryRefreshResult = {
  id: number;
  content: string;
  language: string;
};

export type DiaryRefreshResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DiaryRefreshResult;
};

export type ImageRequestDTO = {
  formData: FormData;
};

export type ImageResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    imageUrl: string;
  };
};

export interface DiaryUpdateRequestDTO {
  title: string;
  content: string;
  visibility: string;
  commentPermission: string;
  language: string;
  style: string;
  thumbImg: string;
}

export interface DiaryDeleteRequestDTO {
  diaryId: number;
}



export type styleType = "FREE" | "QUESTION";

export type CalendarDiaryRequestDTO = {
  year: number;
  month: number;
};

export type CalendarDiary = {
  date: string;
  count: number;
};

export type CalendarDiaryResponseDTO = APIResponse<CalendarDiary[]>;

