import { useEffect, useState } from "react";
import SearchIcon from "../../../public/images/Search.svg";
import { useDebounce } from "@uidotdev/usehooks";
 // 디바운스 훅 불러오기

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void; // 최종 디바운싱된 값 전달
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  // 입력값을 500ms 디바운스
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="flex items-center w-full h-[53px] bg-[#EDEEF0] rounded px-4 py-2 font-[Pretendard]">
      <img src={SearchIcon} alt="Search" className="w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="친구 목록에서 아이디를 검색하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 h-full"
      />
    </div>
  );
};

export default SearchBar;
