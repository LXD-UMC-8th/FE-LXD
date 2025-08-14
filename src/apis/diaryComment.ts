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
  params: DiaryCommentGetRequestDTO
): Promise<DiaryCommentGetResponseDTO> => {
  const { diaryId, page = 0, size = 10 } = params;

  const { data } = await axiosInstance.get<DiaryCommentGetResponseDTO>(
    `/diaries/${diaryId}/comments`,
    { params: { page, size } }
  );

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