import { Link } from "react-router-dom";

const DiaryHeader = () => {
  return (
    <div>
      <div className="h-45 w-260 rounded-t-[12px] rounded-b-none bg-[var(--Primary-500,#4170FE)] ">
        <div className="grid grid-cols-[3fr_1fr] h-1/2 px-5">
          <div>
            <div className="pt-15 pb-2 text-white text-xl font-bold grid grid-rows-2">
              <span>user의</span>
              <span>다이어리</span>
            </div>
            <div>
              <p className="text-white text-[16px] font-normal leading-[145%] flex gap-3">
                <span className="inline">다이어리 10 </span>
                <span className="hidden custom800:inline">| 모국어 🇰🇷</span>
                <span className="hidden custom980:inline">| 친구 수 20</span>
              </p>
            </div>
          </div>
          <div className="pt-20 flex justify-end items-center gap-x-6 relative">
            {/* Link is placed on top */}
            <Link
              to="/mydiary/writing"
              className="w-25 z-10 rounded-[8px] bg-[#CFDFFF] hover:bg-[#AFCBFF] shadow-[4px_4px_10px_0px_#4170FE] p-3 flex flex-row gap-3 transition-all duration-300
              mt-5 items-center justify-center"
            >
              <img src="/images/pencil.svg" alt="pencil.img" />
              글쓰기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryHeader;
