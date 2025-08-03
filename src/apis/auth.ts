// 로그인, 로그아웃 등 인증 관련
import { axiosInstance } from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accessToken: string;
    member: {
      memberId: number;
      email: string;
      username: string;
      nickname: string;
      profileImg: string;
      language: string;
    };
  };
}

// 로그인 요청 API
export const postSignin = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "auth/login",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export interface EmailVerificationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 이메일 인증 링크 발송 API
export const postEmailVerificationRequest = async (email: string) => {
  const response = await axiosInstance.post<EmailVerificationResponse>(
    "auth/emails/verification-requests",
    { email }
  );
  return response.data;
};

// 이메일 인증 API
export const getEmailVerification = async (token: string) => {
  const response = await axiosInstance.get("/auth/emails/verifications", {
    params: { token },
  });
  return response.data;
};
