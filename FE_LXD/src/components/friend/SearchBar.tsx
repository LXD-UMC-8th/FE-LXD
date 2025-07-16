import SearchIcon from "/images/search.svg";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center w-[399px] h-[53px] bg-[#EDEEF0] rounded px-4 py-2 font-[Pretendard]">
      <img src={SearchIcon} alt="Search" className="w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="친구 목록에서 아이디를 검색하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 h-full"
      />
    </div>
  );
};

export default SearchBar;
