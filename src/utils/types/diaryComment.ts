import type { APIResponse } from "./APIresponse";

// 일기 댓글 작성
export type DiaryCommentRequestDTO = {
    parentId: number | null;
    commentText: string;
}

export type DiaryCommentDTO = {
    commentId: number;
    parentId: number | null;
    memberId: number;
    username: string;
    nickname: string;
    diaryId?: number;
    profileImage: string;
    content?: string;
    commentText?: string;
    replyCount: number;
    likeCount: number;
    createdAt: string;
    liked: boolean;
}

export type DiaryCommentResponseDTO = APIResponse<DiaryCommentDTO>;

// 일기 댓글 조회
export type DiaryCommentGetRequestDTO = {
    diaryId: number;
    page?: number;
    size?: number;
}

export type GetDiaryCommentDTO = {
    totalElements: number;
    page: number;
    size: number;
    hasNext: boolean;
    contents: DiaryCommentDTO[];
}

export type DiaryCommentGetResponseDTO = APIResponse<GetDiaryCommentDTO>

// 일기 댓글 삭제
export type DiaryCommentDeleteRequestDTO = {
    diaryId: number;
    commentId: number;
}

export type DiaryCommentDeleteDTO = {
    commentId: number;
    content: string;
    deletedAt: string;
    deleted: boolean;
}

export type DiaryCommentDeleteResponseDTO = APIResponse<DiaryCommentDeleteDTO>