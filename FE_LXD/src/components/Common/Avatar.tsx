interface AvatarProps {
  src?: string;       // 사용자 프로필 이미지
  alt?: string;       // 대체 텍스트
  size?: string;      // tailwind 사이즈 클래스 (기본값 "w-10 h-10")
  className?: string; // 추가 커스텀 클래스
}

const Avatar = ({
  src,
  alt = "profile",
  size = "w-10 h-10",
  className = "",
}: AvatarProps) => {
  return (
    <img
      src={src && src.trim() !== "" ? src : "/images/profileimage.svg"}
      alt={alt}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/images/profileimage.svg";
      }}
      className={`${size} rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;
