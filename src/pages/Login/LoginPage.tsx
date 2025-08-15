import { useEffect, useState } from "react";
import FormInput from "../../components/Login/FormInput";
import TopLangOptionsButton from "../../components/Login/TopLangOptionsButton";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../../hooks/mutations/useSignin";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { setLocalStorageItem } from "../../apis/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: postSignin } = useSignin();
  // 로그인 요청 함수
  const handleLogin = async () => {
    try {
      const response = await postSignin({ email, password });

      if (response?.isSuccess) {
        const { accessToken, refreshToken, member } = response.result;
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
        setLocalStorageItem("userId", String(member.memberId));

        console.log("로그인 성공", member);
        alert("로그인 되었습니다.");
        navigate("/");
      } else {
        alert(response?.message ?? "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.log("로그인 실패", error);
      alert("로그인 중 오류가 발생하였습니다.");
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

  // const googleLogin = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async ({ code }) => {
  //     console.log("구글 로그인 성공, code:", code);

  //     // try {
  //     //   const res = await postGoogleLogin({code});

  //     //   if (res.isSuccess) {
  //     //     const { accessToken, refreshToken, member } = res.result;

  //     //     // 토큰 저장
  //     //     localStorage.setItem("accessToken", accessToken);
  //     //     localStorage.setItem("refreshToken", refreshToken);

  //     //     // 원하는 페이지로 이동
  //     //     navigate("/feed");
  //     //     console.log("로그인 성공:", member);
  //     //   } else {
  //     //     alert("로그인 실패: " + res.message);
  //     //   }
  //     // } catch (err) {
  //     //   console.error("구글 로그인 실패", err);
  //     //   alert("로그인 중 오류 발생");
  //     // }
  //   },
  //   onError: (err) => {
  //     console.error("구글 로그인 실패", err);
  //     alert("구글 로그인에 실패했습니다");
  //   },
  //   // redirect_uri: import.meta.env.DEV
  //   //   ? "http://localhost:5173/feed"
  //   //   : "https://lxd-fe.netlify.app/feed", // 구글 콘솔에 등록한 redirect_uri와 동일해야 함
  // });

  const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const REDIRECT_URI = import.meta.env.DEV
    ? "http://localhost:5173/feed"
    : "https://lxd-fe.netlify.app/feed";

  const handleGoogleLogin = () => {
    console.log("구글 로그인 요청");
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      // PKCE 안 씀: code_challenge / code_challenge_method 절대 넣지 않음
    });
    window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`;
  };

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-12 px-4"
    >
      <TopLangOptionsButton />
      <header className="flex flex-col items-center space-y-8">
        <img alt="LXD logo" src="images/LXD_logo.svg" />
        <img
          alt="Language Xchange Diary"
          src="images/Language_Xchange_Diary.svg"
        />
      </header>

      <div className="flex flex-col w-[430px] p-4 space-y-10">
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5"
        >
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
            <span className="text-subhead3 text-white">로그인</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex gap-3 w-full h-[55px] justify-center border border-gray-400 
            py-3 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <img alt="google logo" src="images/Google__G__logo.svg" />
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
