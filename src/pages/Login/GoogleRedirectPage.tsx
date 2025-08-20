import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../apis/axios";
import LoadingModal from "../../components/Common/LoadingModal";

const GoogleRedirectPage = () => {
  const [_authCode, setAuthCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const code = sp.get("code");

    if (!code) return;
    setAuthCode(code);
    console.log("[Google OAuth] code:", code);

    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);

    (async () => {
      try {
        const { data } = await axiosInstance.post("/auth/google/login", {
          code,
        });

        if (data.isSuccess) {
          const { accessToken, refreshToken, isNewMember } = data.result;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          console.log(" 구글 로그인 성공:", { isNewMember });

          if (isNewMember) {
            // 신규회원: ProfilePage로 이동
            const googleEmail = data.result.member.email;
            const randomPassword = Math.random().toString(36).slice(2, 12); // 임의의 10자리 문자열

            const userInfo = {
              email: googleEmail,
              password: randomPassword,
              checkPassword: randomPassword,
              isPrivacy: true,
              id: "",
              nickname: "",
              profileImg: null,
              nativeLanguage: "",
              studyLanguage: "",
              loginType: "GOOGLE",
            };

            localStorage.setItem(
              "googleSignupUserInfo",
              JSON.stringify(userInfo)
            );
            navigate("/home/signup/profile", { replace: true });
          } else {
            // 기존회원: 바로 FeedPage로 이동
            navigate("/feed", { replace: true });
          }
        } else {
          alert("구글 로그인 실패: " + data.message);
        }
      } catch (e) {
        console.error("구글 로그인 중 오류", e);
      }
    })();
  }, []);

  return <LoadingModal />;
};

export default GoogleRedirectPage;
