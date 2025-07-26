const CommonComponentSkeleton = () => {
  return (
    <div className="w-260 h-72 pt-8 pr-4 pb-8 pl-8 gap-3 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] bg-white">
      <div className="flex animate-pulse justify-between gap-6 mt-6">
        <div className="w-full flex flex-col gap-5">
          <div className="w-3/5 h-8 rounded-[10px] bg-gray-300" />
          <div className="w-full flex flex-col gap-3">
            <div className="w-4/5 h-4 rounded-[10px] bg-gray-300" />
            <div className="w-4/5 h-4 rounded-[10px] bg-gray-300" />
            <div className="w-4/5 h-4 rounded-[10px] bg-gray-300" />
          </div>
        </div>
        <div className="w-40 h-40 bg-gray-300 rounded-[10px] flex-shrink-0" />
      </div>
    </div>
  );
};

export default CommonComponentSkeleton;
