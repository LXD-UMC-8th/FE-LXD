import type { APIResponse } from "./APIresponse";

//로그인요청 DTO
export type postLoginRequestDTO = {
  email: string;
  password: string;
};
export type postLoginResponse = {
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
export type postLoginResponseDTO = APIResponse<postLoginResponse>;

//이메일 인증 요청 DTO
export type getEmailVerificationRequestDTO = {
  email: string;
  verificationType: "EMAIL";
};
export type getEmailVerificationResponseDTO = APIResponse<string>;

//이메일 인증 후 토큰 반환 DTO
export type getEmailRequestDTO = {
  token: string;
};
export type getEmailResponseDTO = APIResponse<string>;

//reissue DTO
export type postReissueRequestDTO = {
  refreshToken: string;
};
export type postReissueResponseDTO = APIResponse<{
  accessToken: string;
  refreshToken: string;
}>;
