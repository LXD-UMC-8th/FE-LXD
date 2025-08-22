import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Common/TitleHeader";
import AccountInfo from "../../components/NavBar/EditProfile/AccountInfo";
import ProfileInfo from "../../components/NavBar/EditProfile/ProfileInfo";
import AlertModal from "../../components/Common/AlertModal";
import {
  deleteMemberProfileImage,
  getMemberProfile,
  patchMemberProfile,
} from "../../apis/members";
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
  const [userInfo, setUserInfo] = useState<EditProfileState>({
    id: "",
    email: "",
    password: "**********",
    nickname: "",
    profileImgUrl: "",
    profileImgFile: null,
    profileImgPreview: null,
    profileImgAction: "keep",
  });
  const [objectURL, setObjectURL] = useState<string | null>(null);
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
    mutationFn: async () => {
      const nextNickname = userInfo.nickname.trim();
      const prevNickname = data?.result.nickname ?? "";

      const needDelete = userInfo.profileImgAction === "remove" && hadServerImg;
      const needUpload = userInfo.profileImgAction === "upload";
      const needNickUpd = nextNickname !== prevNickname;

      // 1) 이미지 삭제(필요한 경우에만)
      if (needDelete) {
        await deleteMemberProfileImage();
      }

      // 2) 닉네임 변경이나 업로드가 있으면 patch
      if (needUpload || needNickUpd) {
        const res = await patchMemberProfile({
          nickname: nextNickname,
          profileImg: needUpload ? userInfo.profileImgFile : null, // 업로드만 전송
        });

        if (!res?.isSuccess) {
          throw new Error(res?.message || "프로필 저장 실패");
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.member, QUERY_KEY.profile] });
      alert(t.changeProfile);

      if (objectURL) {
        URL.revokeObjectURL(objectURL);
        setObjectURL(null);
      }
      setUserInfo((prev) => ({
        ...prev,
        profileImgFile: null,
        profileImgPreview: null,
        profileImgAction: "keep",
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
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [objectURL]);

  // 화면에 보여줄 이미지: 새 미리보기 > 서버 URL > 기본 플레이스홀더
  const _displayImage = useMemo(() => {
    if (userInfo.profileImgAction === "upload") {
      return userInfo.profileImgPreview ?? "";
    }
    if (userInfo.profileImgAction === "remove") {
      return "";
    }
    return userInfo.profileImgUrl ?? "";
  }, [
    userInfo.profileImgAction,
    userInfo.profileImgPreview,
    userInfo.profileImgUrl,
  ]);

  // 파일명: 업로드 중이면 파일명, 아니면 서버에서 추출
  const _serverFilename = useMemo(
    () => extractFilenameFromUrl(userInfo.profileImgUrl),
    [userInfo.profileImgUrl]
  );
  const _profileName =
    userInfo.profileImgAction === "upload"
      ? userInfo.profileImgFile?.name ?? ""
      : _serverFilename;

  if (isLoading || !userInfo) return <LoadingModal />;
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

    if (objectURL) {
      URL.revokeObjectURL(objectURL);
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
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
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
    userInfo.profileImgAction === "upload" ||
    (userInfo.profileImgAction === "remove" && hadServerImg);

  const _isModified =
    userInfo.nickname.trim() !== (data?.result.nickname ?? "") ||
    profileChanged;

  const _handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!_isModified) return;
    if (userInfo.nickname.trim().length === 0) {
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
        <TitleHeader title={t.editProfileHeader} />
      </section>

      <div className="space-y-3">
        <section className="flex w-[775px]">
          <AccountInfo
            _id={userInfo.id}
            _email={userInfo.email}
            _password={userInfo.password}
            _onChangePw={_handleChangePw}
          />
        </section>

        <section className="flex w-[775px]">
          <ProfileInfo
            _profilePreview={_displayImage}
            _profileName={_profileName}
            _onImageChange={_handleImageChange}
            _onRemoveImage={_handleRemoveImage}
            _nickname={userInfo.nickname}
            _onNicknameChange={_handleNicknameChange}
          />
        </section>
      </div>

      <section className="flex w-[775px] items-center justify-between">
        <button
          className="text-subhead3 text-gray-600 underline underline-offset-3 cursor-pointer"
          onClick={() => setSHowModal(true)}
        >
          {t.deleteAccount}
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
          {_isSaving ? t.Loading : t.SaveChange}
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
