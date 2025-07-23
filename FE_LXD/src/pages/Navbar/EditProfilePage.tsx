import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import AccountInfo from "../../components/NavBar/EditProfile/AccountInfo";
import ProfileInfo from "../../components/NavBar/EditProfile/ProfileInfo";

const EditProfilePage = () => {
  const [_userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    profileImage: {
      preview: null as string | null,
      name: "",
    },
    nickName: "",
  });
  const [_initialUserInfo, setInitialUserInfo] = useState(_userInfo); // 최초 상태 기억
  const [_objectURL, setObjectURL] = useState<string | null>(null);

  useEffect(() => {
    const _fetchUserInfo = async () => {
      try {
        const _response = await fetch("/api/user-info"); // 여기에 API
        if (!_response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const _data = await _response.json();
        setUserInfo(_data);
        setInitialUserInfo(_data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    _fetchUserInfo();
  }, []);

  const _handleChangePw = () => {
    // 비밀번호 변경하기 버튼 누르면 실행
    // 변경하는 새로운 모달이 뜨나? 아직 모름
    setUserInfo((prev) => ({ ...prev, password: "hihihihihi" }));
  };

  const _handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _image = e.target.files?.[0];
    if (_image) {
      if (_objectURL) {
        URL.revokeObjectURL(_objectURL);
      }
      const _imageURL = URL.createObjectURL(_image);
      setObjectURL(_imageURL);
      setUserInfo((prev) => ({
        ...prev,
        profileImage: {
          preview: _imageURL,
          name: _image.name,
        },
      }));
    }
  };
  const _handleRemoveImage = () => {
    setUserInfo((prev) => ({
      ...prev,
      profileImage: { preview: null, name: "" },
    }));
  };
  const _handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickName: e.target.value }));
  };

  const _isModified =
    _userInfo.nickName.length >= 1 &&
    (_userInfo.password !== _initialUserInfo.password ||
      _userInfo.profileImage.preview !==
        _initialUserInfo.profileImage.preview ||
      _userInfo.profileImage.name !== _initialUserInfo.profileImage.name ||
      _userInfo.nickName !== _initialUserInfo.nickName);

  const _handleSaveChanges = () => {
    // 변경 내용 저장 (비밀번호 or 프로필이미지 or 닉네임)
    // 서버에 변경한 값만 인식하여 전달
    console.log(_userInfo);
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
            _id={_userInfo.id}
            _email={_userInfo.email}
            _password={_userInfo.password}
            _onChangePw={_handleChangePw}
          />
        </section>

        <section className="flex w-[775px]">
          <ProfileInfo
            _profilePreview={_userInfo.profileImage.preview}
            _profileName={_userInfo.profileImage.name}
            _onImageChange={_handleImageChange}
            _onRemoveImage={_handleRemoveImage}
            _nickname={_userInfo.nickName}
            _onNicknameChange={_handleNicknameChange}
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
          onClick={_handleSaveChanges}
          disabled={!_isModified}
          className={`px-8 py-5 rounded-md text-subhead3 font-semibold
            ${
              _isModified
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
