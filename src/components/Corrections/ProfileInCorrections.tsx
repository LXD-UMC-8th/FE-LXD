import type { CorrectionsMemberDTO } from "../../utils/types/member";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import Avatar from "../Common/Avatar";

interface Props {
  member?: CorrectionsMemberDTO;
  createdAt: string;
}

const ProfileInCorrections = ({ member, createdAt }: Props) => {
  const { language } = useLanguage();
  const t = translate[language];
  return (
    <>
      <div className="flex items-center justify-between gap-1 p-1">
        {/* 왼쪽: 프로필 정보 */}
        <div className="flex items-center gap-2">
          {/* 프로필 사진 */}
          <Avatar src={member?.profileImageUrl}/>

          {/* 사용자 이름 + 아이디 */}
          <div className="flex gap-2 items-center">
            <div className="text-body1 font-medium">{member?.nickname}</div>
            <div className="w-px h-5 bg-gray-500" />
            <div className="text-body1 text-gray-600">@{member?.username}</div>
          </div>
        </div>

        {/* 작성 시간 */}
        <div className="text-body2 text-gray-500">{createdAt}</div>
      </div>
    </>
  );
};

export default ProfileInCorrections;
