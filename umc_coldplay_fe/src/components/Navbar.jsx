import styled from "styled-components";
import Logo from "../assets/Logo_img/logo.svg";
import { Link } from "react-router-dom";
import "./Buttons/TertiaryBlackButton.css";
import "./Buttons/TertiaryWhiteButton.css";

function Navbar() {
  return (
    <>
      <Container>
        <StyledNavbar>
          <StyledButton>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </StyledButton>
          <ArrayButtons>
            <ButtonStyle to="/harmony">화성 분석</ButtonStyle>
            <ButtonStyle to="/session">세션 분리</ButtonStyle>
            {/*
            <ButtonStyle>
              <Link to="/score">악보 생성</Link>
            </ButtonStyle>
            */}
            <button className="TBBSU button">회원가입</button>
            <button className="TWBLG button">로그인</button>
            {/*

            <ButtonStyle_su>회원가입</ButtonStyle_su>
            <ButtonStyle_lg>로그인</ButtonStyle_lg>
            */}
          </ArrayButtons>
        </StyledNavbar>
      </Container>
    </>
  );
}
export default Navbar;

const StyledButton = styled.div`
  width: 50px;
  height: 50px;
  margin: 20px 120px;
  display: flex; /* Flexbox로 내부 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  img {
    margin: 20px 20px;
    width: 50px;
    height: 50px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: calc(100%-20px);
  left: 0;
  flex-shrink: 0;
  overflow: hidden;
`;

const StyledNavbar = styled.div`
  background-color: #ffffff;
  color: black;
  width: 100%;
  height: 100px;
  color: white;
  position: fixed;
  display: flex;
  top: 0;
  z-index: 1000;
  left: 0;
  justify-content: space-between;
  align-content: center;
`;

const ArrayButtons = styled.div`
  display: grid;
  background-color: #ffffff;
  color: black;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-left: auto;
  padding-right: 100px;
  align-content: center;
`;

const ButtonStyle = styled(Link)`
  width: 100px;
  text-decoration: none;
  background-color: #ffffff;
  font-size: 15px;
  padding: 10px;
  height: 60px !important;
  border: none;
  &:hover {
    background-color: #e0e0e0;
  }
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;
