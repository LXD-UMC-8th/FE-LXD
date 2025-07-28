import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";

interface EnrollButtonProps {
  onClick?: () => void;
}

const EnrollButton = ({ onClick }: EnrollButtonProps) => {
  const { language } = useLanguage();
  const t = translate[language];
  return (
    <button
      className="rounded-[8px] bg-[var(--Primary-500,#4170FE)] text-white hover:bg-[var(--Primary-600,#3259D9)] p-3 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {t.enrollButtonText}
    </button>
  );
};

export default EnrollButton;
