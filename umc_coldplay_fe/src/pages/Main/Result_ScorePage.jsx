import styled from "styled-components";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import "../../components/Buttons/SecondaryButton.css";
import Othersystems from "../../components/Othersystems";

const Result_ScorePage = () => {
  return (
    <>
      <Navbar />
      <TitleNavbar
        title="악보 생성 결과"
        subtitle="어쩌고저쩌고 그냥 그런 내용들"
      ></TitleNavbar>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>
      <Wrapper>
        <ControllBox></ControllBox>
        <Something_BOX>여기에 뭐가 들어가는지 모르겠습니다.</Something_BOX>
      </Wrapper>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className="SBL">이전으로</button>
      </div>
      <Container>
        <h1>다른 세션 추출하기</h1>
        <h5>클릭시 페이지 이동. 여기는 설명</h5>
        <Container_2></Container_2>
      </Container>
      <Othersystems></Othersystems>
    </>
  );
};

export default Result_ScorePage;

const Wrapper = styled.div`
  justify-content: center;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
`;

const ControllBox = styled.div`
  width: 820px;
  height: 144px;
  background: #e9e9e9;
  backdrop-filter: blur(93.9848861694336px);
`;

const Something_BOX = styled.div`
  width: 1084px;
  height: 699.225px;
  flex-shrink: 0;
  background: var(--gray-regular-line, #c9c3ce);
`;

const Container = styled.div`
  width: 1920px;
  height: 650px;
  flex-shrink: 0;
  background: #f3f3f3;
`;

const Container_2 = styled.div`
  display: grid;
  gird-templates-rows: repeat(4, 1fr);
`;
