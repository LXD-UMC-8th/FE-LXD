import styled from "styled-components";
import PersonIcon  from "../assets/images/person.svg";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: white;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 40px;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 15px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
`;

const EditProfile = styled.span`
  margin-left: 10px;
  font-size: 14px;
  font-weight: normal;
  color: #888;
  text-decoration: underline;
  cursor: pointer;
`;

const ProfileEmail = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #888;
`;

function MyPageBar() {
  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src={PersonIcon} alt="프로필 아이콘" />
        <ProfileInfo>
          <ProfileName>
            닉네임
            <EditProfile>프로필 수정</EditProfile>
          </ProfileName>
          <ProfileEmail>00000000@naver.com · 간편로그인 타입</ProfileEmail>
        </ProfileInfo>
      </ProfileHeader>
    </Container>
  );
}

export default MyPageBar;