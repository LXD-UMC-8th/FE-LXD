const RequestSkeleton = ({ count = 2 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-4 bg-[#EDEEF0] rounded-2xl p-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 border bg-[#FFFFFF] border-gray-200 rounded-xl px-4 py-3 shadow-sm h-auto"
        >
          <div className="flex items-center gap-3">
            {/* 프로필 이미지 */}
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            {/* 이름/닉네임 */}
            <div className="flex flex-col gap-2">
              <div className="w-16 h-4 bg-gray-300 rounded-md" />
              <div className="w-24 h-3 bg-gray-200 rounded-md" />
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex flex-row flex-wrap gap-2 justify-end md:justify-normal items-center w-full md:w-auto">
            <div className="w-16 h-8 bg-gray-300 rounded-md" />
            <div className="w-16 h-8 bg-gray-200 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestSkeleton;
