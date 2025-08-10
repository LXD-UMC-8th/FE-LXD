import type { APIResponse } from "./APIresponse";

// 교정 댓글 작성
export type CorrectionCommentRequestDTO = {
    content: string;
};

export type CorrectionCommentDTO = {
    commentId: number;
    parentId: number | null;
    memberId: number;
    username: string;
    nickname: string;
    profileImage: string;
    content: string;
    likeCount: number;
    createdAt: string;
    replyCount: number;
    replies: CorrectionCommentDTO[];
    liked: boolean;
};

export type CorrectionCommentResponseDTO = APIResponse<CorrectionCommentDTO>;

// 교정 댓글 조회
export type CorrectionCommentGetRequestDTO = {
    correctionId: number;
    page?: number;
    size?: number;
};

export type CorrectionCommentGetResponseDTO = APIResponse<{
    content: CorrectionCommentDTO[];
    totalElements: number;
}>;

// 교정 댓글 삭제
export type CorrectionCommentDeleteRequestDTO = {
    correctionId: number;
    commentId: number;
}

export type CorrectionCommentDeleteDTO = {
    commentId: number;
    content: string;
    deletedAt: string;
    deleted: boolean
}

export type CorrectionCommentDeleteResponseDTO = APIResponse<CorrectionCommentDeleteDTO>