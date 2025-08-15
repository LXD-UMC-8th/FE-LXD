import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import AccountInfo from "../../components/NavBar/EditProfile/AccountInfo";
import ProfileInfo from "../../components/NavBar/EditProfile/ProfileInfo";
import AlertModal from "../../components/Common/AlertModal";
import { getMemberProfile, patchMemberProfile } from "../../apis/members";
import type { MemberProfileResponseDTO } from "../../utils/types/member";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingModal from "../../components/Common/LoadingModal";
import { extractFilenameFromUrl } from "../../utils/profileFile";
import { QUERY_KEY } from "../../constants/key";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

type ProfileImgAction = "keep" | "upload" | "remove";

type EditProfileState = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  profileImgUrl: string;
  profileImgFile: File | null;
  profileImgPreview: string | null;
  profileImgAction: ProfileImgAction;
};

const EditProfilePage = () => {
  const [_userInfo, setUserInfo] = useState<EditProfileState>({
    id: "",
    email: "",
    password: "**********",
    nickname: "",
    profileImgUrl: "",
    profileImgFile: null,
    profileImgPreview: null,
    profileImgAction: "keep",
  });
  const [_objectURL, setObjectURL] = useState<string | null>(null);
  const [showModal, setSHowModal] = useState(false); // 탈퇴하기 모달
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { language } = useLanguage();
  const t = translate[language];

  // 프로필 조회
  const { data, isLoading, isError, error } =
    useQuery<MemberProfileResponseDTO>({
      queryKey: [QUERY_KEY.member, QUERY_KEY.profile],
      queryFn: async () => {
        const response = await getMemberProfile();
        if (!response) throw new Error(t.notProfileResponse);
        if (!response.isSuccess)
          throw new Error(response.message || t.notProfileResponse);
        return response;
      },
    });

  // 저장 뮤테이션
  const { mutate: _saveProfile, isPending: _isSaving } = useMutation({
    mutationFn: () =>
      patchMemberProfile({
        nickname: _userInfo.nickname.trim(),
        profileImg:
          _userInfo.profileImgAction === "upload"
            ? _userInfo.profileImgFile
            : null,
        removeProfileImg: _userInfo.profileImgAction === "remove",
      }),
    onSuccess: (_res) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.member, QUERY_KEY.profile] });
      alert(t.changeProfile);

      // 미리보기 정리 및 로컬 상태 리셋(파일은 비움, 서버 URL 반영은 query 성공 후 useEffect가 채워줌)
      if (_objectURL) {
        URL.revokeObjectURL(_objectURL);
        setObjectURL(null);
      }
      setUserInfo((prev) => ({
        ...prev,
        profileImgFile: null,
        profileImgPreview: null,
      }));
    },
    onError: () => {
      alert(t.errorduringedit);
    },
  });

  // 최초 로드시 프로필 상태 채우기
  useEffect(() => {
    if (!data) return;
    const m = data.result;
    setUserInfo((prev) => ({
      ...prev,
      id: m.username,
      email: m.email,
      nickname: m.nickname,
      profileImgUrl: m.profileImg,
      profileImgAction: "keep",
    }));
  }, [data]);

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (_objectURL) URL.revokeObjectURL(_objectURL);
    };
  }, [_objectURL]);

  // 화면에 보여줄 이미지: 새 미리보기 > 서버 URL > 기본 플레이스홀더
  const _displayImage = useMemo(() => {
    if (_userInfo.profileImgAction === "upload") {
      return _userInfo.profileImgPreview ?? "";
    }
    if (_userInfo.profileImgAction === "remove") {
      return "";
    }
    return _userInfo.profileImgUrl ?? "";
  }, [
    _userInfo.profileImgAction,
    _userInfo.profileImgPreview,
    _userInfo.profileImgUrl,
  ]);

  // 파일명: 업로드 중이면 파일명, 아니면 서버에서 추출
  const _serverFilename = useMemo(
    () => extractFilenameFromUrl(_userInfo.profileImgUrl),
    [_userInfo.profileImgUrl]
  );
  const _profileName =
    _userInfo.profileImgAction === "upload"
      ? _userInfo.profileImgFile?.name ?? ""
      : _serverFilename;

  if (isLoading || !_userInfo) return <LoadingModal />;
  if (isError) {
    const msg = error instanceof Error ? error.message : t.undefinedErrorOccur;
    return (
      <div className="p-6">
        {t.donotrenderprofile}: {msg}
      </div>
    );
  }

  const _handleChangePw = () => {
    navigate("/home/signup/change-pw");
  };

  const _handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files?.[0] ?? null;

    if (_objectURL) {
      URL.revokeObjectURL(_objectURL);
      setObjectURL(null);
    }

    if (_file) {
      const url = URL.createObjectURL(_file);
      setObjectURL(url);
      setUserInfo((prev) => ({
        ...prev,
        profileImgFile: _file,
        profileImgPreview: url,
        profileImgAction: "upload",
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        profileImgFile: null,
        profileImgPreview: null,
      }));
    }
  };

  const _handleRemoveImage = () => {
    if (_objectURL) {
      URL.revokeObjectURL(_objectURL);
      setObjectURL(null);
    }
    setUserInfo((prev) => ({
      ...prev,
      profileImgFile: null,
      profileImgPreview: null,
      profileImgAction: "remove",
    }));
  };

  const _handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const hadServerImg = Boolean(data?.result.profileImg);

  const profileChanged =
    _userInfo.profileImgAction === "upload" ||
    (_userInfo.profileImgAction === "remove" && hadServerImg);

  const _isModified =
    _userInfo.nickname.trim() !== (data?.result.nickname ?? "") ||
    profileChanged;

  const _handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!_isModified) return;
    if (_userInfo.nickname.trim().length === 0) {
      alert(t.putInNick);
      return;
    }
    _saveProfile();
  };

  return (
    <div
      className="flex flex-col min-h-screen 
    items-center justify-center space-y-10 px-4"
    >
      <section className="flex flex-col w-[775px] items-left">
        <TitleHeader title={t.profileEdit} />
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
            _profilePreview={_displayImage}
            _profileName={_profileName}
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
          disabled={!_isModified || _isSaving}
          className={`px-8 py-5 rounded-md text-subhead3 font-medium
            ${
              _isModified && !_isSaving
                ? "bg-primary-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-600"
            }`}
        >
          {_isSaving ? t.saving : t.SaveChange}
        </button>
      </section>

      {showModal && (
        <AlertModal
          onClose={() => setSHowModal(false)}
          title={t.sureLeave}
          description={t.LeaveNoti}
          confirmText={t.ToLeave}
          alertMessage={t.CompleteLeave}
          onConfirm={() => navigate("/home")}
        />
      )}
    </div>
  );
};

export default EditProfilePage;
