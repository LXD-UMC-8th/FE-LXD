import type { APIResponse } from "./APIresponse";

export type LoginRequestDTO = {
  email: string;
  password: string;
};

export type LoginDTO = {
  accessToken: string;
  refreshToken: string;
  member: {
    memberId: number;
    email: string;
    username: string;
    nickname: string;
    profileImg: string;
    language: string;
  };
};

export type LoginResponseDTO = APIResponse<LoginDTO>;

export type EmailVerificationResponseDTO = APIResponse<string>;

export type EmailDTO = {
  email: string;
};

export type EmailResponseDTO = APIResponse<EmailDTO>;
