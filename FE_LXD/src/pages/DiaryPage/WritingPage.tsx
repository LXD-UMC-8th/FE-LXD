import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";

const WritingPage = () => {
  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/diary" />
        <TitleHeader title="글쓰기" />
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch ">
        {/*자유글 / 질문글 구분 영역*/}

        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5">
          <div className="flex items-center gap-x-2 mb-2">
            <button className="rounded-[5px] bg-[#DDE0E4] cursor-pointer">
              질문글
            </button>
            <button className="rounded-[5px] bg-[#DDE0E4] cursor-pointer">
              자유글
            </button>
          </div>
          질문글 / 자유글 선택
        </div>

        {/*글쓰기 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5">
          대충 내용 넣는 부분{" "}
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
