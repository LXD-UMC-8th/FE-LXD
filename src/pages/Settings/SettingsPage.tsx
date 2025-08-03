import { useState } from "react";
import TitleHeader from "../../components/Common/TitleHeader";
import { Language, useLanguage } from "../../context/LanguageProvider";

interface LanguageOption {
  value: Language;
  label: string;
}

const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false); // 시스템 언어 토글 설정관리
  const options: LanguageOption[] = [
    { value: Language.KOREAN, label: "한국어" },
    { value: Language.ENGLISH, label: "English" },
  ];
  const { language, setLanguage } = useLanguage();
  const _isModified = () => {
    // 시스템 언어 변경되었는지 확인
  };
  const _handleSaveChanges = () => {
    // 변경 내용 저장, 서버에 변경한 값만 인식하여 전달
    // console.log(_userInfo);

    return (
      <div
        className="flex flex-col min-h-screen 
    items-center justify-center space-y-10 px-4"
      >
        <section className="flex flex-col w-[775px] items-left">
          <TitleHeader title="서비스 설정" />
        </section>

        <section
          className="flex flex-col w-[775px] 
      rounded-md pt-7 pb-7 pl-10 pr-10 bg-white"
        >
          <h2 className="text-subhead2 font-semibold">언어 설정</h2>
          <div className="pt-3 text-body1">
            <div className="flex h-11 items-center">
              <div className="w-32 font-medium">모국어</div>
              <div className="pl-4">한국어</div>
            </div>
            <div className="flex h-11 items-center">
              <div className="w-32 font-medium">학습 언어</div>
              <div className="pl-4">English</div>
            </div>
            <div className="flex h-11 items-center">
              <div className="w-32 font-medium">시스템 언어</div>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative w-[99px] bg-gray-100 px-4 py-2.5 
              text-left text-sm border border-gray-400 cursor-pointer
              rounded-md focus:outline-none focus:ring-1"
                >
                  <span className="block truncate text-gray-900">
                    {/* {language === "ko" ? "한국어" : "English"} */}
                  </span>

                  {/* Arrow Icon */}
                  <span
                    className="absolute inset-y-0 right-0 flex items-center 
              pr-3 pointer-events-none"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-white border 
              border-gray-300 rounded-md shadow-md"
                  >
                    <ul className="max-h-60 py-1 overflow-auto text-sm">
                      {options.map((lang, idx) => (
                        <li
                          key={lang.value}
                          onClick={() => {
                            setLanguage(lang.value);
                            setIsOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-2 
                      hover:bg-gray-100 text-gray-900 ${
                        idx !== 0 ? "border-t border-gray-300" : ""
                      }`}
                        >
                          {lang.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={_handleSaveChanges}
            disabled={!_isModified}
            className={`px-8 py-5 rounded-md text-subhead3 font-semibold
            ${
              _isModified
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            변경 내용 저장
          </button>
        </section>
      </div>
    );
  };
};

export default SettingsPage;
