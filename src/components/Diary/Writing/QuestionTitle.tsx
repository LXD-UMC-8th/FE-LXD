import { useState } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
interface QuestionTitleProps {
  _titleName: string;
  onClick?: () => void;
}

const QuestionTitle = ({ _titleName, onClick }: QuestionTitleProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  const [disabled, setDisabled] = useState(false);

  //연속된 새로고침 방지를 위함
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setDisabled(true);
    setTimeout(() => setDisabled(false), 2000);

    //Question재생성하기
  };

  return (
    <div className="w-full flex items-center justify-between rounded-lg gap-5">
      <div className="w-full bg-gray-200 rounded-md p-3 mt-5">
        {!_titleName && <div>{t.questionGeneratorButtonText} </div>}
        {_titleName && <div>{_titleName}</div>}
      </div>
      <div>
        <button
          className="group w-30 mt-5 p-2 h-12 flex items-center gap-1  border border-gray-300 hover:border-gray-700 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition cursor-pointer
          disabled:cursor-not-allowed disabled:hover:bg-white disabled:border-gray-300 disabled:active:outline-none
          active:outline-1 focus:outline-gray-500"
          onClick={handleClick}
          disabled={disabled}
        >
          <div className="relative h-5 flex-shrink-0">
            <div className="left-0 w-5 h-5">
              <img
                src="/images/refreshvector.svg"
                alt="refreshICON"
                className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
              />
              <img
                src="/images/refreshvectorhover.svg"
                alt="refreshICON"
                className="absolute w-5 h-5 object-contain transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
          <span>{t.refreshButtonText}</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionTitle;
