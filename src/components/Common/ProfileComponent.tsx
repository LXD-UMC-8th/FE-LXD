import React from "react";
import type { member } from "../../utils/types/correction";

type Props = {
  member?: member | null;
  createdAt?: string;
  size?: number;
  className?: string;
};

const FALLBACK_IMG = "/images/profileImage.svg";

const ProfileComponent: React.FC<Props> = ({
  member,
  createdAt = "",
  size = 40,
  className = "",
}) => {
  const imgSrc =
    member?.profileImageUrl
      ? member.profileImageUrl
      : FALLBACK_IMG;

  const nickname = member?.nickname ?? "User";
  const username = member?.username ?? "";

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {/* 프로필 이미지 */}
      <img
        src={imgSrc}
        alt="프로필"
        width={size}
        height={size}
        className="rounded-full object-cover bg-gray-200"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
        }}
      />

      <div className="flex flex-col min-w-0">
        {/* 사용자 이름 + 아이디 */}
        <div className="flex items-center gap-2 text-body2 min-w-0">
          <div className="font-semibold text-black truncate">{nickname}</div>
          {username && (
            <>
              <div className="w-px h-5 bg-gray-300" />
              <div className="text-gray-600 truncate">{username}</div>
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
