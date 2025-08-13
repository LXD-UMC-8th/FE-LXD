interface AvatarProps {
  src?: string; // 사용자 프로필 이미지
  alt?: string; // 대체 텍스트
  size?: string; // tailwind 사이즈 클래스 (기본값 "w-10 h-10")
  className?: string; // 추가 커스텀 클래스
  onClick?: () => void; // ✅ 클릭 이벤트 핸들러 추가
}

const Avatar = ({
  src,
  alt = "profile",
  size = "w-10 h-10",
  className = "",
  onClick, // ✅ 받아오기
}: AvatarProps) => {
  return (
    <img
      src={src && src.trim() !== "" ? src : "/images/profileimage.svg"}
      alt={alt}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/images/profileimage.svg";
      }}
      onClick={onClick} // ✅ 클릭 핸들러 적용
      className={` ${className} ${size} rounded-full object-cover ${
        onClick ? "cursor-pointer" : ""
      }`}
    />
  );
};

export default Avatar;
