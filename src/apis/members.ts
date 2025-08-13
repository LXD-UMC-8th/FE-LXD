// 회원정보 (회원가입, 수정, 탈퇴, 조회 등)
import type { SignupFlowProps } from "../pages/Login/SignupFlow";
import type {
  MemberLanguageResponseDTO,
  MemberProfileRequest,
  MemberProfileResponseDTO,
  CheckDuplicatedIDResponseDTO,
} from "../utils/types/member";
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

// 회원가입 API
export const postSignup = async (
  userInfo: SignupFlowProps
): Promise<SignupResponse> => {
  const formData = new FormData();

  const userData = {
    email: userInfo.email,
    password: userInfo.password,
    isPrivacyAgreed: userInfo.isPrivacy,
    username: userInfo.id,
    nickname: userInfo.nickname,
    nativeLanguage: userInfo.nativeLanguage,
    studyLanguage: userInfo.studyLanguage,
    loginType: "LOCAL",
  };
  // JSON 데이터는 Blob으로 추가
  formData.append(
    "data",
    new Blob([JSON.stringify(userData)], { type: "application/json" })
  );
  // 프로필 이미지가 있으면 파일 추가
  if (userInfo.profileImg) {
    formData.append("profileImg", userInfo.profileImg);
  }

  const { data } = await axiosInstance.post<SignupResponse>(
    "/members/join",
    formData
  );

  return data;
};

// 아이디 중복 확인 api
export const getCheckDuplicatedID = async (username: string) => {
  const response = await axiosInstance.get<CheckDuplicatedIDResponseDTO>(
    "/members/check-username",
    {
      params: { username },
    }
  );
  return response.data;
};


// 언어 조회 API
export const getMemberLanguage = async () => {
  try {
    const response = await axiosInstance.get<MemberLanguageResponseDTO>(
      "/members/language"
    );
    return response.data;
  } catch (err) {
    console.log("getMemberLanguage error:", err);
  }
};


// 시스템 언어 변경 API
export const patchMemberLanguage = async (systemLanguage: string) => {
  try {
    const response = await axiosInstance.patch("/members/system-language", {
      systemLanguage,
    });
    return response.data;
  } catch (err) {
    console.log("patchMemberLanguage error:", err);
  }
};


//프로필 조회 API
export const getMemberProfile = async () => {
  try {
    const { data } = await axiosInstance.get<MemberProfileDTO>(
      "/members/profile"
    );
    return response.data;
  } catch (err) {
    console.log("getMemberProfile error", err);
  }
};

// 프로필 수정 API
export const patchMemberProfile = async ({
  nickname,
  profileImg,
  removeProfileImg,
}: MemberProfileRequest) => {
  try {
    const formData = new FormData();

     const jsonData = { nickname, ...(removeProfileImg ? { removeProfileImg: true } : {}) };
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    if (!removeProfileImg && profileImg instanceof File) {
      formData.append("profileImg", profileImg);
    }

    const response = await axiosInstance.patch<MemberProfileResponseDTO>(
      "/members/profile",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (err) {
    console.log("patchMemberProfile error:", err);
  }
};
