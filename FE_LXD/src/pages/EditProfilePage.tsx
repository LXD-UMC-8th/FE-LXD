import { useState } from "react";
import { Link } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";
import AccountInfo from "../components/EditProfile/AccountInfo";
import ProfileInfo from "../components/EditProfile/ProfileInfo";

const EditProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    id: "jessy1220",
    email: "kiminju1220@gmail.com",
    password: "teri1220",
    profileImage: {
      preview: null as string | null,
      name: "",
    },
    nickName: "",
  });
  const [initialUserInfo] = useState(userInfo); // 최초 상태 기억

  const handleChangePw = () => {
    // 비밀번호 변경하기 버튼 누르면 실행
    // 변경하는 새로운 모달이 뜨나? 아직 모름
    setUserInfo((prev) => ({ ...prev, password: "hihihihihi" }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const imageURL = URL.createObjectURL(image);
      setUserInfo((prev) => ({
        ...prev,
        profileImage: {
          preview: imageURL,
          name: image.name,
        },
      }));
    }
  };
  const handleRemoveImage = () => {
    setUserInfo((prev) => ({
      ...prev,
      profileImage: { preview: null, name: "" },
    }));
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickName: e.target.value }));
  };

  const isModified =
    userInfo.nickName.length >= 1 &&
    (userInfo.password !== initialUserInfo.password ||
      userInfo.profileImage !== initialUserInfo.profileImage ||
      userInfo.nickName !== initialUserInfo.nickName);

  const handleSaveChanges = () => {
    // 변경 내용 저장 (비밀번호 or 프로필이미지 or 닉네임)
    // 서버에 변경한 값만 인식하여 전달
    console.log(userInfo);
  };

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-10 px-4"
    >
      <section className="flex flex-col w-[775px] items-left">
        <TitleHeader title="프로필 편집" />
      </section>

      <div className="space-y-3">
        <section className="flex w-[775px]">
          <AccountInfo
            id={userInfo.id}
            email={userInfo.email}
            password={userInfo.password}
            onChangePw={handleChangePw}
          />
        </section>

        <section className="flex w-[775px]">
          <ProfileInfo
            profilePreview={userInfo.profileImage.preview}
            profileName={userInfo.profileImage.name}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            nickname={userInfo.nickName}
            onNicknameChange={handleNicknameChange}
          />
        </section>
      </div>

      <section className="flex w-[775px] items-center justify-between">
        <Link
          to="/"
          className="text-subhead3 text-gray-600 underline underline-offset-3"
        >
          회원탈퇴
        </Link>
        <button
          onClick={handleSaveChanges}
          disabled={!isModified}
          className={`px-8 py-5 rounded-md text-subhead3 font-semibold
            ${
              isModified
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-300 text-gray-600"
            }`}
        >
          변경 내용 저장
        </button>
      </section>
    </div>
  );
};

export default EditProfilePage;
