import ModalWithTabs from "../components/ModalWithTabs";

const FriendsListPage = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* 탭 메뉴 */}
      <ModalWithTabs
        title1="친구찾기/친구"
        title2="친구/친구"
        count2={3}
        title3="요청/친구"
        count3={2}
      />
    </div>
  );
};

export default FriendsListPage;
