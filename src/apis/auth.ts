// 로그인, 로그아웃 등 인증 관련
import type { EmailResponseDTO, EmailVerificationResponseDTO, LoginRequestDTO, LoginResponseDTO } from "../utils/types/auth";
import { axiosInstance } from "./axios";

// 로그인 요청 API
export const postSignin = async (
  payload: LoginRequestDTO,
): Promise<LoginResponseDTO> => {
  const { data } = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return data;
};

// 이메일 인증 링크 발송 API
export const postEmailVerificationRequest = async (
  email: string,
  verificationType: "EMAIL"
) => {
  const response = await axiosInstance.post<EmailVerificationResponseDTO>(
    "auth/emails/verification-requests",
    { email, verificationType }

  );
  return response.data;
};

// 이메일 인증 API
export const getEmailVerification = async (token: string) => {
  const apiURL =
    import.meta.env.VITE_API_BASE_URL +
    `/auth/emails/verifications?token=${token}`;
  window.location.href = apiURL;
};

// 이메일 인증 후 토큰 주인 반환 API
export const getEmail = async (token: string) => {
  const response = await axiosInstance.get<EmailResponseDTO>("/auth/email", {
    params: { token },
  });
  return response.data;
};

interface ReissueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

// 토큰 재발급 API
export const postReissue = async (
  refreshToken: string,
): Promise<ReissueResponse> => {
  const response = await axiosInstance.post<ReissueResponse>("//auth/reissue", {
    refreshToken,
  });
  return response.data;
};

// 비밀번호 변경 - 이메일 인증 링크 발송 API
export const postEmailVerificationinPWRequest = async (
  email: string,
  verificationType: "PASSWORD"
) => {
  const response = await axiosInstance.post<EmailVerificationResponseDTO>(
    "auth/emails/verification-requests",
    { email, verificationType }

  );
  return response.data;
};