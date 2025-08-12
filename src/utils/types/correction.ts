import type { APIResponse } from "./APIresponse";

// 교정 등록
export type CorrectionsUploadRequestDTO = {
  diaryId: number;
  original: string;
  corrected: string;
  commentText: string;
};

export type CorrectionsMemberDTO = {
  memberId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export type CorrectionsUploadResponseDTO = APIResponse<ContentsDTO>;

// 일기 상세 내 교정 목록 조회
export type CorrectionsGetRequestDTO = {
  diaryId: number;
  page?: number;
  size?: number;
  lang?: string;
};
export type CorrectionsGetDetailDTO = {
  diaryId: string;
  corrections: CorrectionsDetailDTO;
};
export type CorrectionsDetailDTO = {
  totalElements: number;
  contents: ContentsDTO[];
  page: number;
  size: number;
  hasNext: boolean;
};
export type ContentsDTO = {
  correctionId: number;
  diaryId: number;
  createdAt: string;
  member: member;
  original: string;
  corrected: string;
  commentText: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

export type member = {
  memberId: number;
  username: string;
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

export type CorrectionsGetResponseDTO = APIResponse<CorrectionsGetDetailDTO>;
