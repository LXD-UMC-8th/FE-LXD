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
  if (!params) throw new Error("getDiaryComments: params가 없습니다.");

  const { diaryId, page = 0, size = 10 } = params; // 스펙상 page 기본 0
  if (diaryId == null || Number.isNaN(Number(diaryId))) {
    throw new Error("getDiaryComments: diaryId가 유효하지 않습니다.");
  }

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