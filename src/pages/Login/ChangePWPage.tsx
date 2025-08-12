import { useEffect, useState } from "react";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import type { SignupFlowProps } from "./SignupFlow";
import {
  isEmailValid,
  isPasswordMatch,
  isPasswordValid,
} from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ChangePWPageProps {
  userInfo: SignupFlowProps;
  setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
}

const ChangePWPage = ({ userInfo, setUserInfo }: ChangePWPageProps) => {
  const [hasTriedVerify, setHasTriedVerify] = useState(false); // 인증하기 버튼 눌렀는지 상태관리
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 완료 여부 상태관리
  const [emailTouched, setEmailTouched] = useState(false); // 이메일 인풋 눌렀는지 상태관리
  const [passwordTouched, setPasswordTouched] = useState(false); // 비밀번호 인풋 눌렀는지 상태관리
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false); // 비밀번호 확인 인풋 눌렀는지 상태관리
  const navigate = useNavigate();

  // 이메일 인증 모킹 함수 (나중에 삭제)
  async function fakeEmailVerify(
    _email: string,
    mode: "available" | "taken" | "random" = "available"
  ): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (mode === "random") {
          const available = Math.random() > 0.5;
          resolve({ ok: available });
          return;
        }
        resolve({ ok: mode === "available" });
      }, 500);
    });
  }

  const handleEmailCheck = async () => {
    setHasTriedVerify(true);
    try {
      // 여기에 이메일 인증 API 요청이 들어감 (나중에 axios로 대체)
      const response = await fakeEmailVerify(userInfo.email, "random");

      if (!response.ok) {
        console.log("인증 실패");
        setEmailVerified(false);
        return;
      }
      setEmailVerified(true);
      console.log("이메일 인증 성공");
    } catch (error) {
      alert("인증할 수 없는 이메일입니다");
      console.error("인증 실패:", error);
    }
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const isAllValid = () => {
    const _isEmailValid = isEmailValid(userInfo.email);
    const _isPasswordValid = isPasswordValid(userInfo.password);
    const _isPasswordChecked = isPasswordMatch(
      userInfo.password,
      userInfo.checkPassword
    );

    return _isEmailValid && _isPasswordValid && _isPasswordChecked;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValid()) return;
    handlePWChange();
  };

   // 전역 Enter/Space
    useEffect(() => {
      const onGlobalKey = (e: KeyboardEvent) => {
        if (e.isComposing || e.repeat) return;
  
        const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
        const isFormField =
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          tag === "button";
  
        const isEnter = e.key === "Enter";
        const isSpace = e.code === "Space";
  
        if ((isEnter || isSpace) && !isFormField) {
          if (!isAllValid()) return;
          e.preventDefault();
          const form = document.getElementById(
            "profile-form"
          ) as HTMLFormElement | null;
          if (form?.requestSubmit) form.requestSubmit();
          else form?.submit();
        }
      };
  
      window.addEventListener("keydown", onGlobalKey);
      return () => window.removeEventListener("keydown", onGlobalKey);
    }, [isAllValid]);

  const handlePWChange = async () => {
    const payload = {
      password: userInfo.password,
    };
    try {
      const response = await axios.post(
        "비밀번호 변경 API (로그인 전)",
        payload
      );
      console.log("비밀번호 변경 성공", response.data);
      alert("비밀번호가 정상적으로 변경되었습니다");
    } catch (err) {
      console.error("비밀번호 변경 실패:", err);
      alert("비밀번호 변경 실패, 다시 시도해주세요");
    }
    navigate("/home");
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
          <TitleHeader title="비밀번호 변경" />
        </section>

        <form id="changepw-form"
        onSubmit={handleSubmit}
        className="w-full h-[390px] space-y-5">
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormInput
                  name="이메일"
                  placeholder="계정의 이메일을 입력해주세요"
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
              name="새 비밀번호"
              placeholder="새로운 비밀번호를 입력해주세요"
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
              name="새 비밀번호 확인"
              placeholder="새로운 비밀번호를 다시 한 번 입력해주세요"
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

        <section className="flex flex-col">
          <SignupButton
            form="changepw-form"
            type="submit"
            name="변경하기"
            onClick={handlePWChange}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default ChangePWPage;
