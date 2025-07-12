import ExploreTab from "../components/FeedPage/ExploreTab";
import FeedFriendTab from "../components/FeedPage/FeedFriendTab";
import LikesTab from "../components/FeedPage/LikesTab";
import ModalWithTabs from "../components/ModalWithTabs";

const FeedPage = () => {
  return (
    <div>
      <ModalWithTabs 
        title1="친구"
        title2="탐색"
        title3="좋아요"
        tab1Component={<FeedFriendTab />}
        tab2Component={<ExploreTab />}
        tab3Component={<LikesTab />}
      />
    </div>
  )
};

export default FeedPage;
