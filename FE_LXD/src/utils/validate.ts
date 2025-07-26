// 이메일 유효성 검사 함수
export function isEmailValid(email: string): boolean {
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
}

// 비밀번호 유효성 검사 함수: 10자 이상, 영어 대소문자, 숫자, 특수문자포함
export function isPasswordValid(password: string): boolean {
  const lengthCheck = password.length >= 10;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /[0-9]/.test(password);
  const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck;
}

// 비밀번호 확인: 두 비밀번호가 같은지 확인
export function isPasswordMatch(
  password: string,
  checkPassword: string
): boolean {
  return password === checkPassword;
}

// 아이디 유효성 검사 함수: 영어 소문자, 숫자, 특수기호만. 2자이상. 공백 없음
// 중복확인 API 거친 후 사용 가능할 때만 유효
export function isIdValid(id: string): boolean {
  const pattern = /^[a-z0-9._-]{2,}$/;
  return pattern.test(id) && !/\s/.test(id);
}

// 닉네임 유효성 검사 함수: 영어 또는 한글. 1~40자 이하
export function isNicknameValid(nickname: string) {
  const pattern = /^[a-zA-Z가-힣]{1,40}$/;
  return pattern.test(nickname);
}
