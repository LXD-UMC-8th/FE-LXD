import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";

const FeedPage = () => {
  const tabvalue = [
    { value: "friendINfeed", title: "친구" },
    { value: "searchINfeed", title: "탐색" },
    { value: "likeINfeed", title: "좋아요" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 w-260 flex flex-cols gap-20 justify-between">
      <div className="">
        <ModalWithTabs tabvalue={tabvalue} />
      </div>
      <div>
        <CalendarModal />
      </div>
    </div>
  );
};

export default FeedPage;
