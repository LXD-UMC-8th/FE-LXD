import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { HomeLanguageProvider } from "../context/HomeLanguageProvider";
import { getLocalStorageItem } from "../apis/axios";

export interface SignupFlowProps {
  email: string;
  password: string;
  checkPassword: string;
  isPrivacy: boolean;
  id: string;
  nickname: string;
  profileImg: File | null;
  nativeLanguage: string;
  studyLanguage: string;
  loginType: "GOOGLE" | "LOCAL";
}

const SignupFlowLayout = () => {
  const defaultUserInfo: SignupFlowProps = {
    email: "",
    password: "",
    checkPassword: "",
    isPrivacy: false,
    id: "",
    nickname: "",
    profileImg: null,
    nativeLanguage: "",
    studyLanguage: "",
    loginType: "LOCAL",
  };

  const [userInfo, setUserInfo] = useState<SignupFlowProps>(() => {
    const stored = localStorage.getItem("googleSignupUserInfo");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultUserInfo;
      }
    }
    return defaultUserInfo;
  });

  if (
    getLocalStorageItem("accessToken") ||
    getLocalStorageItem("refreshToken")
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <HomeLanguageProvider>
      <div className="min-h-screen bg-white">
        <Outlet context={{ userInfo, setUserInfo }} />;
      </div>
    </HomeLanguageProvider>
  );
};

export default SignupFlowLayout;
