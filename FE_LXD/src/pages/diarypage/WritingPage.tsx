import PrevButton from "../../components/PrevButton";

const WritingPage = () => {
  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center gap-x-6">
        <PrevButton navigateURL="/diary" />
        <h1 className="text-[32px] font-extrabold leading-[1.4] tracking-[-0.64px]">
          글쓰기
        </h1>
      </div>
    </div>
  );
};

export default WritingPage;
