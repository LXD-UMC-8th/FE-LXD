import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useNavigate } from "react-router-dom";

const LikesTab = () => {
  const navigate = useNavigate();
  const handleSkeletonClick = () => {
    // 임시로 id = 1 로 보냄
    navigate("/feed/1");
  };

  return (
    <div className="cursor-pointer">
      <div onClick={handleSkeletonClick}>
        <CommonComponentInDiaryNFeed />
      </div>
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
  );
};

export default LikesTab;
