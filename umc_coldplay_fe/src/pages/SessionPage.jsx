import Navbar from "../components/Navbar";
import TitleNavbar from "../components/TitleNavbar";
import UploadBox from "../components/UploadBox";
import Button from "../components/Button";
import Icons from "../components/Icons";

const SessionPage = () => {
  return (
    <div>
      <Navbar />

      <TitleNavbar title="세션 분리" subtitle="세션 분리 내용" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>

      <Icons />

      <div
        style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}
      >
        <Button>분석하기</Button>
      </div>
    </div>
  );
};

export default SessionPage;
