// 회원정보 (회원가입, 수정, 탈퇴, 조회 등)
import { axiosInstance } from "./axios";

export interface SignupRequest {
  email: string;
  password: string;
  isPrivacyAgreed: boolean;
  username: string;
  nickname: string;
  profileImg: string;
  nativeLanguage: string;
  language: string;
  loginType: "GOOGLE" | "LOCAL";
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    member: {
      memberId: number;
      email: string;
      nickname: string;
      profileImg: string;
      language: string;
    };
  };
}

export const postSignup = async (
  payload: SignupRequest
): Promise<SignupResponse> => {
  const { data } = await axiosInstance.post("/members/join", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export interface CheckDuplicatedIDResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    username: string;
    duplicated: boolean;
  };
}

// 아이디 중복 확인 api
export const getCheckDuplicatedID = async (username: string) => {
  const response = await axiosInstance.get<CheckDuplicatedIDResponse>(
    "/members/check-username",
    {
      params: { username },
    }
  );
  return response.data;
};
