import { useState } from "react";
import likeButtonOff from "../assets/images/like_button_off.svg";
import likeButtonOn from "../assets/images/like_button_on.svg";

const Menu3 = () => {
  const [activeButton, setActiveButton] = useState("전체");
  const [likes, setLikes] = useState([false, false, false, false]);

  const toggleLike = (index) => {
    setLikes((prev) =>
      prev.map((liked, i) => (i === index ? !liked : liked))
    );
  };

  const buttons = ["전체", "키보드", "기타", "드럼", "베이스"];

  const files = [
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
  ];

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
            onClick={() => setActiveButton(button)}
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

      {/* 카드 리스트 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              width: "248px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* 이미지 영역 */}
            <div
              style={{
                width: "248px",
                height: "352px",
                backgroundColor: "#D9D9D9",
                position: "relative",
              }}
            >
              <button
                onClick={() => toggleLike(index)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={likes[index] ? likeButtonOn : likeButtonOff}
                  alt="좋아요 버튼"
                  style={{
                    width: "52px",
                    height: "48px",
                  }}
                />
              </button>
            </div>

            {/* 제목과 작업 일시 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  padding: "0 10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                {file.title}
              </div>
              <div
                style={{
                  padding: "0 10px",
                  fontSize: "12px",
                  color: "#999",
                  textAlign: "left",
                }}
              >
                {file.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu3;