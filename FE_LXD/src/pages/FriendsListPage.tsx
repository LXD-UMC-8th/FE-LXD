import ModalWithTabs from "../components/ModalWithTabs";

const FriendsListPage = () => {
  const tabvalue = [
    { value: "totalInFriends", title: "모두" },
    { value: "likeInFriends", title: "좋아요", count: 5 },
    { value: "requestInFriends", title: "요청", count: 19 },
  ];

  return (
    <div className="h-screen bg-gray-100">
      {/* 탭 메뉴 */}
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default FriendsListPage;
