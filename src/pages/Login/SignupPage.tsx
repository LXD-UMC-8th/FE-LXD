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
import type { SignupFlowProps } from "./SignupFlow";
import ToSModal from "../../components/Login/ToSModal";
import { postEmailVerificationRequest } from "../../apis/auth";

interface SignupPageProps {
  userInfo: SignupFlowProps;
  setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
}

const SignupPage = ({ userInfo, setUserInfo }: SignupPageProps) => {
  const [hasTriedVerify, setHasTriedVerify] = useState(false); //인증하기 버튼 눌렀는지 상태관리
  const [emailVerified, setEmailVerified] = useState(false); //이메일 인증 완료 여부 상태관리
  const [emailTouched, setEmailTouched] = useState(false); // 이메일 인풋 눌렀는지 상태관리
  const [passwordTouched, setPasswordTouched] = useState(false); // 비밀번호 인풋 눌렀는지 상태관리
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false); // 비밀번호 확인 인풋 눌렀는지 상태관리
  const [isToSOpen, setIsToSOpen] = useState(false); // 이용약관 모달 띄움 상태관리
  const navigate = useNavigate();

  // // 이메일 인증 모킹 함수 (나중에 삭제)
  // async function fakeEmailVerify(
  //   _email: string,
  //   mode: "available" | "taken" | "random" = "available"
  // ): Promise<{ ok: boolean }> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (mode === "random") {
  //         const available = Math.random() > 0.5;
  //         resolve({ ok: available });
  //         return;
  //       }
  //       resolve({ ok: mode === "available" });
  //     }, 500);
  //   });
  // }

  // 이메일 인증 링크 발송 함수
  const handleEmailCheck = async () => {
    setHasTriedVerify(true);
    try {
      const response = await postEmailVerificationRequest(userInfo.email);

      if (!response.isSuccess) {
        console.log("이메일 인증 실패");
        setEmailVerified(false);
        return;
      }
      setEmailVerified(true);
      console.log("이메일 인증 링크 발송 성공");
    } catch (error) {
      alert("인증할 수 없는 이메일입니다");
      console.error("인증 실패:", error);
    }
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleIsPrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, isPrivacy: e.target.checked }));
  };

  const handleOpenTosModal = () => {
    setIsToSOpen(true);
  };
  const handleCloseTosModal = () => {
    setIsToSOpen(false);
  };

  const isAllValid = () => {
    const _isEmailValid = isEmailValid(userInfo.email) && emailVerified;
    const _isPasswordValid = isPasswordValid(userInfo.password);
    const _isPasswordChecked = isPasswordMatch(
      userInfo.password,
      userInfo.checkPassword
    );

    return (
      _isEmailValid &&
      _isPasswordValid &&
      _isPasswordChecked &&
      userInfo.isPrivacy
    );
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
      <TopLangOptionsButton />
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
                  disabled={emailVerified}
                />
              </div>
              <IDButton
                name={emailVerified ? "인증완료" : "인증하기"}
                onClick={handleEmailCheck}
                disabled={!isEmailValid(userInfo.email) || emailVerified}
              />
            </div>
            {emailTouched &&
              userInfo.email.trim() !== "" &&
              !isEmailValid(userInfo.email) && (
                <span className="text-body2 text-red-500">
                  유효하지 않은 형식입니다
                </span>
              )}
            {emailTouched && isEmailValid(userInfo.email) && hasTriedVerify && (
              <>
                {emailVerified ? (
                  <span className="text-body2 text-mint-500">
                    인증되었습니다
                  </span>
                ) : (
                  <span className="text-body2 text-red-500">
                    사용할 수 없는 이메일입니다
                  </span>
                )}
              </>
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
            {passwordTouched &&
              userInfo.password.trim() !== "" &&
              !isPasswordValid(userInfo.password) && (
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
              userInfo.checkPassword.trim() !== "" &&
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
          <div className="flex gap-2 items-center">
            <label className="flex">
              <input
                type="checkbox"
                checked={userInfo.isPrivacy}
                onChange={handleIsPrivacy}
                className="w-[19px] h-[19px] cursor-pointer"
              />
            </label>
            <div className="flex">
              <span
                onClick={handleOpenTosModal}
                className="text-body1 hover:underline hover:underline-offset-3 
            hover:cursor-pointer active:text-blue-600"
              >
                개인정보 처리 방침 및 이용약관
              </span>
              <span className="text-body1">에 동의합니다</span>
            </div>
            {isToSOpen && <ToSModal onClose={handleCloseTosModal} />}
          </div>

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
