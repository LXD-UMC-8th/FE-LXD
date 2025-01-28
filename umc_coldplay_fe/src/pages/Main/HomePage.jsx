import styled from "styled-components";
import Navbar from "../../components/Navbar.jsx";
import Header from "../../components/1screen/header.jsx";
import Pearch from "../../components/1screen/search.jsx";
import Feature from "../../components/1screen/feature.jsx";
import Harmony from "../../components/2screen/harmony.jsx";
import Score from "../../components/3screen/score.jsx";
import Stem from "../../components/4screen/stem.jsx";

// styled-components로 스타일 정의
const HomePageWrapper = styled.div`
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  padding-top: 200px; /* 네비게이션 바가 고정되었으므로 여백 추가 */
  text-align: center;
`;

// HomePage 컴포넌트 정의
const HomePage = () => {
  return (
    <HomePageWrapper>
      <Navbar />
      <Header />
      <Pearch />
      <Feature />
      <Harmony />
      <Score />
      <Stem />
    </HomePageWrapper>
  );
};

export default HomePage;
