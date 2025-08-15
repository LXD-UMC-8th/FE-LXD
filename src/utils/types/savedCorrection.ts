import type { APIResponse } from "./APIresponse";

/** ---------- 서버 원본 스키마 ---------- */
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
  diaryInfo?: {
    createdAt?: string;
    diaryId?: number;
    thumbImg?: string;
    title?: string;
    userProfileImg?: string;
    username?: string;
    diaryTitle?: string;
  };

  // (옵션) 제공 탭에서 서버가 주면 씀
  liked?: boolean;

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
