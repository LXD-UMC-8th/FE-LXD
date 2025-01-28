import  { useState } from "react";
import likeButtonOff from "../assets/images/like_button_off.svg";
import likeButtonOn from "../assets/images/like_button_on.svg";

const Menu1 = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const trackData = [
    {
      title: "음원 제목입니다",
      date: "25.01.25",
      key: "C",
      scale: "Major",
      progression: "C-F-G-Am",
      bpm: "140",
    },
  ];

  const commonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // 수직 정렬
    padding: "15px 20px", // 동일한 내부 여백
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        paddingTop: "20px",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          ...commonStyle,
          backgroundColor: "#F5F5F5",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#999",
        }}
      >
        <span style={{ flex: 3, textAlign: "left" }}>음원 목록</span>
        <span style={{ flex: 1, textAlign: "center" }}>키</span>
        <span style={{ flex: 1, textAlign: "center" }}>스케일</span>
        <span style={{ flex: 2, textAlign: "center" }}>코드 진행</span>
        <span style={{ flex: 1, textAlign: "center" }}>BPM</span>
        {/* 버튼 자리를 위한 빈 열 */}
        <span style={{ flex: 1, textAlign: "center" }}></span>
      </div>

      {/* 리스트 항목 */}
      <div
        style={{
          ...commonStyle,
          marginTop: "10px",
          backgroundColor: "#F9F9F9",
          borderRadius: "8px",
        }}
      >
        {/* 음원 정보 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flex: 3,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#D3D3D3",
              borderRadius: "4px",
            }}
          ></div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              {trackData[0].title}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {trackData[0].date}
            </div>
          </div>
        </div>

        {/* 키 */}
        <span style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#000" }}>
          {trackData[0].key}
        </span>

        {/* 스케일 */}
        <span style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#000" }}>
          {trackData[0].scale}
        </span>

        {/* 코드 진행 */}
        <span style={{ flex: 2, textAlign: "center", fontSize: "14px", color: "#000" }}>
          {trackData[0].progression}
        </span>

        {/* BPM */}
        <span style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#000" }}>
          {trackData[0].bpm}
        </span>

        {/* 좋아요 버튼 */}
        <button
          onClick={toggleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            flex: 1,
            textAlign: "center",
          }}
        >
          <img
            src={isLiked ? likeButtonOn : likeButtonOff}
            alt="좋아요 버튼"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Menu1;
