//diary upload
export type DiaryUploadRequestDTO = {
  title: string;
  content: string;
  style: string;
  visibility: string; // st: "PUBLIC" | "FRIEND" | "PRIVATE"
  commentPermission: string; // st: "PUBLIC" | "FRIEND" | "PRIVATE";
  language: string;
  thumbImg: string;
};

export type DiaryUploadResponseDTO = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DiaryUploadResult;
};

type DiaryUploadResult = {
  diaryId: number;
  visibility: string; // st: "PUBLIC" | "FRIEND" | "PRIVATE"
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
