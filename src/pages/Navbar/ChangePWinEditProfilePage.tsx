import FormInput from "../../components/Login/FormInput";
import PrevButton from "../../components/Common/PrevButton";
import TitleHeader from "../../components/Common/TitleHeader";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useCallback, useEffect, useState } from "react";
import type { SignupFlowProps } from "../../layouts/SignupFlowLayout";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { patchMemberPassword } from "../../apis/members";
import type { ChangePasswordRequestDTO } from "../../utils/types/member";
import { getEmail, postEmailVerificationinPWRequest } from "../../apis/auth";
import {
  isEmailValid,
  isPasswordMatch,
  isPasswordValid,
} from "../../utils/validate";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";

const ChangePWinEditProfilePage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { userInfo, setUserInfo } = useOutletContext<{
    userInfo: SignupFlowProps;
    setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
  }>();
  const [hasVerifiedByToken, setHasVerifiedByToken] = useState(false); // 이메일 토큰 인증 시도 여부 상태관리
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 최종 인증 여부 상태관리
  const [emailTouched, setEmailTouched] = useState(false); // 이메일 인풋 눌렀는지 상태관리
  const [passwordTouched, setPasswordTouched] = useState(false); // 비밀번호 인풋 눌렀는지 상태관리
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false); // 비밀번호 확인 인풋 눌렀는지 상태관리
  const [searchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: (payload: ChangePasswordRequestDTO) =>
      patchMemberPassword(payload),
    onSuccess: (data) => {
      if (data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        console.log("비밀번호 변경 성공:", data);
      } else {
        alert(data.message || "비밀번호 변경에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    },
  });

  // 이메일 인증 링크 발송 함수
  const handleEmailCheck = async () => {
    try {
      const response = await postEmailVerificationinPWRequest({
        email: userInfo.email,
        verificationType: "PASSWORD",
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

  // 이메일에서 들어온 인증 링크 토큰 처리
  const handleVerifyEmailToken = async (token: string) => {
    try {
      const emailInfoRes = await getEmail(token);
      if (!emailInfoRes.isSuccess || !emailInfoRes.result.email) {
        console.error("이메일 조회 실패");
        setHasVerifiedByToken(true);
        setEmailVerified(false);
        return;
      }
      const verifiedEmail = emailInfoRes.result.email;
      setUserInfo((prev) => ({ ...prev, email: verifiedEmail }));
      setHasVerifiedByToken(true);
      setEmailVerified(true);
      console.log("이메일 인증 성공 및 조회 성공", verifiedEmail);
      alert(t.emailVerifySuccessAlert);
    } catch (e) {
      console.error("인증 실패:", e);
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
        alert(t.emailVerifySuccessAlert);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
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
          "changepw-form"
        ) as HTMLFormElement | null;
        if (form?.requestSubmit) form.requestSubmit();
        else form?.submit();
      }
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [isAllValid]);

  const handlePWChange = async () => {
    if (mutation.isPending) return; // 중복 클릭 방지

    mutation.mutate({
      email: userInfo.email,
      newPassword: userInfo.password,
      confirmNewPassword: userInfo.checkPassword,
    });
  };

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center px-4"
    >
      <div className="w-[545px] items-left space-y-11">
        <section className="h-[110px] space-y-12">
          <PrevButton navigateURL="/editprofile" />
          <TitleHeader title="비밀번호 변경" />
        </section>

        <form
          id="changepw-form"
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
              name={t.newPassword}
              placeholder={t.newPasswordPlaceholder}
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
              name={t.newPassword}
              placeholder={t.newPasswordPlaceholder}
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

        <section className="flex flex-col">
          <SignupButton
            form="changepw-form"
            type="submit"
            name={t.pwChangeButton}
            onClick={handlePWChange}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default ChangePWinEditProfilePage;
