import { useState } from "react";

interface TopLangOptionsButtonProps {
  selected: string;
  onSelect: (lang: string) => void;
}

const TopLangOptionsButton = ({
  selected,
  onSelect,
}: TopLangOptionsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false); // 언어선택 버튼 상태관리

  return (
    <div className="absolute top-10 right-30 flex items-center space-x-4">
      <span className="text-body2 text-gray-700 font-medium">language</span>
      {/* 언어선택버튼 */}
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-[99px] bg-gray-100 px-4 py-2.5 
              text-left text-sm border border-gray-400 cursor-pointer
              rounded-md focus:outline-none focus:ring-1"
        >
          <span className="block truncate text-gray-900">
            {selected === "ko" ? "한국어" : "English"}
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
  );
};

export default TopLangOptionsButton;
