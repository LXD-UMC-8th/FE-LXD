import type { APIResponse } from "./APIresponse";
import type { CorrectionsMemberDTO } from "./member";

// 교정 등록
export type CorrectionsUploadRequestDTO = {
  diaryId: number;
  original: string;
  corrected: string;
  commentText: string;
};

export type CorrectionsDetailDTO = {
  correctionId: number;
  diaryId: number;
  createdAt: string;
  member: CorrectionsMemberDTO;
  original: string;
  corrected: string;
  commentText: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

export type CorrectionsUploadResponseDTO = APIResponse<CorrectionsDetailDTO>;

// 일기 상세 내 교정 목록 조회
export type CorrectionsGetRequestDTO = {
  diaryId: number;
  page?: number;
  size?: number;
  lang?: string;
};
export type CorrectionsGetDetailDTO = {
  diaryId: number;
  totalCount: number;
  hasNext: boolean;
  corrections: CorrectionsDetailDTO[];
};
export type CorrectionsGetResponseDTO = APIResponse<CorrectionsGetDetailDTO>;

type member = {
  memberId: number;
  userId: string;
  nickname: string;
  profileImageUrl: string;
};

type corrections = {
  correctionId: number;
  diaryId: number;
  diaryTitle: string;
  diaryCreatedAt: string;
  createdAt: string;
  originalText: string;
  corrected: string;
  commentText: string;
  commentCount: number;
  likeCount: number;
};

type CorrectionGetListResponse = {
  member: member;
  corrections: corrections;
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
};

export type CorrectionGetListResponseDTO =
  APIResponse<CorrectionGetListResponse>;
