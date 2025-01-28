import './stem.css';
import MRIcon from "../../assets/Inst_img/Mr.svg";
import BassIcon from "../../assets/Inst_img/Bass.svg";
import DrumIcon from "../../assets/Inst_img/Drum.svg";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Buttons/PrimaryButton';

const Stem = () => {
  return (
    <section  className="stem-analysis">
      <h2 className="section-title">세션 분리</h2>
      <p className="section-description">
        예시 텍스트입니다. 세션분리에 대한 설명글이 들어갈 예정입니다.
      </p>
      <div className="stem-container">
        {/* 첫 번째 항목 */}
        <div className="stem-item">
          <img
            src={MRIcon}
            alt="MR 추출 이미지"
            className="stem-image"
          />
          <p className="stem-title">MR 추출</p>
          <p className="stem-description">
            곡에서 보컬을 제거하여 반주(MR)를 제공합니다.
          </p>
        </div>

        {/* 두 번째 항목 */}
        <div className="stem-item">
          <img
            src={BassIcon}
            alt="드럼 트랙 분리 이미지"
            className="stem-image"
          />
          <p className="stem-title">드럼 트랙 분리</p>
          <p className="stem-description">이것은 설명입니다.</p>
        </div>

        {/* 세 번째 항목 */}
        <div className="stem-item">
          <img
            src={DrumIcon}
            alt="베이스 트랙 분리 이미지"
            className="stem-image"
          />
          <p className="stem-title">베이스 트랙 분리</p>
          <p className="stem-description">이것은 설명입니다.</p>
        </div>
      </div>
      <ButtonContainer>
        <StyledButton>
          <Link to="/session">세션 분리 바로가기 →</Link>
        </StyledButton>
      </ButtonContainer>
    </section>
  );
};

export default Stem;
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