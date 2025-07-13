import CommonComponentSkeleton from "../components/CommonComponent/CommonComponentSkeleton";
import ExploreTab from "../components/FeedPage/ExploreTab";
import FeedFriendTab from "../components/FeedPage/FeedFriendTab";
import LikesTab from "../components/FeedPage/LikesTab";
import ModalWithTabs from "../components/ModalWithTabs";

const FeedPage = () => {
  return (
    <div>
      <ModalWithTabs
        title1="친구/피드"
        title2="탐색/피드"
        title3="좋아요/피드"
      />
      <div className="px-4">
        <CommonComponentSkeleton />
        <CommonComponentSkeleton />
        <CommonComponentSkeleton />
      </div>
    </div>
  );
};

export default FeedPage;
