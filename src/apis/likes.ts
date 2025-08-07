import type {
  LikeResponseDto,
  LikeTargetType,
  Targets,
} from "../utils/types/likes";
import { axiosInstance } from "./axios";

export const postLike = async (Targets: Targets): Promise<LikeResponseDto> => {
  let endpoint = "";

  switch (Targets.targetType) {
    case "corrections":
      endpoint = `/corrections/${Targets.targetId}/likes`;
      break;
    case "diaries":
      endpoint = `/diaries/${Targets.targetId}/likes`;
      break;
    default:
      throw new Error("유효하지 않은 targetType");
  }

  const { data } = await axiosInstance.post<LikeResponseDto>(endpoint);
  return data;
};

export const postCommentLike = async (
  diaryId: number,
  commentId: number,
): Promise<LikeResponseDto> => {
  const { data } = await axiosInstance.post<LikeResponseDto>(
    `/diaries/${diaryId}/comments/${commentId}/likes`,
  );
  return data;
};
