import Navbar from "../components/Navbar";
import TitleNavbar from "../components/TitleNavbar";
import UploadBox from "../components/UploadBox";
import Button from "../components/Button";
import Result_Harmony from "../components/Result_Harmony";

const HarmonyPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <TitleNavbar title="화성 분석" subtitle="내용들" />
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
        </div>
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button>분석하기</Button>
        </div>
      </div>
    </>
  );
};

export default HarmonyPage;
