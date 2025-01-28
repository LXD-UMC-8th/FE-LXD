import './harmony.css'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PrimaryButton from "../Buttons/PrimaryButton";

const Harmony=()=>{
  return(
    <section  className="harmony-analysis">
        <h2 className="section-title">화성 분석</h2>
        <p className="section-description">
          예시텍스트 입니다. 화성분석에 대한 설명글이 들어갈 예정입니다.
        </p>
        <div className="harmony-info">
          <div className="info-container">
            <p className="info-label">Key</p>
            <div className="info-item"><span>F#</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">Scale</p>
            <div className="info-item"><span>Major</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">Chord</p>
            <div className="info-item"><span>I-IV-V</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">BPM</p>
            <div className="info-item"><span>100</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">음압</p>
            <div className="info-item"><span>100</span></div>
          </div>
        </div>
        <ButtonContainer>
        <StyledButton>
          <Link to="/harmony">화성 분석 바로가기 →</Link>
        </StyledButton>
      </ButtonContainer>
    </section>
  );
};

export default Harmony;
//기존 Button 컴포넌트 이용해서 홈페이지 버튼 통일함
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled(PrimaryButton)`
  width: 266px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
  opacity: 1;

  a {
    text-decoration: none;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: white;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 28.64px;
    text-align: left;
  }
`;



