import type { APIResponse } from "./APIresponse";

// 교정 댓글 작성
export type CorrectionCommentRequestDTO = {
    content: string;
}

export type CorrectionCommentDTO = {
    commentId: number;
    memberId: number;
    username: string;
    nickname: string;
    profileImage: string;
    content: string;
    createdAt: string;
}

export type CorrectionCommentResponseDTO = APIResponse<CorrectionCommentDTO>;