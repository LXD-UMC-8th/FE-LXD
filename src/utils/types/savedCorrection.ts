// src/utils/types/savedCorrection.ts
import type { APIResponse } from "./APIresponse";

/** ---------- 서버 원본 스키마(저장 탭) ---------- */
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

/** ---------- 화면에서 바로 쓰기 좋은 평탄화 타입 ---------- */
export interface SavedCorrectionItem {
  // 메모/ID
  savedCorrectionId: number;
  memo: string;

  // 좋아요/댓글 API에 필요한 교정 ID
  correctionId: number;

  // 본문
  original: string;
  corrected: string;
  commentText: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;

  // 연결 정보
  diaryId: number;
  diaryTitle: string;

  // (옵션) 제공 탭 호환
  liked?: boolean;

  // 작성자
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
  };
}

/** ---------- 평탄화(helper) (저장 탭용) ---------- */
export const normalizeSavedCorrection = (
  raw: SavedCorrectionContentDTO
): SavedCorrectionItem => ({
  savedCorrectionId: raw.savedCorrectionId,
  memo: raw.memo ?? "",
  correctionId: raw.correction.correctionId,
  original: raw.correction.originalText,
  corrected: raw.correction.corrected,
  commentText: raw.correction.commentText,
  createdAt: raw.correction.correctionCreatedAt,
  commentCount: raw.correction.commentCount ?? 0,
  likeCount: raw.correction.likeCount ?? 0,
  diaryId: raw.diary.diaryId,
  diaryTitle: raw.diary.diaryTitle,
  member: {
    memberId: raw.member.memberId,
    username: raw.member.username,
    nickname: raw.member.nickname,
    profileImageUrl: raw.member.profileImageUrl,
  },
});

/** ---------- (신규) 서버 원본 스키마(제공 탭) ---------- */
/** 질문 코드/훅에서 참조하는 구조에 맞춰 타입을 정의했습니다.
 *  응답 구조: result.member + result.corrections(contents, page, size, hasNext)
 */
export interface ProvidedCorrectionsResponseDTO
  extends APIResponse<{
    member: {
      memberId: number;
      username: string;
      nickname: string;
      profileImageUrl: string;
    };
    corrections: {
      contents: ProvidedCorrectionContentDTO[];
      page: number;
      size: number;
      hasNext: boolean;
    };
  }> {}

export interface ProvidedCorrectionContentDTO {
  // 서버가 주는 원본 필드들(가능한 케이스를 포함)
  correctionId?: number;
  id?: number;
  targetCorrectionId?: number;
  diaryCorrectionId?: number;

  originalText?: string;
  original?: string;

  corrected?: string;
  correctedText?: string;

  commentText?: string;

  createdAt?: string;
  correctionCreatedAt?: string;
  updatedAt?: string;

  commentCount?: number;
  likeCount?: number;

  liked?: boolean; // 서버가 내려줄 수도 있음

  diaryInfo?: { diaryId?: number; diaryTitle?: string };
  diary?: { diaryId?: number; diaryTitle?: string };

  correction?: { liked?: boolean }; // 중첩 케이스 방지용
}
