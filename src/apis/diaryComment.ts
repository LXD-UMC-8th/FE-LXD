import type { DiaryCommentGetRequestDTO, DiaryCommentGetResponseDTO, DiaryCommentRequestDTO, DiaryCommentResponseDTO, DiaryCommentDeleteRequestDTO, DiaryCommentDeleteResponseDTO } from "../utils/types/diaryComment";
import { axiosInstance } from "./axios";

export const postDiaryComments = async (
    diaryId: number,
    body: DiaryCommentRequestDTO,
): Promise<DiaryCommentResponseDTO> => {
    const { data } = await axiosInstance.post<DiaryCommentResponseDTO>(
        `/diaries/${diaryId}/comments`,
        body,
        { headers: { "Content-Type": "application/json" } }
    );
    return data;
}

export const getDiaryComments = async (
  body: DiaryCommentGetRequestDTO,
  pageParam: number
): Promise<DiaryCommentGetResponseDTO> => {
  const { diaryId, page = pageParam, size = 10 } = body;

  console.log("[REQ] GET", `/diaries/${diaryId}/comments?page=${page}&size=${size}`);

  const { data } = await axiosInstance.get<DiaryCommentGetResponseDTO>(
    `/diaries/${diaryId}/comments`,
    { params: { page, size } }
  );

  const snap = JSON.parse(JSON.stringify(data));
  console.log("[RES] GET comments (snap):", snap);
  console.log("[RES] length:", snap?.result?.content?.length);

  return data;
};

export const deleteDiaryComments = async (
    { diaryId, commentId }: DiaryCommentDeleteRequestDTO
): Promise<DiaryCommentDeleteResponseDTO> => {
    const { data } = await axiosInstance.delete<DiaryCommentDeleteResponseDTO>(
        `/diaries/${diaryId}/comments/${commentId}`
    );
    return data;
}