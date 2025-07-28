import type { APIResponse } from "./APIresponse";
import type { CorrectionsMemberDTO } from "./member";

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
    likeByMe: boolean;
}

export type CorrectionsUploadResponseDTO = APIResponse<CorrectionsDetailDTO>;