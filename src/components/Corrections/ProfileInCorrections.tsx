import type { CorrectionsMemberDTO } from "../../utils/types/member"

interface Props {
  member: CorrectionsMemberDTO;
  createdAt: string;
}

const ProfileInCorrections = ({ member, createdAt}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between gap-1 p-1">
        {/* 왼쪽: 프로필 정보 */}
        <div className="flex items-center gap-2">
          {/* 프로필 사진 */}
          <img 
            src={member.profileImageUrl}
            alt="프로필"
            className="w-9 h-9 rounded-full bg-gray-300"
          />

          {/* 사용자 이름 + 아이디 */}
          <div className="flex gap-2 items-center">
              <div className="text-body1 font-medium">{member.nickname}</div>
              <div className="w-px h-5 bg-gray-500"/>
              <div className="text-body1 text-gray-600">{member.userId}</div>
          </div>
        </div>
        
        {/* 작성 시간 */}
        <div className="text-body2 text-gray-500">
          {createdAt}
        </div>
      </div>
    </>
  )
}

export default ProfileInCorrections
