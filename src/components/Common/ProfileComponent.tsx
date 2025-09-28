import type { memberProfile } from "../../utils/types/diary";
import Avatar from "./Avatar";

type Props = {
  member?: memberProfile | null;
  createdAt?: string;
  className?: string;
};

const ProfileComponent = ({
  member,
  createdAt = "",
  className = "",
}: Props) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {/* 프로필 이미지 */}
      <Avatar src={member?.profileImage} />

      <div className="flex flex-col min-w-0">
        {/* 사용자 이름 + 아이디 */}
        <div className="flex gap-2 items-center text-body2 min-w-0">
          <div className="font-semibold text-black truncate">
            {member?.nickname ?? "User"}
          </div>
          {member?.username && (
            <>
              <div className="w-px h-5 bg-gray-500" />
              <div className="text-gray-600 truncate">{member.username}</div>
            </>
          )}
        </div>

        {/* 날짜 */}
        {createdAt && (
          <div className="text-[12px] text-gray-500 mt-1 truncate">
            {createdAt}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
