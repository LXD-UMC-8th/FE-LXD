import { useNavigate } from "react-router-dom";
import CommonComponentSkeleton from "../components/CommonComponent/CommonComponentSkeleton";
import ModalWithTabs from "../components/ModalWithTabs";

const FeedPage = () => {
  const navigate = useNavigate();

  const tabvalue = [
    { value: "friendINfeed", title: "친구" },
    { value: "searchINfeed", title: "탐색" },
    { value: "likeINfeed", title: "좋아요" },
  ];

  const handleSkeletonClick = () => {
    // 임시로 id = 1 로 보냄
    navigate("/feed/1");
  };

  return (
    <div className="w-3/5">
      <ModalWithTabs tabvalue={tabvalue} />
      <div className="px-4 space-y-4 cursor-pointer">
        <div onClick={handleSkeletonClick}>
          <CommonComponentSkeleton />
        </div>
        <div onClick={handleSkeletonClick}>
          <CommonComponentSkeleton />
        </div>
        <div onClick={handleSkeletonClick}>
          <CommonComponentSkeleton />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
