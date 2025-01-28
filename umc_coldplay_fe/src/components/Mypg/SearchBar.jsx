import { useState } from "react";
import searchButtonIcon from "../assets/images/search_button.svg"; // 버튼 SVG 불러오기
import { Link } from 'react-router-dom';


const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("검색어:", query); // 검색어 로그 출력
  };

  return (
    <div
      style={{
        width: "100%", // 화면 너비에 맞춤
        height: "120px",
        backgroundColor: "#F9F9F9", // 배경 색상
        borderTop: "2px solid #E4E1E7", // 위쪽 외곽선
        borderBottom: "2px solid #E4E1E7", // 아래쪽 구분선
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 검색창 */}
        <input
          type="text"
          placeholder="검색어"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "665px",
            height: "56px",
            padding: "0 20px",
            borderRadius: "28px", // 높이의 절반으로 설정해 완전한 반원
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
            color: "#000", // 입력 텍스트 색상
          }}
        />

        {/* 검색 버튼 */}
        <button
          type="submit"
          style={{
            width: "109px",
            height: "49px",
            marginLeft: "10px",
            backgroundColor: "transparent", // 배경 투명
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/mypagesearch">
          <img
            src={searchButtonIcon}
            alt="검색 버튼"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          </Link>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
