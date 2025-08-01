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
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "auth/login",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return data;
};
