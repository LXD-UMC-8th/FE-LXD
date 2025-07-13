import ModeSelector from "../../components/ModeSelector";
import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";
import EnrollWrapper from "../../components/WritingPage/EnrollWrapper";
import WritingEditor from "../../components/WritingPage/WritingEditor";

const WritingPage = () => {
  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center gap-x-6 ">
        <PrevButton navigateURL="/diary" />
        <TitleHeader title="글쓰기" />
        <div className="ml-auto mr-6">
          <EnrollWrapper />
        </div>
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch w-full">
        {/*자유글 / 질문글 구분 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5">
          <ModeSelector title1="자유글" title2="질문글" />
          질문글 / 자유글 선택
        </div>

        <div className="w-full mt-5 ">
          {/*글쓰기 영역*/}
          <WritingEditor />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
