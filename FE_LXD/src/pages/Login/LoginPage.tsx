import { useState } from "react";
import { FormInput } from "../../components/Login/FormInput";
import { TopLangOptionsButton } from "../../components/Login/TopLangOptionsButton";

const LoginPage = () => {
  const [lang, setLang] = useState("ko"); // 언어선택 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 요청 API 나중에 작성 예정
    console.log("로그인 요청", { email, password });
  };
  const handleGoogleLogin = () => {
    // 구글로그인 요청 API 나중에 작성 예정
    console.log("구글 로그인 요청");
  };
  // 로그인 버튼 활성화 조건, 나중에 수정
  const isFormValid = email.length >= 5 && password.length >= 5;

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-12 px-4"
    >
      <TopLangOptionsButton selected={lang} onSelect={setLang} />

      <header className="flex flex-col items-center space-y-8">
        <img src="images/LXD_logo.svg" />
        <img src="images/language_x_diary.svg" />
      </header>

      <div className="flex flex-col w-[430px] p-4 space-y-10">
        <form className="flex flex-col space-y-5">
          <FormInput
            name="이메일"
            placeholder="이메일을 입력해주세요"
            input={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            name="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            input={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>

        <section className="flex flex-col space-y-3">
          <button
            type="submit"
            onClick={handleLogin}
            disabled={!isFormValid}
            className="w-full h-[55px] justify-center py-3 rounded-md  
      bg-blue-600 hover:bg-blue-700 cursor-pointer transition 
      disabled:bg-gray-300"
          >
            <span className="text-subhead3 text-white">로그인</span>
          </button>
          <button
            type="submit"
            onClick={handleGoogleLogin}
            className="w-full h-[55px] justify-center border border-gray-500 
            py-3 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="text-subhead3 text-gray-600 font-medium">
              Google로 시작하기
            </span>
          </button>

          <div
            className="flex w-full justify-between text-body3 text-gray-700 py-3 
        underline underline-offset-2 cursor-pointer"
          >
            <a href="/home/signup">회원가입</a>
            <a href="/home/change-pw">비밀번호 변경</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
