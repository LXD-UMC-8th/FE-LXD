import ModeSelector from "../../components/ModeSelector";
import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";

const WritingPage = () => {
  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center gap-x-6 ">
        <PrevButton navigateURL="/diary" />
        <TitleHeader title="글쓰기" />
        <button className="rounded-[8px] bg-[var(--Primary-500,#4170FE)] text-white hover:bg-[var(--Primary-600,#3259D9)] p-3 transition-all duration-300 cursor-pointer">
          등록하기
        </button>
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch w-full">
        {/*자유글 / 질문글 구분 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5">
          <ModeSelector title1="자유글" title2="질문글" />
          질문글 / 자유글 선택
        </div>

        {/*글쓰기 영역*/}

        <div className="flex items-center gap-x-2 mb-2">
          <label className="text-[var(--Gray-700,#4B5563)]">태그</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="태그를 입력하세요."
          />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
