import CommonComponentSkeleton from "../components/CommonComponent/CommonComponentSkeleton";
import ModalWithTabs from "../components/ModalWithTabs";

const FeedPage = () => {
  const tabvalue = [
    { value: "totalInFeed", title: "모두" },
    { value: "likeInFeed", title: "좋아요" },
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
