import { axiosInstance } from "./axios";

// 서버 응답(raw)
export type RawCorrectionComment = {
  commentId: number;
  memberId: number;
  username: string;
  nickname: string;
  profileImage: string;   // ← 스웨거에선 profileImage
  content: string;
  createdAt: string;
};

export type RawCommentsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    totalElements: number;
    contents: RawCorrectionComment[];
    page: number;
    size: number;
    hasNext: boolean;
  };
};

export const getCorrectionComments = async (
  correctionId: number,
  page = 1,
  size = 10
): Promise<RawCommentsResponse> => {
  const { data } = await axiosInstance.get(
    `/corrections/${correctionId}/comments`,
    { params: { page, size } }
  );
  return data;
};
