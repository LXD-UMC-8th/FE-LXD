import type { LikeResponseDto, LikeTargetType } from "../utils/types/likes";
import { axiosInstance } from "./axios";

export const postLike = async (
    targetType: LikeTargetType,
    targetId: number,
) : Promise<LikeResponseDto> => {
    let endpoint = "";

    switch (targetType) {
        case "corrections":
            endpoint = `/corrections/${targetId}/likes`;
            break;
        case "diaries":
            endpoint = `/diaries/${targetId}/likes`;
            break;
        default:
            throw new Error("유효하지 않은 targetType");
    }

    const { data } = await axiosInstance.post<LikeResponseDto>(endpoint);
    return data;
}

export const postCommentLike = async (
    diaryId: number,
    commentId: number,
): Promise<LikeResponseDto> => {
    const { data } = await axiosInstance.post<LikeResponseDto>(
        `/diaries/${diaryId}/comments/${commentId}/likes`
    );
    return data;
};