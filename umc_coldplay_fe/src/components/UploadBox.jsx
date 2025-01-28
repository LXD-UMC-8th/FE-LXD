/* eslint-disable react/prop-types */
import styled from "styled-components";
import UnionIcon from "../assets/Union.svg";

const UploadBox = ({ fileName, fileDetails }) => {
  return (
    <Container>
      <OuterSquare>
        <MiddleCircle>
          <InnerCircle>
            <Icon src={UnionIcon} />
          </InnerCircle>
        </MiddleCircle>
      </OuterSquare>
      <TextContainer>
        <TopLine>{fileName}</TopLine>
        <BottomLine>{fileDetails}</BottomLine>
      </TextContainer>
    </Container>
  );
};

export default UploadBox;

const Container = styled.div`
  width: 953px;
  height: 245px;
  position: relative;
  border-radius: 18.97px;
  background: linear-gradient(135deg, #e3e4e8, #c4c4c4);
  box-shadow: 0px 3.79px 9.48px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const OuterSquare = styled.div`
  width: 161.22px;
  height: 161.22px;
  border-radius: 19.72px;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(3.403px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0px;
  gap: 0px;
`;

const MiddleCircle = styled.div`
  width: 103.11px;
  height: 103.11px;
  border-radius: 50%;
  background: rgba(217, 217, 217, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 43.12px;
  height: 43.12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 17.81px;
  height: 23.54px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  gap: 15.17px;
`;

const TopLine = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 34.14px;
  font-weight: 600;
  line-height: 40.74px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  height: 41px;
`;

const BottomLine = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 22.76px;
  font-weight: 400;
  line-height: 27.16px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  height: 27px;
`;
