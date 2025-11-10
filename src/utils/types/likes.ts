import type { APIResponse } from "./APIresponse";
import type { memberProfile } from "./diary";

export type LikeTargetType = string;

export type Targets = {
  targetType: string;
  targetId: number;
};

export type LikeResponseDto = {
  correctionsId?: number;
  diaryId?: number;
  commentId?: number;
  memberProfile: memberProfile;
  liked: boolean;
  likeCount: number;
};

export type PostLikeParams = {
  targetType: string;
  targetId: number;
};

export type getLikeResponseDTO = APIResponse<LikeResponseDto>;
