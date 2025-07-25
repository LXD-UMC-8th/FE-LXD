import { useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import PrevButton from "../../components/Common/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import {
  isEmailValid,
  isPasswordMatch,
  isPasswordValid,
} from "../../utils/validate";

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    lang: "ko",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleEmailCheck = () => {
    // 이메일 유효성 확인 API 나중에 작성 예정
    // 유효하지 않으면 밑에 빨간글씨 뜨게하기
    console.log("이메일 유효성 확인 요청");
  };

  const isAllValid = () => {
    const _isEmailValid = isEmailValid(userInfo.email);
    const _isPasswordValid = isPasswordValid(userInfo.password);
    const _isPasswordChecked = isPasswordMatch(
      userInfo.password,
      userInfo.checkPassword
    );

    return _isEmailValid && _isPasswordValid && _isPasswordChecked && agreed;
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextPage = () => {
    if (!isAllValid()) return;
    console.log(userInfo.email, userInfo.password);
    navigate("profile");
  };

  return (
    <div
      className="flex flex-col min-h-screen
    items-center justify-center px-4"
    >
      <TopLangOptionsButton
        selected={userInfo.lang}
        onSelect={(val) => handleInputChange("lang", val)}
      />
      <div className="w-[545px] items-left space-y-11">
        <section className="h-[110px] space-y-12">
          <PrevButton navigateURL="/home" />
          <TitleHeader title="계정 생성을 위해 정보를 입력해주세요" />
        </section>

        <form className="w-full h-[390px] space-y-5">
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormInput
                  name="이메일"
                  placeholder="이메일을 입력해주세요"
                  input={userInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
              </div>
              <IDButton
                name="인증하기"
                onClick={handleEmailCheck}
                disabled={!isEmailValid(userInfo.email)}
              />
            </div>
            {emailTouched && !isEmailValid(userInfo.email) && (
              <span className="text-body2 text-red-500">
                유효하지 않은 이메일입니다
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <FormInput
              name="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              input={userInfo.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              type="password"
            />
            {passwordTouched && !isPasswordValid(userInfo.password) && (
              <span className="text-body2 text-red-500">
                비밀번호는 10자 이상, 영문 대소문자/숫자/특수문자를 포함해야
                합니다
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <FormInput
              name="비밀번호 확인"
              placeholder="비밀번호를 입력해주세요"
              input={userInfo.checkPassword}
              onChange={(e) =>
                handleInputChange("checkPassword", e.target.value)
              }
              onBlur={() => setCheckPasswordTouched(true)}
              type="password"
            />
            {checkPasswordTouched &&
              isPasswordValid(userInfo.password) &&
              (isPasswordMatch(userInfo.password, userInfo.checkPassword) ? (
                <span className="text-body2 text-mint-500">
                  비밀번호가 일치합니다
                </span>
              ) : (
                <span className="text-body2 text-red-500">
                  비밀번호가 일치하지 않습니다
                </span>
              ))}
          </div>
        </form>

        <section className="flex flex-col space-y-7">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-[19px] h-[19px]"
            />
            <span className="text-body1">
              개인정보 처리 방침 및 이용약관에 동의합니다
            </span>
          </label>
          <SignupButton
            name="다음으로"
            onClick={handleNextPage}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
