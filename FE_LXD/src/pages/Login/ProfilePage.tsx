import { useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import LangOptionsButton from "../../components/Login/LangOptionsButton";
import PrevButton from "../../components/Common/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    lang: "ko",
    nativeLang: "",
    studyLang: "",
    id: "",
    nickname: "",
  });
  const [idTouched, setIdTouched] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };
  const handleIDCheck = () => {
    // 아이디 중복 확인 API 나중에 작성 예정
    // 유효하면 밑에 민트글씨 뜨게하기
    setIdTouched(true);
    setIdChecked(true);
    console.log("아이디 중복 확인 요청");
  };

  const isValid = () => {
    const { id, nickname, nativeLang, studyLang } = userInfo;
    const isIdValid = id.trim().length >= 6; // 아이디 유효성, 중복확인까지 완료해야함, 나중에 수정
    const isNicknameValid = nickname.trim() !== ""; // 닉네임 유효성, 나중에 수정
    const isLangValid = nativeLang !== "" && studyLang !== "";

    return isIdValid && isNicknameValid && isLangValid;
  };
  const handleCompleteSignup = () => {
    if (!isValid()) return;
    // 회원 데이터 보내기 API
    console.log(userInfo.id, userInfo.nickname, userInfo.nativeLang, userInfo.studyLang)
    alert("회원가입 완료");
    navigate("/home");
  };

  const handleInputChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };
  const handleNativeLangSelect = (lang: string) => {
    setUserInfo((prev) => ({
      ...prev,
      nativeLang: lang,
      studyLang: lang === "ko" ? "en" : "ko",
    }));
  };

  const handleStudyLangSelect = (lang: string) => {
    setUserInfo((prev) => ({
      ...prev,
      studyLang: lang,
      nativeLang: lang === "ko" ? "en" : "ko",
    }));
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
          <PrevButton navigateURL="/home/signup" />
          <TitleHeader title="프로필 생성에 필요한 정보를 입력해주세요" />
        </section>

        <section className="w-full flex items-center justify-center">
          {/* 사진 추가 프로필 */}
          <label
            htmlFor="profile-upload"
            className="w-[145px] h-[145px] flex items-center justify-center 
            border border-gray-400 bg-gray-300 text-body2 text-gray-600 
            underline underline-offset-2 rounded-full cursor-pointer"
          >
            {preview ? (
              <img
                src={preview}
                alt="profile-preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>사진 추가</span>
            )}
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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
              <IDButton name="중복확인" onClick={handleIDCheck} />
            </div>
            {idTouched && idChecked && userInfo.id.trim() !== "" && (
              <span className="text-body2 text-mint-500">
                사용가능한 아이디입니다
              </span>
            )}
          </div>
          <FormInput
            name="닉네임"
            placeholder="닉네임을 입력해주세요"
            input={userInfo.nickname}
            onChange={(e) => handleInputChange("nickname", e.target.value)}
          />
          <div className="flex justify-between">
            <LangOptionsButton
              name="모국어 / 주사용 언어"
              selected={userInfo.nativeLang}
              onSelect={handleNativeLangSelect}
            />
            <LangOptionsButton
              name="학습언어"
              selected={userInfo.studyLang}
              onSelect={handleStudyLangSelect}
            />
          </div>
        </form>

        <section>
          <SignupButton
            name="가입완료"
            onClick={handleCompleteSignup}
            disabled={!isValid()}
          />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
