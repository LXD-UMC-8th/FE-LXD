import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";

const FeedPage = () => {
  const tabvalue = [
    { value: "friendINfeed", title: "친구" },
    { value: "searchINfeed", title: "탐색" },
    { value: "likeINfeed", title: "좋아요" },
  ];

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between mx-10 ">
      <div className="">
        <ModalWithTabs tabvalue={tabvalue} />
      </div>
      <div className="z-10 mx-10 pr-10">
        <CalendarModal />
      </div>
    </div>
  );
};

export default FeedPage;
