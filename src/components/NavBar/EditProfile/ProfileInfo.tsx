import { useRef } from "react";
import FormInput from "../../Login/FormInput";

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    _onImageChange(e);
  };

  return (
    <div className="flex flex-col w-full rounded-md pt-7 pb-7 pl-10 pr-10 bg-white space-y-7">
      <h2 className="text-subhead2 font-semibold">프로필 정보</h2>

      <div className="space-y-5">
        <h4 className="text-subhead3 font-medium">프로필 이미지</h4>

        <div className="flex items-center justify-between gap-12">
          {/* 동그라미 */}
          <div className="relative w-30 h-30">
            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
              {_profilePreview ? (
                <img
                  src={_profilePreview}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {_profilePreview && (
              <button
                type="button"
                onClick={_onRemoveImage}
                className="bg-[url('/images/x_icon.svg')]
                bg-no-repeat bg-center bg-contain absolute top-1 right-1 w-5 h-5  
                 flex items-center justify-center cursor-pointer"
              />
            )}
          </div>

          <div className="flex-1 items-center space-y-2 gap-2">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <input
                  readOnly
                  value={_profileName ? _profileName : ""}
                  placeholder={
                    _profileName ? _profileName : "파일을 선택해주세요"
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
                파일선택
              </button>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-600 text-sm">
                최대 (제한용량)MB의 이미지 파일을 업로드 해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="space-y-2">
        <FormInput
          name="닉네임"
          placeholder={_nickname ? _nickname : "닉네임을 입력해주세요"}
          input={_nickname}
          onChange={_onNicknameChange}
        />
        <p className="text-gray-600 text-sm mb-3">
          1자 이상 20자 이내로 입력해주세요.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
