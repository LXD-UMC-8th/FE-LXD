import { useState } from "react";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import LangOptionsButton from "../../components/Login/LangOptionsButton";
import PrevButton from "../../components/PrevButton";
import FormInput from "../../components/Login/FormInput";
import IDButton from "../../components/Login/IDButton";
import SignupButton from "../../components/Login/SignupButton";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [lang, setLang] = useState("ko");
  const [nativeLang, setNativeLang] = useState("");
  const [studyLang, setStudyLang] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [idTouched, setIdTouched] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      console.log("preview URL:", preview);
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
    const isIdValid = id.trim().length >= 6; // 아이디 유효성, 중복확인까지 완료해야함, 나중에 수정
    const isNicknameValid = nickname.trim() !== ""; // 닉네임 유효성, 나중에 수정
    const isLangValid = nativeLang !== "" && studyLang !== "";

    return isIdValid && isNicknameValid && isLangValid;
  };
  const handleCompleteSignup = () => {
    if (!isValid()) return;
    // 회원 데이터 보내기 API
    alert("회원가입 완료");
    navigate("/home");
  };

  const handleNativeLangSelect = (lang: string) => {
    setNativeLang(lang);
    setStudyLang(lang === "ko" ? "en" : "ko");
  };
  const handleStudyLangSelect = (lang: string) => {
    setStudyLang(lang);
    setNativeLang(lang === "ko" ? "en" : "ko");
  };

  return (
    <div
      className="flex flex-col min-h-screen
    items-center justify-center px-4"
    >
      <TopLangOptionsButton selected={lang} onSelect={setLang} />
      <div className="w-[545px] items-left space-y-11">
        <section className="h-[110px] space-y-12">
          <PrevButton navigateURL="/home/signup" />
          <h1 className="text-headline3 font-bold">
            프로필 생성에 필요한 정보를 입력해주세요
          </h1>
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
                  input={id}
                  onChange={(e) => setId(e.target.value)}
                  onBlur={() => setIdTouched(true)}
                />
              </div>
              <IDButton name="중복확인" onClick={handleIDCheck} />
            </div>
            {idTouched && idChecked && id.trim() !== "" && (
              <span className="text-body2 text-mint-500">
                사용가능한 아이디입니다
              </span>
            )}
          </div>
          <FormInput
            name="닉네임"
            placeholder="닉네임을 입력해주세요"
            input={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div className="flex justify-between">
            <LangOptionsButton
              name="모국어 / 주사용 언어"
              selected={nativeLang}
              onSelect={handleNativeLangSelect}
            />
            <LangOptionsButton
              name="학습언어"
              selected={studyLang}
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
