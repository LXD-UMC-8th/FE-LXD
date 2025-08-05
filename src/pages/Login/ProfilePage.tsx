import { useState } from "react";
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
import axios from "axios";
import { getCheckDuplicatedID } from "../../apis/members";

interface ProfilePageProps {
  userInfo: SignupFlowProps;
  setUserInfo: React.Dispatch<React.SetStateAction<SignupFlowProps>>;
}

const ProfilePage = ({ userInfo, setUserInfo }: ProfilePageProps) => {
  const [idTouched, setIdTouched] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUserInfo((prev) => ({ ...prev, profileImg: imageURL }));
    }
  };
  const handleRemoveImage = () => {
    setUserInfo((prev) => ({ ...prev, profileImg: "" }));
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
      studyLanguage: lang === "ko" ? "en" : "ko",
    }));
  };

  const handleStudyLanguageSelect = (lang: string) => {
    setUserInfo((prev) => ({
      ...prev,
      studyLanguage: lang,
    }));
  };

  const isAllValid = () => {
    const { nativeLanguage, studyLanguage } = userInfo;
    const _isIdValid = isIdValid(userInfo.id) && isIdAvailable === true;
    const _isNicknameValid = isNicknameValid(userInfo.nickname);
    const _isLangValid = nativeLanguage !== "" && studyLanguage !== "";

    return _isIdValid && _isNicknameValid && _isLangValid;
  };

  const handleCompleteSignup = async () => {
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.id,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      nativeLanguage: userInfo.nativeLanguage,
      studyLanguage: userInfo.studyLanguage,
      isPrivacy: userInfo.isPrivacy,
    };

    try {
      const response = await axios.post("/members/join", payload);
      console.log("회원가입 성공", response.data);
      alert("회원가입 성공");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 실패, 다시 시도해주세요");
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
          <PrevButton navigateURL="/home/signup" />
          <TitleHeader title="프로필 생성에 필요한 정보를 입력해주세요" />
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
              {userInfo.profileImg ? (
                <img
                  src={userInfo.profileImg}
                  alt="profileImg"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>사진 추가</span>
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

        <form className="w-full space-y-8">
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormInput
                  name="아이디"
                  placeholder="아이디를 입력해주세요"
                  input={userInfo.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  onBlur={() => setIdTouched(true)}
                />
              </div>
              <IDButton
                name="중복확인"
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
              name="닉네임"
              placeholder="닉네임을 입력해주세요"
              input={userInfo.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              onBlur={() => setNicknameTouched(true)}
            />
            {nicknameTouched &&
              userInfo.nickname.trim() !== "" &&
              !isNicknameValid(userInfo.nickname) && (
                <span className="text-body2 text-red-500">
                  1자 이상 40자 이내의 영어 또는 한글로 작성해주세요
                </span>
              )}
          </div>
          <div className="flex justify-between">
            <LangOptionsButton
              name="모국어 / 주사용 언어"
              selected={userInfo.nativeLanguage}
              onSelect={handleNativeLanguageSelect}
            />
            <LangOptionsButton
              name="학습언어"
              selected={userInfo.studyLanguage}
              onSelect={handleStudyLanguageSelect}
            />
          </div>
        </form>

        <section>
          <SignupButton
            name="가입완료"
            onClick={handleCompleteSignup}
            disabled={!isAllValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
