import { useCallback, useEffect, useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import PrevButton from "../../components/Common/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import {
  isEmailValid,
  isPasswordMatch,
  isPasswordValid,
} from "../../utils/validate";
import type { SignupFlowProps } from "./SignupFlowLayout";
import ToSModal from "../../components/Login/ToSModal";
import { getEmail, postEmailVerificationRequest } from "../../apis/auth";
import { useHomeLanguage } from "../../context/HomeLanguageProvider";
import { translate } from "../../context/translate";

// interface SignupPageProps {
//   userInfo: SignupFlowProps;
//   setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
// }

const SignupPage = () => {
  const { userInfo, setUserInfo } = useOutletContext<{
    userInfo: SignupFlowProps;
    setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
  }>();
  
  const [hasVerifiedByToken, setHasVerifiedByToken] = useState(false); // 이메일 토큰 인증 시도 여부 상태관리
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 최종 인증 여부 상태관리
  const [emailTouched, setEmailTouched] = useState<boolean>(false); // 이메일 인풋 눌렀는지 상태관리
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false); // 비밀번호 인풋 눌렀는지 상태관리
  const [checkPasswordTouched, setCheckPasswordTouched] =
    useState<boolean>(false); // 비밀번호 확인 인풋 눌렀는지 상태관리
  const [isToSOpen, setIsToSOpen] = useState<boolean>(false); // 이용약관 모달 띄움 상태관리
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useHomeLanguage();
  const t = translate[language];

  // 이메일 인증 링크 발송 함수
  const handleEmailCheck = async () => {
    try {
      const response = await postEmailVerificationRequest({
        email: userInfo.email,
        verificationType: "EMAIL",
      });

      if (response.isSuccess) {
        alert(t.emailLinkSuccessAlert);
        console.log("이메일 인증 링크 전송 성공");
        return;
      }
    } catch (error) {
      alert(t.emailLinkErrorAlert);
      console.error("발송 실패:", error);
    }
  };

  // 이메일 인증 링크에서 토큰 받아오기
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      handleVerifyEmailToken(token);
    }
  }, [searchParams]);

  // 이메일에서 들어온 인증 링크 토큰 처리 함수
  const handleVerifyEmailToken = async (token: string) => {
    try {
      const emailInfoRes = await getEmail(token);
      if (!emailInfoRes.isSuccess || !emailInfoRes.result.email) {
        console.error("이메일 조회 실패");
      }
      const verifiedEmail = emailInfoRes.result.email;

      setUserInfo((prev) => ({ ...prev, email: verifiedEmail }));
      setHasVerifiedByToken(true);
      setEmailVerified(true);

      // // 인증 성공한 경우에만 부모창에 메세지 전달 + 창 닫기
      // if (window.opener) {
      //   window.opener.postMessage({ emailVerified: true, email: verifiedEmail }, "*");
      //   window.close();
      // }

      console.log("이메일 인증 성공 및 조회 성공", verifiedEmail);
      alert(t.emailVerifySuccessAlert);
    } catch (error) {
      console.error("인증 실패:", error);
      setHasVerifiedByToken(true);
      setEmailVerified(false);
      alert(t.emailVerifyErrorAlert);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.emailVerified && event.data.email) {
        setUserInfo((prev) => ({ ...prev, email: event.data.email }));
        setEmailVerified(true);
        setHasVerifiedByToken(true);
        alert("이메일 인증이 완료되었습니다!");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  const isAllValid = useCallback(() => {
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
  }, [
    userInfo.email,
    userInfo.password,
    userInfo.checkPassword,
    userInfo.isPrivacy,
    emailVerified,
  ]);

  const handleNextPage = () => {
    if (!isAllValid()) return;
    console.log(userInfo.email, userInfo.password);
    navigate("profile");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValid()) return;
    handleNextPage();
  };

  // 전역 Enter/Space
  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if (isToSOpen) return; // 약관 모달 열렸을 땐 막기
      if (e.isComposing || e.repeat) return; // 한글 조합/키 반복 방지

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
          "signup-form"
        ) as HTMLFormElement | null;
        if (form?.requestSubmit) form.requestSubmit();
        else form?.submit();
      }
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [isAllValid, isToSOpen]);

  return (
    <div
      className="flex flex-col min-h-screen
    items-center justify-center px-4"
    >
      <TopLangOptionsButton />
      <div className="w-[545px] items-left space-y-11">
        <section className="h-[110px] space-y-12">
          <PrevButton navigateURL="/home" />
          <TitleHeader title={t.signupHeader} />
        </section>

        <form
          id="signup-form"
          onSubmit={handleSubmit}
          className="w-full h-[390px] space-y-5"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormInput
                  name={t.email}
                  placeholder={t.emailPlaceholder}
                  input={userInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  disabled={emailVerified}
                />
              </div>
              <IDButton
                name={emailVerified ? t.afterVerify : t.beforeVerify}
                onClick={handleEmailCheck}
                disabled={!isEmailValid(userInfo.email) || emailVerified}
              />
            </div>
            {emailTouched &&
              isEmailValid(userInfo.email) &&
              hasVerifiedByToken && (
                <>
                  {emailVerified ? (
                    <span className="text-body2 text-mint-500">
                      {t.emailVerifiedToast}
                    </span>
                  ) : (
                    <span className="text-body2 text-red-500">
                      {t.emailErrorToast}
                    </span>
                  )}
                </>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <FormInput
              name={t.password}
              placeholder={t.passwordPlaceholder}
              input={userInfo.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              type="password"
            />
            {!passwordTouched || userInfo.password.trim() === "" ? (
              <span className="text-body2 text-gray-600">
                {t.pwConditionToast}
              </span>
            ) : !isPasswordValid(userInfo.password) ? (
              <span className="text-body2 text-red-500">
                {t.pwConditionToast}
              </span>
            ) : (
              <span className="text-body2 text-mint-500">{t.pwValidToast}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <FormInput
              name={t.comfirmPassword}
              placeholder={t.passwordPlaceholder}
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
                  {t.pwConfirmedToast}
                </span>
              ) : (
                <span className="text-body2 text-red-500">
                  {t.pwNotConfirmedToast}
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
                className="text-body1 hover:underline underline-offset-3 cursor-pointer"
              >
                {t.TosAgreed}
              </span>
            </div>
            {isToSOpen && <ToSModal onClose={handleCloseTosModal} />}
          </div>

          <SignupButton
            form="signup-form"
            type="submit"
            name={t.nextButton}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default SignupPage;