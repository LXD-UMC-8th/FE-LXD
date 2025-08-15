import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import { useEffect, useMemo, useState } from "react";
// import { axiosInstance } from "../../apis/axios";
// import type { GoogleLoginResponseDTO } from "../../utils/types/auth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../apis/axios";

const FeedPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const navigate = useNavigate();
  const tabvalue = useMemo(
    () => [
      { value: "friendINfeed", title: t.Friends },
      { value: "searchINfeed", title: t.explore },
      { value: "likeINfeed", title: t.Likes },
    ],
    [t]
  );

  const [authCode, setAuthCode] = useState<string | null>(null);
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
          const { accessToken, refreshToken } = data.result;

          // localStorage에 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          console.log(" 구글 로그인 성공. 토큰 저장 완료.");
        } else {
          alert("구글 로그인 실패: " + data.message);
        }
      } catch (e) {
        console.error("구글 로그인 중 오류", e);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between mx-10">
      <div className="">
        <ModalWithTabs key={language} tabvalue={tabvalue} />
      </div>
      <div className="z-10 mx-10 pr-10">
        <CalendarModal />
      </div>
    </div>
  );
};
export default FeedPage;
