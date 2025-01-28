import  { useState } from "react";
import playButton from "../assets/images/play_button.svg";
import stopButton from "../assets/images/stop_button.svg";
import likeButtonOff from "../assets/images/like_button_off.svg";
import likeButtonOn from "../assets/images/like_button_on.svg";

const Menu2 = () => {
  const [activeButton, setActiveButton] = useState("전체");
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const buttons = ["전체", "MR", "드럼", "베이스"];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const trackData = {
    title: "파일1",
    category: "드럼",
    date: "작업 일시",
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      {/* 버튼 섹션 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => handleButtonClick(button)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FFFFFF",
              border: `2px solid ${
                activeButton === button ? "#6F3DA1" : "#C9C3CE"
              }`,
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: "bold",
              color: activeButton === button ? "#000000" : "#C9C3CE",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {button}
          </button>
        ))}
      </div>

      {/* 리스트 섹션 */}
      <div
        style={{
          backgroundColor: "#F9F9F9",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 이미지 공간 */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#D3D3D3",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        ></div>

        {/* 텍스트 정보 */}
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "5px",
            }}
          >
            {trackData.title}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#6F3DA1",
              marginBottom: "5px",
            }}
          >
            {trackData.category}
          </div>
          <div style={{ fontSize: "12px", color: "#999" }}>{trackData.date}</div>
        </div>

        {/* 재생 버튼과 슬라이더 컨테이너 */}
        <div
          style={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 그림자 추가
              flex: 1,
            }}
          >
            {/* 재생/정지 버튼 */}
            <button
              onClick={togglePlay}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={isPlaying ? stopButton : playButton}
                alt={isPlaying ? "정지" : "재생"}
                style={{ width: "100%", height: "100%" }}
              />
            </button>

            {/* 슬라이더 */}
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              style={{
                flex: 1,
                appearance: "none",
                height: "5px",
                borderRadius: "5px",
                outline: "none",
                cursor: "pointer",
                accentColor: "#6F3DA1",
                background: `linear-gradient(to right, #6F3DA1 50%, #E4E1E7 50%)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              onChange={(e) => {
                const value = e.target.value;
                e.target.style.background = `linear-gradient(to right, #6F3DA1 ${value}%, #E4E1E7 ${value}%)`;
              }}
            />
          </div>
        </div>

        {/* 좋아요 버튼 */}
        <button
          onClick={toggleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            marginLeft: "20px", // 슬라이더와 좋아요 버튼 간격 추가
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

export default Menu2;
