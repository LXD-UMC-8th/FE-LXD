import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Othersystems from "../../components/Othersystems";
import MRIcon from "../../assets/Inst_img/Mr.svg";
import BassIcon from "../../assets/Inst_img/Bass.svg";
import DrumIcon from "../../assets/Inst_img/Drum.svg";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const SessionPage = () => {
  return (
    <div>
      <Navbar />

      <TitleNavbar title="악보 생성" subtitle="악보 생성 내용" />

      <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>

      <IconContainer>
            <div>
              <Icon src={MRIcon}/>
              <Label>키보드</Label>
            </div>
            <div>
              <Icon src={BassIcon}/>
              <Label>기타</Label>
            </div>
            <div>
              <Icon src={DrumIcon}/>
              <Label>베이스</Label>
            </div>
            <div>
              <Icon src={DrumIcon}/>
              <Label>드럼</Label>
            </div>
          </IconContainer>

      <div style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}>
        <PrimaryButton><Link to="result_score">분석하기</Link></PrimaryButton>
      </div>
      <Othersystems></Othersystems>
    </div>
  );
};

export default SessionPage;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Icon = styled.img`
  width: 135px;
  height: 135px;
`;

const Label = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 17.02px;
  font-weight: 400;
  line-height: 19.94px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;