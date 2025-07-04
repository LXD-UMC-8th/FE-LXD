import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";

const WritingPage = () => {
  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/diary" />
        <TitleHeader title="글쓰기" />
      </div>
    </div>
  );
};

export default WritingPage;
