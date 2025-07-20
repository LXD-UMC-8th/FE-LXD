import type { PostLikeResponseDto } from "../utils/types/likes";
import { axiosInstance } from "./axios";

export const postLike = async (correctionId: number) : Promise<PostLikeResponseDto> => {
    const { data } = await axiosInstance.post<PostLikeResponseDto>(
        `/corrections/${correctionId}/likes`
    );
    return data;
};