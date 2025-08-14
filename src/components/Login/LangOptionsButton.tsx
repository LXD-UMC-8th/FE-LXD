import { useCallback, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import useOutsideClick from "../../hooks/useOutsideClick";

interface LangOptionsButtonProps {
  name: string;
  selected: string;
  onSelect: (lang: string) => void;
}

const LangOptionsButton = ({
  name,
  selected,
  onSelect,
}: LangOptionsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false); // 언어선택 버튼 상태관리
  const ref = useRef<HTMLDivElement | null>(null);
  const onClose = useCallback(() => setIsOpen(false), []);
  useOutsideClick(ref, onClose);
  const { language } = useLanguage();
  const t = translate[language];
  

  

  return (
    <div className="space-y-[10px]">
      <div className="text-subhead3 font-medium">{name}</div>

      {/* 언어선택버튼 */}
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-[250px] h-[55px] px-[32px] py-[16px] border rounded-md 
              border-gray-300 bg-gray-50 focus:outline-none cursor-pointer"
        >
          <span
            className={`block truncate text-left text-body1 
            ${
              selected === "KO" || selected === "ENG"
                ? "text-black"
                : "text-gray-500"
            }`}
          >
            {selected === "KO"
              ? "한국어"
              : selected === "ENG"
              ? "English"
              : t.langPlaceholder}
          </span>

          {/* Arrow Icon */}
          <span
            className="absolute inset-y-0 right-0 flex items-center
          pr-5 pointer-events-none"
          >
            {isOpen ? (
              // ▲ 모양
              <img alt="image" src="/images/toggleUp.svg" className="w-3 h-3" />
            ) : (
              // ▼ 모양
              <img
                alt="image "
                src="/images/toggleDown.svg"
                className="w-3 h-3"
              />
            )}
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute z-10 w-full mt-2 bg-white border 
              border-gray-300 rounded-md shadow-md"
          >
            <ul className="text-body1 overflow-auto">
              {[
                { value: "KO", label: "한국어" },
                { value: "ENG", label: "English" },
              ].map((lang, idx) => (
                <li
                  key={lang.value}
                  onClick={() => {
                    onSelect(lang.value);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-3 
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
  );
};

export default LangOptionsButton;
