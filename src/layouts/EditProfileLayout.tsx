// EditProfileLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { SignupFlowProps } from "./SignupFlowLayout";

export default function EditProfileLayout() {
  const [userInfo, setUserInfo] = useState<SignupFlowProps>({
    email: "",
    password: "",
    checkPassword: "",
    isPrivacy: true,
    id: "",
    nickname: "",
    profileImg: null,
    nativeLanguage: "",
    studyLanguage: "",
    loginType: "LOCAL",
  });

  return <Outlet context={{ userInfo, setUserInfo }} />;
}
