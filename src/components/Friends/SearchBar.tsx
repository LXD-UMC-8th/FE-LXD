import { useEffect, useState } from "react";
import SearchIcon from "../../../public/images/Search.svg";
import { useDebounce } from "@uidotdev/usehooks";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

 // 디바운스 훅 불러오기

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void; // 최종 디바운싱된 값 전달
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { language } = useLanguage();           // ✅
  const t = translate[language];
  const [inputValue, setInputValue] = useState(value);

  // 입력값을 500ms 디바운스
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="flex items-center w-full h-[53px] bg-[#EDEEF0] rounded px-4 py-2 ">
      <img src={SearchIcon} alt="Search" className="w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder={t.friendSearchPlaceholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 h-full"
      />
    </div>
  );
};

export default SearchBar;
