import type { APIResponse } from "./APIresponse";
import type { CorrectionsMemberDTO } from "./member";

// 교정 등록
export type CorrectionsUploadRequestDTO = {
    diaryId: number;
    original: string;
    corrected: string;
    commentText: string;
}

export type CorrectionsDetailDTO = {
    correctionId: number;
    diaryId: number;
    createdAt: string;
    member: CorrectionsMemberDTO;
    original: string;
    corrected: string;
    commentText: string;
    likeCount: number;
    commentCount: number;
    likedByMe: boolean;
}

export type CorrectionsUploadResponseDTO = APIResponse<CorrectionsDetailDTO>;