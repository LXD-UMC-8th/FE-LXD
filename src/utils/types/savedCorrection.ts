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
): SavedCorrectionItem => {
  // ⬇️ 데이터가 null이나 undefined일 경우를 대비해 빈 객체를 기본값으로 사용합니다.
  const correction = raw.correction ?? {};
  const diary = raw.diary ?? {};
  const member = raw.member ?? {}; // 👈 이 부분이 핵심적인 수정입니다.

  return {
    savedCorrectionId: raw.savedCorrectionId,
    memo: raw.memo ?? "",
    correctionId: correction.correctionId,
    original: correction.originalText ?? '',
    corrected: correction.corrected ?? '',
    commentText: correction.commentText ?? '',
    createdAt: correction.correctionCreatedAt ?? '',
    commentCount: correction.commentCount ?? 0,
    likeCount: correction.likeCount ?? 0,
    diaryId: diary.diaryId,
    diaryTitle: diary.diaryTitle ?? '원본 일기를 찾을 수 없습니다.',
    // ⬇️ member가 없더라도, 기본값을 사용해 안전하게 렌더링합니다.
    member: {
      memberId: member.memberId ?? -1, // 혹은 null
      username: member.username ?? 'unknown',
      nickname: member.nickname ?? '알 수 없는 사용자',
      profileImageUrl: member.profileImageUrl ?? '/default-profile.png', // 기본 프로필 이미지 경로
    },
  };
};
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
