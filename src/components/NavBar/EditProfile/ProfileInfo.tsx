import { useRef } from "react";
import FormInput from "../../Login/FormInput";
import { translate } from "../../../context/translate";
import { useLanguage } from "../../../context/LanguageProvider";

interface ProfileInfoProps {
  _profilePreview: string | null;
  _profileName: string | undefined;
  _onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  _onRemoveImage: () => void;
  _nickname: string;
  _onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInfo = ({
  _profilePreview,
  _profileName,
  _onImageChange,
  _onRemoveImage,
  _nickname,
  _onNicknameChange,
}: ProfileInfoProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { language } = useLanguage();
  const t = translate[language];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    _onImageChange(e);
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
              {_profilePreview ? (
                <img
                  src={_profilePreview}
                  alt="프로필 위미지"
                  className="w-full h-full object-cover"
                />
              ) : <img
                  src="/images/profileimage.svg"
                  alt="기본 프로필 이미지"
                  className="w-full h-full object-cover"
                />}
            </div>
            {_profilePreview && (
              <button
                type="button"
                onClick={_onRemoveImage}
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
                  value={_profileName ? _profileName : ""}
                  placeholder={
                    _profileName ? _profileName : t.selectFilePlaceholder
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
              <p className="text-gray-600 text-sm">
                {t.imgSize}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="space-y-2">
        <FormInput
          name={t.nickname}
          placeholder={_nickname ? _nickname : t.nicknamePlaceholder}
          input={_nickname}
          onChange={_onNicknameChange}
        />
        <p className="text-gray-600 text-sm mb-3">
          {t.nicknameConditionToast}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
