import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const LoadingModal = () => {
  const { language } = useLanguage();
  const t = translate[language];
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-100 h-50 flex flex-col items-center justify-center">
        <div
          className="
            w-10 h-10 mb-4 border-4 border-gray-200
            border-t-blue-500 rounded-full animate-spin
          "
        />
        <p className="font-bold text-2xl">{t.PageLoading}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
