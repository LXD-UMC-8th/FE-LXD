const CommonComponentSkeleton = () => {
  return (
    <div className="px-4 w-full h-72 pt-8 pr-4 pb-8 pl-8 gap-3 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.1)] bg-white">
      <div className="flex animate-pulse justify-between gap-6 mt-6">
        <div className="w-full flex flex-col gap-5">
          <div className="w-3/5 h-8 rounded-[10px] bg-gray-300" />
          <div className="w-full flex flex-col gap-3">
            <div className="w-3/5 h-4 rounded-[10px] bg-gray-300" />
            <div className="w-3/5 h-4 rounded-[10px] bg-gray-300" />
            <div className="w-3/5 h-4 rounded-[10px] bg-gray-300" />
          </div>
        </div>
        <div className="hidden custom980:block w-40 h-43 bg-gray-300 rounded-[10px] -translate-x-[10px]" />{" "}
      </div>
    </div>
  );
};

export default CommonComponentSkeleton;
