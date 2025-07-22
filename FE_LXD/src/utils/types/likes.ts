export type LikeTargetType = "corrections" | "diaries" | "comments";

export type LikeResponseDto = {
    correctionsId?: number;
    diaryId?: number;
    commentId?: number;
    memberId: number;
    liked: boolean;
    likeCount: number;
}