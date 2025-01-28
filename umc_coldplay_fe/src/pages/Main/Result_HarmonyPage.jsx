import styled from "styled-components";
import "../../components/2screen/harmony.css";
import Logo from "../../assets/Logo_img/logo_bk_white.svg";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import "../../components/Buttons/SecondaryButton.css";
import Othersystems from "../../components/Othersystems";
import "../../components/Buttons/TertiaryWhiteButton.css";
import "../../components/Buttons/TertiaryBlackButton.css";
import "../../components/Buttons/PrimaryButton.css";
import { Link } from "react-router-dom";
import Slick from "../../components/Slick";
const Result_HarmonyPage = () => {
  return (
    <>
      <Navbar />
      <TitleNavbar
        title="화상 분석 결과"
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
      <To_under_button>
        <div className="harmony-info">
          <div className="info-container">
            <p className="info-label">Key</p>
            <div className="info-item">
              <span>F#</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">Scale</p>
            <div className="info-item">
              <span>Major</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">Chord</p>
            <div className="info-item">
              <span>I-IV-V</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">BPM</p>
            <div className="info-item">
              <span>100</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">음압</p>
            <div className="info-item">
              <span>100</span>
            </div>
          </div>
        </div>
      </To_under_button>

      <Total_Conatiner>
        <ResultsConatiner>
          <Results>
            <Analysis_title>
              <img src={Logo} />
              분석 결과 1 :
            </Analysis_title>
          </Results>
          <Analysis_content>이것은 설명입니다. </Analysis_content>
        </ResultsConatiner>
      </Total_Conatiner>
      <Slick></Slick>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Pretentard",
        }}
      >
        <Link to="/harmony" className="SBL button">
          이전으로
        </Link>
      </div>
      <Othersystems
        DF_subtitle="지금 이 노래, 더 알아볼까요?"
        To_other1="세션 분리"
      ></Othersystems>
    </>
  );
};

export default Result_HarmonyPage;

const To_under_button = styled.div`
  padding-top: 80px;
`;

const Total_Conatiner = styled.div`
  display: flex;
  justify-content: center;
`;

const ResultsConatiner = styled.div`
  display: flex;
  width: 1100px;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  border-radius: 30px;
  background: var(--badkground, #f9f9f9);
  display: grid;
  grid-templatet-rows: repeat(5, 1fr);
  border-bottom: 1px solid var(--gray-lightline, #e4e1e7);
`;

const Analysis_title = styled.div`
  display: flex;
  padding: 0 0 10px 10px;
  gap: 20px;
  color: var(--black, #190828);
  width: 100%;

  /* Body L */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-margin: 0 0 0 20px;
  alings-items: center;
`;
const Analysis_content = styled.div`
  color: var(--black, #190828);
  text-align: justify;
  margin-bottom: 40px;
  /* Body R */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 30px;
`;

const Results = styled.div`
  gap: 30px;
  border-bottom: 1px solid var(--gray-lightline, #e4e1e7);
`;
