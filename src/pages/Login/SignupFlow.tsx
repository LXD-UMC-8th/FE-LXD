import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import ChangePWPage from "./ChangePWPage";

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
}

const SignupFlow = () => {
  const [userInfo, setUserInfo] = useState<SignupFlowProps>({
    email: "",
    password: "",
    checkPassword: "",
    isPrivacy: false,
    id: "",
    nickname: "",
    profileImg: null,
    nativeLanguage: "",
    studyLanguage: "",
  });

  return (
    <Routes>
      <Route
        index
        element={<SignupPage userInfo={userInfo} setUserInfo={setUserInfo} />}
      />
      <Route
        path="profile"
        element={<ProfilePage userInfo={userInfo} setUserInfo={setUserInfo} />}
      />
      <Route
        path="change-pw"
        element={<ChangePWPage userInfo={userInfo} setUserInfo={setUserInfo} />}
      />
    </Routes>
  );
};

export default SignupFlow;
