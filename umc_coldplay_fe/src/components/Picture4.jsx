import styled from "styled-components";
import MRIcon from "../assets/Inst_img/Mr.svg";
import BassIcon from "../assets/Inst_img/Bass.svg"; 
import DrumIcon from "../assets/Inst_img/Drum.svg"; 

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px; /* 아이콘 간의 간격 */
  margin-bottom: 50px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconImage = styled.img`
  width: 135px; /* 아이콘 이미지 크기 */
  height: 135px;
  margin-bottom: 10px;
  filter: grayscale(80%); /* 아이콘 회색 처리 */
`;

const IconLabel = styled.p`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

// JSX 컴포넌트
const IconList = () => {
  return (
    <IconContainer>
      <IconItem>
        <IconImage src={MRIcon} alt="키보드" />
        <IconLabel>키보드</IconLabel>
      </IconItem>
      <IconItem>
        <IconImage src={BassIcon} alt="기타" />
        <IconLabel>기타</IconLabel>
      </IconItem>
      <IconItem>
        <IconImage src={DrumIcon} alt="드럼" />
        <IconLabel>드럼</IconLabel>
      </IconItem>
      <IconItem>
        <IconImage src={DrumIcon} alt="임시드럼" />
        <IconLabel>임시드럼</IconLabel>
      </IconItem>
    </IconContainer>
  );
};

export default IconList;
