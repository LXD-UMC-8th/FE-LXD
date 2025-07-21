interface QuestionTitleProps {
  onClick?: () => void;
}

const QuestionTitle = ({ onClick }: QuestionTitleProps) => {
  return (
    <div className="w-full flex items-center justify-between rounded-lg gap-5">
      <div className="w-full bg-gray-200 rounded-md p-3 mt-5">
        질문글 생성기
      </div>
      <div>
        <button
          className="group w-25 mt-5 p-2 h-12 flex items-center gap-1  border border-gray-300 hover:border-gray-700 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer
                  active:outline-1 focus:outline-gray-500"
          onClick={onClick}
        >
          {/* 정상 아이콘: 기본에선 보이고, hover 시 숨김 */}
          <div className="relative h-5 flex-shrink-0">
            <div className="left-0 w-5 h-5">
              <img
                src="/images/refreshvector.svg"
                alt="새로고침 아이콘"
                className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
              />
              <img
                src="/images/refreshvectorhover.svg"
                alt="새로고침 아이콘"
                className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
          <span>새로고침</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionTitle;
