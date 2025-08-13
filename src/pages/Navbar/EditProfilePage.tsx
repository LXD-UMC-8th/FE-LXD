import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import AccountInfo from "../../components/NavBar/EditProfile/AccountInfo";
import ProfileInfo from "../../components/NavBar/EditProfile/ProfileInfo";
import AlertModal from "../../components/Common/AlertModal";
import { getMemberProfile } from "../../apis/members";
import type { MemberProfileResponseDTO } from "../../utils/types/member";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../components/Common/LoadingModal";

const EditProfilePage = () => {
  const [_userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    nickname: "",
    profileImage: "",
  });
  const [_objectURL, setObjectURL] = useState<string | null>(null);
  const [showModal, setSHowModal] = useState(false); // 탈퇴하기 모달
  const navigate = useNavigate();

  // 최초 진입 시 프로필 가져오기
  const { data, isLoading, isError, error } =
    useQuery<MemberProfileResponseDTO>({
      queryKey: ["member", "profile"],
      queryFn: async () => {
        const response = await getMemberProfile();
        if (!response) throw new Error("프로필 응답이 없습니다.");
        if (!response.isSuccess)
          throw new Error(response.message || "프로필 조회 실패");
        return response;
      },
    });
  useEffect(() => {
    if (!data) return;
    const m = data.result;
    setUserInfo({
      id: m.username,
      email: m.email,
      password: "",
      nickname: m.nickname,
      profileImage: m.profileImg,
    });
  }, [data]);
  if (isLoading || !_userInfo) return <LoadingModal />;
  if (isError) {
    const msg = error instanceof Error ? error.message : "알 수 없는 오류";
    return (
      <div className="p-6">
        프로필을 불러오지 못했습니다: {msg}
      </div>
    );
  }

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
    setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const _isModified = _userInfo.nickname.length >= 1;
  //   (_userInfo.password !== _initialUserInfo.password ||
  //     _userInfo.profileImage.preview !==
  //       _initialUserInfo.profileImage.preview ||
  //     _userInfo.profileImage.name !== _initialUserInfo.profileImage.name ||
  //     _userInfo.nickname !== _initialUserInfo.nickname);

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
            _nickname={_userInfo.nickname}
            _onNicknameChange={_handleNicknameChange}
          />
        </section>
      </div>

      <section className="flex w-[775px] items-center justify-between">
        <button
          className="text-subhead3 text-gray-600 underline underline-offset-3 cursor-pointer"
          onClick={() => setSHowModal(true)}
        >
          회원탈퇴
        </button>

        <button
          onClick={_handleSaveChanges}
          disabled={!_isModified}
          className={`px-8 py-5 rounded-md text-subhead3 font-medium
            ${
              _isModified
                ? "bg-primary-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-600"
            }`}
        >
          변경내용저장
        </button>
      </section>

      {showModal && (
        <AlertModal
          onClose={() => setSHowModal(false)}
          title="정말 탈퇴 하시겠습니까?"
          description="LXD에서 sohnjiahn@gmail.com 계정을 탈퇴하시겠습니까? 탈퇴 시, 계정은 삭제되며 정보는 복구되지 않습니다."
          confirmText="탈퇴하기"
          alertMessage="회원탈퇴가 완료되었습니다."
          onConfirm={() => navigate("/home")}
        />
      )}
    </div>
  );
};

export default EditProfilePage;
