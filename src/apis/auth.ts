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
}

// 로그인 요청 API
export const postSignin = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
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

export interface EmailVerificationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 이메일 인증 링크 발송 API
export const postEmailVerificationRequest = async (
  email: string,
  verificationType: "EMAIL"
) => {
  const response = await axiosInstance.post<EmailVerificationResponse>(
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

export interface EmailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    email: string;
  };
}

// 이메일 인증 후 토큰 주인 반환 API
export const getEmail = async (token: string) => {
  const response = await axiosInstance.get<EmailResponse>("/auth/email", {
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
