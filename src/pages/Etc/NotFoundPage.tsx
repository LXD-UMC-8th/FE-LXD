import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const NotFoundPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div className="flex flex-col bg-white items-center justify-center min-h-screen bg-gray-50">
      <div className="mb-6">
        <img
          src="/images/NotFoundIcon.svg"
          alt="404 Icon"
          className="w-20 h-20"
        />
      </div>

      {/* 404 제목 */}
      <h1 className="text-2xl font-bold mb-2 text-headline1">404 ERROR</h1>

      {/* 설명 */}
      <p className="text-center text-black text-m leading-relaxed mb-8 mt-2">
        {t.NotFoundComment1}
        <br />
        {t.NotFoundComment2}
        <br />
        {t.NotFoundComment3}
      </p>

      {/* 버튼 */}
      <button
        onClick={() => (window.location.href = "/feed")} // 피드 페이지로 이동
        className="text-m font-medium text-black border-b border-gray-700 hover:text-primary-500 hover:border-primary-500 transition-colors cursor-pointer"
      >
        {t.BackToFeed}
      </button>
    </div>
  );
};

export default NotFoundPage;