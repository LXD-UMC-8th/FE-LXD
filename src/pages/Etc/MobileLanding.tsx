import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

interface Props {
  onContinue: () => void;
}

const MobileLanding = ({ onContinue }: Props) => {
  const { language } = useLanguage();
  
  
  const t = translate[language] || Object.values(translate)[0];

  const handleForcePCVersion = () => {
    onContinue(); 
  };

  
  if (!t) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-white px-6 relative text-center">
      
      {/* 1. 아이콘 영역 */}
      <div className="mb-8 mt-[-10vh]"> 
        
        <img
          src="/images/mobileimg.svg"
          alt="데스크탑 아이콘"
          className="w-40 h-40 object-contain mx-auto" 
        />
      </div>

      {/* 2. 메인 텍스트 영역 */}
      <div className="text-gray-800 text-lg font-medium leading-relaxed mb-4 break-keep">
        {t.MobileLanding_MainText}
      </div>
      <div className="text-gray-600 text-base leading-relaxed break-keep">
        {t.MobileLanding_SubText}
      </div>

      {/* 3. 하단 링크 영역 */}
      <div className="absolute bottom-16 w-full px-6"> 
        <p className="text-xs text-gray-500 leading-normal">
          {t.MobileLanding_BottomText_Part1}{" "}
          <button 
            onClick={handleForcePCVersion} 
            className="text-gray-700 underline font-semibold cursor-pointer p-0 m-0 border-none bg-transparent"
          >
            {t.MobileLanding_BottomText_Link}
          </button>{" "}
          {t.MobileLanding_BottomText_Part2}
          <br />
          {t.MobileLanding_BottomText_Part3}
        </p>
      </div>

    </div>
  );
};

export default MobileLanding;