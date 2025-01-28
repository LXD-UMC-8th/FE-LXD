import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Icons from "../../components/Icons";
import Othersystems from "../../components/Othersystems";

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
        <PrimaryButton>분석하기</PrimaryButton>
      </div>
      <Othersystems
        DF_subtitle="이런 기능도 있어요"
        To_other1="화성 분석"
      ></Othersystems>
    </div>
  );
};

export default SessionPage;
