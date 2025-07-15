import CommonComponentSkeleton from "../components/CommonComponent/CommonComponentSkeleton";
import ModalWithTabs from "../components/ModalWithTabs";

const FeedPage = () => {
  const tabvalue = [
    { value: "friendINfeed", title: "친구" },
    { value: "searchINfeed", title: "탐색" },
    { value: "likeINfeed", title: "좋아요" },
  ];
  return (
    <div>
      <ModalWithTabs tabvalue={tabvalue} />
      <div className="px-4">
        <CommonComponentSkeleton />
        <CommonComponentSkeleton />
        <CommonComponentSkeleton />
      </div>
    </div>
  );
};

export default FeedPage;
