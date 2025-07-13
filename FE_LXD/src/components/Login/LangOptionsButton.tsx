import { useState } from "react";

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

  return (
    <div className="space-y-[10px]">
      <div className="text-subhead3 font-medium">{name}</div>

      {/* 언어선택버튼 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-[250px] h-[55px] px-[32px] py-[16px] border rounded-md 
              border-gray-300 bg-gray-50 text-gray-500 text-body1 
              focus:outline-none"
        >
          <span className="block truncate text-left text-body1 text-gray-400">
            {selected === "ko"
              ? "한국어"
              : selected === "en"
              ? "English"
              : "언어 선택"}
          </span>

          {/* Arrow Icon */}
          <span
            className="absolute inset-y-0 right-0 flex items-center
          pr-5 pointer-events-none"
          >
            {isOpen ? (
              // ▲ 모양
              <img src="/images/toggleUp.svg" className="w-3 h-3" />
            ) : (
              // ▼ 모양
              <img src="/images/toggleDown.svg" className="w-3 h-3" />
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
                { value: "ko", label: "한국어" },
                { value: "en", label: "English" },
              ].map((lang, idx) => (
                <li
                  key={lang.value}
                  onClick={() => {
                    onSelect(lang.value);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-3 
                      hover:bg-gray-100 text-gray-900 ${
                        idx !== 0 ? "border-t border-gray-200" : ""
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
