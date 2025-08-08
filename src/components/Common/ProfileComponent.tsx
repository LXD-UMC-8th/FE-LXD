import type { member } from "../../utils/types/correction";

const ProfileComponent = ({
  member,
  createdAt,
}: {
  member: member;
  createdAt: string;
}) => {
  return (
    <div className="flex gap-2">
      {/* 프로필 이미지 */}
      <img
        src={member.profileImageUrl}
        alt="프로필"
        className="w-10 h-10 bg-gray-300 rounded-full"
      />

      <div className="flex flex-col">
        {/* 사용자 이름 + 아이디 */}
        <div className="flex gap-2 text-body2">
          <div className="font-semibold text-black">{member.nickname}</div>
          <div className="w-px h-5 bg-gray-500" />
          <div className="text-gray-600">{member.username}</div>
        </div>

        {/* 날짜 */}
        <div className="text-[12px] text-gray-500 mt-1">{createdAt}</div>
      </div>
    </div>
  );
};

export default ProfileComponent;
