// src/utils/types/savedCorrection.ts
import type { APIResponse } from "./APIresponse";

/** ---------- 서버 원본 스키마(저장 탭) ---------- */
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
    thumbImg?: string;
  };
  memberProfile: {
    id: number;
    username: string;
    nickname: string;
    profileImage: string;
  };
}

export interface SavedCorrectionsResponseDTO extends APIResponse<{
  memberId: number;
  savedCorrections: {
    totalElements: number;
    contents: SavedCorrectionContentDTO[];
    page: number;
    size: number;
    hasNext: boolean;
  };
}> {}

/** ---------- 화면에서 바로 쓰기 좋은 평탄화 타입 ---------- */
export interface SavedCorrectionItem {
  savedCorrectionId: number;
  memo: string;
  correctionId: number;
  original: string;
  corrected: string;
  commentText: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  diaryId: number;
  diaryTitle: string;
  diaryThumbnailUrl?: string;
  liked?: boolean;
  member: {
    memberId: number;
    username: string;
    nickname: string;
    profileImageUrl: string;
  };
}

/** ---------- 평탄화(helper) (저장 탭용) ---------- */
export const normalizeSavedCorrection = ( raw: SavedCorrectionContentDTO ): SavedCorrectionItem => {
  const correction = raw.correction ?? {};
  const diary = raw.diary ?? {};
  const memberProfile = raw.memberProfile ?? {};

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
    diaryTitle: diary.diaryTitle || '원본 일기를 찾을 수 없습니다.',
    diaryThumbnailUrl: diary.thumbImg,
    member: {
      memberId: memberProfile.id ?? -1,
      username: memberProfile.username ?? 'unknown',
      nickname: memberProfile.nickname ?? '알 수 없는 사용자',
      profileImageUrl: memberProfile.profileImage ?? '',
    },
  };
};

/** ---------- '내가 제공한 교정' 관련 타입 및 변환 함수 ---------- */
export interface ProvidedCorrectionsResponseDTO extends APIResponse<{
    member?: { memberId: number; username: string; nickname: string; profileImageUrl: string; };
    memberProfile?: { id: number; username: string; nickname: string; profileImage: string; };
    corrections: {
      contents: ProvidedCorrectionContentDTO[];
      page: number;
      size: number;
      hasNext: boolean;
    };
}> {}

// ✅ [수정] 에러가 발생하지 않도록, 처리 로직에 있는 모든 가능한 속성을 옵셔널로 추가합니다.
export interface ProvidedCorrectionContentDTO {
  correctionId?: number;
  id?: number;
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
  liked?: boolean;
  diaryInfo?: { diaryId?: number; diaryTitle?: string; thumbImg?: string; };
  diary?: { diaryId?: number; diaryTitle?: string; thumbImg?: string; };
  correction?: { liked?: boolean };
}

// ✅ [추가] '내가 제공한 교정' 데이터를 위한 중앙 변환 함수
export const normalizeProvidedCorrection = (
  raw: ProvidedCorrectionContentDTO,
  me: any
): SavedCorrectionItem => {
  const diaryObject = raw.diaryInfo ?? raw.diary ?? {};

  return {
    savedCorrectionId: -1,
    memo: '',
    correctionId: raw.correctionId ?? raw.id ?? -1,
    original: raw.originalText ?? raw.original ?? '',
    corrected: raw.corrected ?? raw.correctedText ?? '',
    commentText: raw.commentText ?? '',
    createdAt: raw.createdAt ?? raw.correctionCreatedAt ?? raw.updatedAt ?? '',
    commentCount: raw.commentCount ?? 0,
    likeCount: raw.likeCount ?? 0,
    liked: raw.liked ?? raw.correction?.liked,
    diaryId: diaryObject.diaryId ?? 0,
    diaryTitle: diaryObject.diaryTitle || "원본 일기를 찾을 수 없습니다.",
    diaryThumbnailUrl: diaryObject.thumbImg,
    member: {
      memberId: me?.memberId ?? me?.id ?? 0,
      username: me?.username ?? "",
      nickname: me?.nickname ?? "",
      profileImageUrl: me?.profileImageUrl ?? me?.profileImage ?? "",
    },
  };
};