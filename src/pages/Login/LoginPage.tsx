import { useState } from "react";
import FormInput from "../../components/Login/FormInput";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { postSignin } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();

  // 로그인 요청 함수
  const handleLogin = async () => {
    try {
      const response = await postSignin({ email, password });

      if (response.isSuccess) {
        const { accessToken, refreshToken, member } = response.result;
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);

        console.log("로그인 성공", member);
        navigate("/");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("로그인 실패", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (!isFormValid) return; // 유효성 통과 시에만 실행
    handleLogin();
  };

  const handleGoogleLogin = () => {
    // 구글로그인 요청 API 나중에 작성 예정
    console.log("구글 로그인 요청");
    navigate("/auth/google/login");
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-12 px-4"
    >
      <TopLangOptionsButton />
      <header className="flex flex-col items-center space-y-8">
        <img src="images/LXD_logo.svg" />
        <img src="images/language_x_diary.svg" />
      </header>

      <div className="flex flex-col w-[430px] p-4 space-y-10">
        <form
          id="1"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5"
        >
          <FormInput
            name="이메일"
            placeholder={t.emailPlaceholder}
            input={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            name="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            input={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </form>

        <section className="flex flex-col space-y-3">
          <button
            form="1"
            type="submit"
            onClick={handleLogin}
            disabled={!isFormValid}
            className="w-full h-[55px] justify-center py-3 rounded-md  
      bg-[#4170FE] hover:bg-blue-600 cursor-pointer transition 
      disabled:bg-gray-300"
          >
            <span className="text-subhead3 text-white">로그인</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex gap-3 w-full h-[55px] justify-center border border-gray-400 
            py-3 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <img src="images/Google__G__logo.svg" />
            <span className="text-subhead3 text-gray-600 font-medium">
              Google 로 시작하기
            </span>
          </button>

          <div
            className="flex w-full justify-between text-body3 text-gray-700 py-3 
        underline underline-offset-2 cursor-pointer"
          >
            <a href="/home/signup">회원가입</a>
            <a href="/home/signup/change-pw">비밀번호 변경</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
