const UserListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px] animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-[#E5E5E5]"
        >
          {/* 유저 정보 스켈레톤 */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded-md w-16" />
              <div className="h-3 bg-gray-200 rounded-md w-12" />
            </div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className="w-12 h-6 bg-gray-300 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default UserListSkeleton;
