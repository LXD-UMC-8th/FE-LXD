import { useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import PrevButton from "../../components/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader";

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    lang: "ko",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [emailTouched, setEmailTouched] = useState(false);
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false);

  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleEmailCheck = () => {
    // 이메일 유효성 확인 API 나중에 작성 예정
    // 유효하지 않으면 밑에 빨간글씨 뜨게하기
    console.log("이메일 유효성 확인 요청");
  };
  const isValid = () => {
    const isEmailValid =
      userInfo.email.trim() !== "" && userInfo.email.includes("@"); // 이메일 유효성, 나중에 수정
    const isPasswordValid = userInfo.password.trim().length >= 6; // 비밀번호 유효성, 나중에 수정
    const isPasswordChecked = userInfo.password === userInfo.checkPassword;

    return isEmailValid && isPasswordValid && isPasswordChecked && agreed;
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextPage = () => {
    if (!isValid()) return;
    console.log(userInfo.email, userInfo.password)
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
              <IDButton name="인증하기" onClick={handleEmailCheck} />
            </div>
            {emailTouched && !userInfo.email.includes("@") && (
              <span className="text-body2 text-red-500">
                유효하지 않은 이메일입니다
              </span>
            )}
          </div>
          <FormInput
            name="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            input={userInfo.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <div className="flex flex-col space-y-2">
            <FormInput
              name="비밀번호 확인"
              placeholder="비밀번호를 입력해주세요"
              input={userInfo.checkPassword}
              onChange={(e) =>
                handleInputChange("checkPassword", e.target.value)
              }
              onBlur={() => setCheckPasswordTouched(true)}
            />
            {checkPasswordTouched &&
              userInfo.password !== userInfo.checkPassword && (
                <span className="text-body2 text-red-500">
                  비밀번호가 일치하지 않습니다
                </span>
              )}
          </div>
        </form>

        <section className="flex flex-col space-y-7">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-[18px] h-[18px]"
            />
            <span className="text-body1">
              개인정보 처리 방침 및 이용약관에 동의합니다
            </span>
          </label>
          <SignupButton
            name="다음으로"
            onClick={handleNextPage}
            disabled={!isValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
