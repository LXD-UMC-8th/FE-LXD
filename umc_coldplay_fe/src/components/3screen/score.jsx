import './score.css';
import MRIcon from "../../assets/Inst_img/Mr.svg";
import BassIcon from "../../assets/Inst_img/Bass.svg";
import DrumIcon from "../../assets/Inst_img/Drum.svg";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Button from '../Buttons/PrimaryButton';

const Score = () => {
  return (
    <section  className="score-analysis container">
      <h2 className="section-title1">악보 생성</h2>
      <p className="section-description">
        곡의 화성정보가 포함된 간단한 악보를 생성하여 제공합니다.
      </p>

      {/* 아이콘 목록 추가 */}
      <div className="icon-container">
        <div className="icon-item">
          <img src={MRIcon} alt="키보드" className="icon-image" />
          <p className="icon-label">키보드</p>
        </div>
        <div className="icon-item">
          <img src={BassIcon} alt="기타" className="icon-image" />
          <p className="icon-label">기타</p>
        </div>
        <div className="icon-item">
          <img src={DrumIcon} alt="드럼" className="icon-image" />
          <p className="icon-label">드럼</p>
        </div>
        <div className="icon-item">
          <img src={DrumIcon} alt="임시드럼" className="icon-image" />
          <p className="icon-label">임시드럼럼</p>
        </div>
      </div>
      <ButtonContainer>
        <StyledButton>
          <Link to="/score">악보 생성 바로가기 →</Link>
        </StyledButton>
      </ButtonContainer>
    </section>
  );
};

export default Score;
//기존 Button 컴포넌트 이용해서 홈페이지 버튼 통일함
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  width: 266px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
  opacity: 1;

  a {
    text-decoration: none;
    color: white;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 28.64px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;