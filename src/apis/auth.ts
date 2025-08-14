// 로그인, 로그아웃 등 인증 관련
import type {
  getEmailResponseDTO,
  GoogleLoginRequestDTO,
  GoogleLoginResponseDTO,
  postEmailVerificationinPWRequestDTO,
  postEmailVerificationRequestDTO,
  postEmailVerificationResponseDTO,
  postLoginRequestDTO,
  postLoginResponseDTO,
  postReissueRequestDTO,
  postReissueResponseDTO,
} from "../utils/types/auth";
import { axiosInstance } from "./axios";

// 로그인 요청 API
export const postSignin = async (
  payload: postLoginRequestDTO
): Promise<postLoginResponseDTO> => {
  const { data } = await axiosInstance.post<postLoginResponseDTO>(
    "/auth/login",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

// 회원가입 - 이메일 인증 링크 발송 API
export const postEmailVerificationRequest = async (
  payload: postEmailVerificationRequestDTO
): Promise<postEmailVerificationResponseDTO> => {
  const { data } = await axiosInstance.post<postEmailVerificationResponseDTO>(
    "/auth/emails/verification-requests",
    payload
  );
  return data;
};

// 비밀번호 변경 - 이메일 인증 링크 발송 API
export const postEmailVerificationinPWRequest = async (
  payload: postEmailVerificationinPWRequestDTO
): Promise<postEmailVerificationResponseDTO> => {
  const { data } = await axiosInstance.post<postEmailVerificationResponseDTO>(
    "/auth/emails/verification-requests",
    payload
  );
  return data;
};

// 회원가입 - 이메일 인증 API
export const getEmailVerification = (token: string): void => {
  const apiURL =
    import.meta.env.VITE_API_BASE_URL +
    `/auth/emails/verifications?token=${token}`;
  window.location.href = apiURL;
};

// 비밀번호 변경 - 이메일 인증 API
export const getEmailVerificationinPW = (token: string): void => {
  const apiURL =
    import.meta.env.VITE_API_BASE_URL + `/home/change-pw?token=${token}`;
  window.location.href = apiURL;
};

// 이메일 인증 후 토큰 주인 반환 API
export const getEmail = async (token: string): Promise<getEmailResponseDTO> => {
  const { data } = await axiosInstance.get<getEmailResponseDTO>("/auth/email", {
    params: { token },
  });
  return data;
};

// 토큰 재발급 API
export const postReissue = async (
  payload: postReissueRequestDTO
): Promise<postReissueResponseDTO> => {
  const { data } = await axiosInstance.post<postReissueResponseDTO>(
    "/auth/reissue",
    {
      refreshToken: payload.refreshToken,
    }
  );
  return data;
};

// 구글 로그인 API
export const postGoogleLogin = async (
  payload: GoogleLoginRequestDTO
): Promise<GoogleLoginResponseDTO> => {
  const response = await axiosInstance.post("/auth/google/login", payload);
  return response.data;
};
