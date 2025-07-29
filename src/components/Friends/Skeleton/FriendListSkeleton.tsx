const FriendListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <ul className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx} className="flex items-center gap-4">
          {/* 프로필 이미지 스켈레톤 */}
          <div className="w-12 h-12 bg-gray-300 rounded-full" />

          {/* 이름, 닉네임 스켈레톤 */}
          <div className="flex flex-col gap-2 w-2/3">
            <div className="h-4 bg-gray-300 rounded-md w-3/4" />
            <div className="h-3 bg-gray-300 rounded-md w-1/2" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FriendListSkeleton;
