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
