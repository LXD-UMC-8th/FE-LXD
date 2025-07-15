import ModalWithTabs from "../components/ModalWithTabs";

const FriendsListPage = () => {
  const tabvalue = [
    { value: "findINfriend", title: "친구찾기" },
    { value: "friendINfriend", title: "친구", count: 5 },
    { value: "requestINfriend", title: "요청", count: 19 },
  ];

  return (
    <div className="h-screen bg-gray-100">
      {/* 탭 메뉴 */}
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default FriendsListPage;
