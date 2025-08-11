// utils/types/savedCorrection.ts
import type { APIResponse } from "./APIresponse";

// 서버 원본 스키마 그대로
export interface SavedCorrectionsResponseDTO
  extends APIResponse<{
    memberId: number;
    savedCorrections: {
      totalElements: number;
      contents: SavedCorrectionContentDTO[];
      page: number;
      size: number;
      hasNext: boolean;
    };
  }> {}

export interface SavedCorrectionContentDTO {
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
}

/**
 * 화면 컴포넌트가 바로 쓰기 좋은 평탄화 타입
 * (지금 CorrectionComponent에서 기대하는 필드 이름에 맞춤)
 */
export interface SavedCorrectionItem {
  // 메모/ID
  savedCorrectionId: number;
  memo: string;
  

  // 본문
  original: string;
  corrected: string;
  commentText: string;
  createdAt: string; // correctionCreatedAt 매핑
  commentCount: number;
  likeCount: number;

  // 연결 정보
  diaryId: number;
  diaryTitle: string;

  // 작성자
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
  };
}
