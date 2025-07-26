const ProfileViewSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow animate-pulse">
      {/* 상단 프로필 영역 */}
      <div className="p-8 pb-6 flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-300" />
          <div className="flex flex-col gap-3">
            <div className="w-32 h-6 bg-gray-300 rounded-md" />
            <div className="w-24 h-5 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-md" />
      </div>

      {/* 버튼 영역 */}
      <div className="px-8 mb-6 flex gap-4">
        <div className="flex-1 h-10 bg-gray-300 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gray-200 w-full mb-5" />

      {/* 최근 일기 헤더 */}
      <div className="px-8 flex justify-between items-center mb-4">
        <div className="w-28 h-5 bg-gray-300 rounded-md" />
        <div className="w-12 h-4 bg-gray-200 rounded-md" />
      </div>

      {/* 다이어리 목록 */}
      <div className="px-8 pb-8 flex flex-col gap-5">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-5 rounded-xl border border-gray-200 bg-gray-50"
          >
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex gap-3 items-center mb-2">
                <div className="h-6 w-6 bg-gray-300 rounded-md" />
                <div className="w-40 h-5 bg-gray-300 rounded-md" />
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-md" />
              <div className="w-11/12 h-4 bg-gray-200 rounded-md" />
              <div className="w-10/12 h-4 bg-gray-200 rounded-md" />
              <div className="flex gap-5 mt-3">
                <div className="w-12 h-3 bg-gray-300 rounded-md" />
                <div className="w-12 h-3 bg-gray-300 rounded-md" />
                <div className="w-12 h-3 bg-gray-300 rounded-md" />
              </div>
            </div>
            <div className="w-36 h-28 bg-gray-300 rounded-xl ml-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileViewSkeleton;
