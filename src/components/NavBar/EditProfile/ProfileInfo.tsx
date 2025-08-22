import { useRef } from "react";
import FormInput from "../../Login/FormInput";
import { translate } from "../../../context/translate";
import { useLanguage } from "../../../context/LanguageProvider";
import Avatar from "../../Common/Avatar";
import { isNicknameValid } from "../../../utils/validate";

interface ProfileInfoProps {
  profilePreview?: string | undefined;
  profileName: string | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  nickname: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInfo = ({
  profilePreview,
  profileName,
  onImageChange,
  onRemoveImage,
  nickname,
  onNicknameChange,
}: ProfileInfoProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { language } = useLanguage();
  const t = translate[language];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e);
  };

  return (
    <div className="flex flex-col w-full rounded-md pt-7 pb-7 pl-10 pr-10 bg-white space-y-7">
      <h2 className="text-subhead2 font-semibold">{t.profileInfo}</h2>

      <div className="space-y-5">
        <h4 className="text-subhead3 font-medium">{t.profileImg}</h4>

        <div className="flex items-center justify-between gap-12">
          {/* 동그라미 */}
          <div className="relative w-30 h-30">
            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
              {/* {profilePreview ? (
                <img
                  src={profilePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/images/profileimage.svg"
                  alt="기본 프로필 이미지"
                  className="w-full h-full object-cover"
                />
              )} */}
              <Avatar size="w-30 h-30" src={profilePreview} />
            </div>
            {profilePreview && (
              <button
                type="button"
                onClick={onRemoveImage}
                title="프로필 이미지 삭제"
                aria-label="프로필 이미지 삭제"
                className="bg-[url('/images/x_icon.svg')]
                bg-no-repeat bg-center bg-contain absolute top-1 right-1 w-5 h-5  
                 flex items-center justify-center cursor-pointer"
              >
                <span className="sr-only">프로필 이미지 삭제</span>
              </button>
            )}
          </div>

          <div className="flex-1 items-center space-y-2 gap-2">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <input
                  readOnly
                  value={profileName ? profileName : ""}
                  placeholder={
                    profileName ? profileName : t.selectFilePlaceholder
                  }
                  className="w-full h-14 px-8 py-4 border rounded-md 
              border-gray-300 bg-gray-50 text-gray-500 text-body1 focus:outline-none"
                />
              </div>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-14 px-8 bg-black text-white rounded cursor-pointer"
              >
                {t.selectFile}
              </button>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-600 text-sm">{t.imgSize}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="space-y-2">
        <FormInput
          name={t.nickname}
          placeholder={nickname ? nickname : t.nicknamePlaceholder}
          input={nickname}
          onChange={onNicknameChange}
        />

        {!isNicknameValid(nickname) ? (
          <span className="text-red-500 text-sm mb-3">
            {t.nicknameConditionToast}
          </span>
        ) : (
          <span className="text-gray-600 text-sm mb-3">
            {t.nicknameConditionToast}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
