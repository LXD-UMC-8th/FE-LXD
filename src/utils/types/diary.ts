import type { APIResponse } from "./APIresponse";

//diary upload
export type DiaryUploadRequestDTO = {
  diaryId?: number;
  title: string;
  content: string;
  style?: string;
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
  style?: string;
  language: string;
  profileImg?: string;
  writerNickName?: string;
  writerUserName?: string;
  createdAt?: string;
  commentCount: number;
  likeCount: number;
  correctCount: number;
  content?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  thumbImg?: string;
  contentPreview?: string;
  correctionCount?: number;
  isLiked?: boolean;
  diffHtml?: string;
  commentPermission?: string;
  writerId?: number;
};

export type DiaryGetRequestDTO = {
  diaryId: number;
};
export type DiaryGetResponseDTO = APIResponse<DiaryUploadResult>;

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

export type ImageResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    imageUrl: string;
  };
};

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

export type DiarySummary = {
  profileImg?: string;
  username?: string;
  nickname?: string;
  diaryCount: number;
  friendCount: number;
  relation?: string;
  status?: string;
  language: string;
  nativeLanguage: string;
};

export type getDiarySummary = APIResponse<DiarySummary>;

export type getDiariesResponseDTO = APIResponse<getDiariesResult>;

export type diaries = {
  diaryId?: number;
  createdAt?: string;
  title?: string;
  visibility?: string;
  thumbnailUrl?: string;
  likeCount?: number;
  commentCount?: number;
  correctionCount?: number;
  contentPreview?: string;
  language?: string;
  isLiked?: boolean;
  writerUsername?: string;
  writerNickname?: string;
  writerProfileImg?: string;
  profileImg?: string;
  writerId?: number;
};

export type getDiariesResult = {
  diaries: diaries[];
  page: number;
  size: number;
  hasNext: boolean;
};
