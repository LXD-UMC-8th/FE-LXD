//diary upload
export type DiaryUploadRequestDTO = {
  title: string;
  content: string;
  style: "FREE" | "QUESTION";
  visibility: "PUBLIC" | "FRIEND" | "PRIVATE";
  commentPermission: "PUBLIC" | "FRIEND" | "PRIVATE";
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
  visibility: "PUBLIC" | "FRIEND" | "PRIVATE";
  title: "string";
  language: "string";
  profileImg: "string";
  writerNickName: "string";
  writerUserName: "string";
  createdAt: "string";
  commentCount: number;
  likeCount: number;
  correctCount: number;
  content: "string";
};
