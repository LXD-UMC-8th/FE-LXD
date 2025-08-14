// utils/types/correctionLike.ts
export interface CorrectionLikeResponseDTO {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    correctionId: number;
    memberId: number;
    likeCount: number;
    liked: boolean;
  };
}
