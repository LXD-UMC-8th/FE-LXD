import { useCallback, useEffect, useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import LangOptionsButton from "../../components/Login/LangOptionsButton";
import PrevButton from "../../components/Common/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import { isIdValid, isNicknameValid } from "../../utils/validate";
import type { SignupFlowProps } from "./SignupFlow";
import { postSignup } from "../../apis/members";
import { getCheckDuplicatedID } from "../../apis/members";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

interface ProfilePageProps {
  userInfo: SignupFlowProps;
  setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
}

const ProfilePage = ({ userInfo, setUserInfo }: ProfilePageProps) => {
  const [idTouched, setIdTouched] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translate[language];

  // // 모킹 함수 (나중에 삭제)
  // async function fakeIdCheck(
  //   _id: string,
  //   mode: "available" | "taken" | "random" = "available",
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

  const handleIDCheck = async () => {
    setIdTouched(true);
    setIdChecked(true);
    try {
      const response = await getCheckDuplicatedID(userInfo.id);

      if (!response.result.duplicated) {
        setIsIdAvailable(true); // 사용 가능
        console.log("사용 가능한 아이디");
      } else {
        setIsIdAvailable(false); // 사용 불가능
        console.log("이미 사용중인 아이디");
      }
    } catch (error) {
      alert("아이디 확인 중 오류가 발생했습니다");
      console.error("ID 중복 확인 실패:", error);
    }
  };

  useEffect(() => {
    if (userInfo.profileImg) {
      const imageUrl = URL.createObjectURL(userInfo.profileImg);
      setPreviewUrl(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl); // 메모리 누수 방지
      };
    } else {
      setPreviewUrl(null);
    }
  }, [userInfo.profileImg]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserInfo((prev) => ({ ...prev, profileImg: file }));
    }
  };
  const handleRemoveImage = () => {
    setUserInfo((prev) => ({ ...prev, profileImg: null }));
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    // 아이디 입력이 바뀌면 중복확인 상태 초기화
    if (key === "id") {
      setIdChecked(false);
      setIsIdAvailable(false);
    }
  };

  const handleNativeLanguageSelect = (lang: string) => {
    setUserInfo((prev) => ({
      ...prev,
      nativeLanguage: lang,
      studyLanguage: lang === "KO" ? "ENG" : "KO",
    }));
  };

  const handleStudyLanguageSelect = (lang: string) => {
    setUserInfo((prev) => ({
      ...prev,
      studyLanguage: lang,
    }));
  };

  const isAllValid = useCallback(() => {
    const { nativeLanguage, studyLanguage } = userInfo;
    const _isIdValid = isIdValid(userInfo.id) && isIdAvailable === true;
    const _isNicknameValid = isNicknameValid(userInfo.nickname);
    const _isLangValid = nativeLanguage !== "" && studyLanguage !== "";

    return _isIdValid && _isNicknameValid && _isLangValid;
  }, [isIdAvailable, userInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValid()) return;
    handleCompleteSignup();
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

  // 회원가입 진행 함수
  const handleCompleteSignup = async () => {
    try {
      const response = await postSignup(userInfo);

      if (response.isSuccess) {
        console.log("회원가입 성공", response.result.member);
        alert("회원가입 완료!");
        navigate("/home");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      console.log(userInfo);
      alert("회원가입 중 오류가 발생했습니다, 다시 시도해주세요");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen
    items-center justify-center px-4"
    >
      <TopLangOptionsButton />
      <div className="w-[545px] items-left space-y-11">
        <section className="h-[110px] space-y-12">
          <PrevButton navigateURL="/home/signup" />
          <TitleHeader title={t.profileHeader} />
        </section>

        <section className="w-full flex items-center justify-center">
          {/* 사진 추가 프로필 */}
          <div className="relative">
            <label
              htmlFor="profile-upload"
              className="w-[145px] h-[145px] flex items-center justify-center 
            border border-gray-400 bg-gray-300 text-body2 text-gray-600 
            underline underline-offset-2 rounded-full cursor-pointer"
            >
              {previewUrl ? (
                <img
                  src={previewUrl} // 미리보기 렌더링
                  alt="profileImg"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{t.addPhoto}</span>
              )}
            </label>

            {userInfo.profileImg && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-[url('/images/x_icon.svg')]
                bg-no-repeat bg-center bg-contain absolute top-1 right-4 w-5 h-5  
                 flex items-center justify-center cursor-pointer"
              />
            )}

            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </section>

        <form
          id="profile-form"
          onSubmit={handleSubmit}
          className="w-full space-y-8"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormInput
                  name={t.id}
                  placeholder={t.idPlaceholder}
                  input={userInfo.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  onBlur={() => setIdTouched(true)}
                />
              </div>
              <IDButton
                name={t.idCheck}
                onClick={handleIDCheck}
                disabled={!isIdValid(userInfo.id)}
              />
            </div>
            {idTouched && userInfo.id.trim() !== "" && (
              <>
                {!isIdValid(userInfo.id) ? (
                  <span className="text-body2 text-red-500">
                    영어 소문자와 특수기호(-._)만 사용가능 하며, 2자 이상
                    입력해야 합니다
                  </span>
                ) : idChecked && isIdAvailable === true ? (
                  <span className="text-body2 text-mint-500">
                    사용가능한 아이디입니다
                  </span>
                ) : idChecked && isIdAvailable === false ? (
                  <span className="text-body2 text-red-500">
                    사용할 수 없는 아이디입니다
                  </span>
                ) : null}
              </>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <FormInput
              name={t.nickname}
              placeholder={t.nicknamePlaceholder}
              input={userInfo.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              onBlur={() => setNicknameTouched(true)}
            />
            {!nicknameTouched || userInfo.nickname.trim() === "" ? (
              <span className="text-body2 text-gray-600">
                {t.nicknameConditionToast}
              </span>
            ) : !isNicknameValid(userInfo.nickname) ? (
              <span className="text-body2 text-red-500">
                {t.nicknameConditionToast}
              </span>
            ) : (
              <span className="text-body2 text-mint-500">
                {t.nicknameConditionToast}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <LangOptionsButton
              name={t.primaryLang}
              selected={userInfo.nativeLanguage}
              onSelect={handleNativeLanguageSelect}
            />
            <LangOptionsButton
              name={t.learningLang}
              selected={userInfo.studyLanguage}
              onSelect={handleStudyLanguageSelect}
            />
          </div>
        </form>

        <section>
          <SignupButton
            form="profile-form"
            type="submit"
            name={t.signupButton}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
