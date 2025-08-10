import { useEffect, useState } from "react";
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

        alert("로그인 되었습니다");
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
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (!isFormValid) return; // 유효성 통과 시에만 실행
    handleLogin();
  };

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
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
        if (!isFormValid) return;
        e.preventDefault();

        const form = document.getElementById(
          "login-form"
        ) as HTMLFormElement | null;
        if (form?.requestSubmit) form.requestSubmit();
        else form?.submit();
      }
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [isFormValid]);

  const handleGoogleLogin = () => {
    // 구글로그인 요청 API 나중에 작성 예정
    console.log("구글 로그인 요청");
    navigate("/auth/google/login");
  };

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-12 px-4"
    >
      <TopLangOptionsButton />
      <header className="flex flex-col items-center space-y-8">
        <img src="images/LXD_logo.svg" />
        <img src="images/Language_Xchange_Diary.svg" />
      </header>

      <div className="flex flex-col w-[430px] p-4 space-y-10">
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5"
        >
          <FormInput
            name={t.email}
            placeholder={t.emailPlaceholder}
            input={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            name={t.password}
            placeholder={t.passwordPlaceholder}
            input={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </form>

        <section className="flex flex-col space-y-3">
          <button
            form="login-form"
            type="submit"
            disabled={!isFormValid}
            className="w-full h-[55px] justify-center py-3 rounded-md  
      bg-[#4170FE] hover:bg-blue-600 cursor-pointer transition 
      disabled:bg-gray-300"
          >
            <span className="text-subhead3 text-white">{t.login}</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex gap-3 w-full h-[55px] justify-center border border-gray-400 
            py-3 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <img src="images/Google__G__logo.svg" />
            <span className="text-subhead3 text-gray-600 font-medium">
              {t.googleLogin}
            </span>
          </button>

          <div
            className="flex w-full justify-between text-body3 text-gray-700 py-3 
        underline underline-offset-2 cursor-pointer"
          >
            <a href="/home/signup">{t.signup}</a>
            <a href="/home/signup/change-pw">{t.changePassword}</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
