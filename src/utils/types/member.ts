import type { APIResponse } from "./APIresponse";
//회원가입할 때 이용하는 type
export type JoinRequestDTO = {
  email: string;
  password: string;
  isPrivacyAgreed: boolean;
  username: string;
  nickname: string;
  profileImg: string;
  nativeLanguage: string; // e.g., "KO"
  language: string;
};

export type MemberDTO = {
  memberId: number;
  email: string;
  username: string;
  nickname: string;
  profileImg: string;
  language: string;
};

//로그인 했을 때 받는 type
export type JoinResponseDTO = {
  member: MemberDTO;
};

export type CorrectionsMemberDTO = {
  memberId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export type MemberLanguageDTO = {
  nativeLanguage: string;
  studyLanguage: string;
  systemLanguage: string;
};

export type MemberLanguageResponseDTO = APIResponse<MemberLanguageDTO>;

export type MemberProfileDTO = {
  memberId: number;
  username: string;
  email: string;
  nickname: string;
  profileImg: string;
};

export type MemberProfileResponseDTO = APIResponse<MemberProfileDTO>;
