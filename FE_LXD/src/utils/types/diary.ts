//diary upload
export type DiaryUploadRequestDTO = {
  title: string;
  content: string;
  style: "FREE" | "QUESTION";
  visibility: "PUBLIC" | "FRIEND" | "PRIVATE";
  commentPermission: "PUBLIC" | "FRIEND" | "PRIVATE";
  language: string;
  thumbImg: "string";
};

export type DiaryUploadResponseDTO = {
  isSuccess: boolean;
};
