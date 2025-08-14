// utils/types/savedCorrection.ts
import type { APIResponse } from "./APIresponse";

// 서버 원본 스키마 그대로
export type SavedCorrectionsResponseDTO = APIResponse<{
  memberId: number;
  savedCorrections: {
    totalElements: number;
    contents: SavedCorrectionContentDTO[];
    page: number;
    size: number;
    hasNext: boolean;
  };
}>;

export type CorrectionQueryTypeDTO = {
  result: {
    memberId: number;
    savedCorrections: {
      totalElements: number;
      contents: SavedCorrectionContentDTO[];
      page: number;
      size: number;
      hasNext: boolean;
    };
  };
};

export type SavedCorrectionContentDTO = {
  savedCorrectionId: number;
  memo: string;
  correction: {
    correctionId: number;
    originalText: string;
    corrected: string;
    commentText: string;
    correctionCreatedAt: string;
    commentCount: number;
    likeCount: number;
  };
  diary: {
    diaryId: number;
    diaryTitle: string;
    diaryCreatedAt: string;
  };
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
  };
};

/**
 * 화면 컴포넌트가 바로 쓰기 좋은 평탄화 타입
 * (지금 CorrectionComponent에서 기대하는 필드 이름에 맞춤)
 */
export interface SavedCorrectionItem {
  // 메모/ID
  savedCorrectionId?: number;
  memo?: string;
  // 본문
  original?: string;
  corrected?: string;
  commentText?: string;
  createdAt?: string; // correctionCreatedAt 매핑
  commentCount?: number;
  likeCount?: number;

  // 연결 정보
  diaryInfo?: {
    createdAt?: string;
    diaryId?: number;
    thumbImg?: string;
    title?: string;
    userProfileImg?: string;
    username?: string;
    diaryTitle?: string;
  };

  // 작성자
  member?: {
    memberId?: number;
    username?: string;
    nickname?: string;
    profileImageUrl?: string;
  };

  diaryTitle?: string;
  diaryId?: string;
}

export type getCorrectionProvidedResponse = {
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
  };
  corrections: {
    totalElements: number;
    contents: [
      {
        correctionId: number;
        createdAt: string;
        originalText: string;
        corrected: string;
        commentText: string;
        commentCount: number;
        likeCount: number;
        diaryInfo: {
          diaryId: number;
          diaryTitle: string;
          diaryCreatedAt: string;
        };
      }
    ];
    page: number;
    size: number;
    hasNext: boolean;
  };
};

export type getCorrectionProvidedResponseDTO =
  APIResponse<getCorrectionProvidedResponse>;

export type ProvidedProps = {
  correctionId: number;
  createdAt: string;
  originalText: string;
  corrected: string;
  commentText: string;
  commentCount: number;
  likeCount: number;
  diaryInfo: {
    diaryId: number;
    diaryTitle: string;
    diaryCreatedAt: string;
  };
};
