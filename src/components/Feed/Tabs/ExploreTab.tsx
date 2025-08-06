import ValueSettingButton from "../../Common/ValueSettingButton";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useNavigate } from "react-router-dom";

const ExploreTab = () => {
  const navigate = useNavigate();
  const handleSkeletonClick = () => {
    // 임시로 id = 1 로 보냄
    navigate("/feed/1");
  };

  return (
    <div className="flex flex-col gap-5 pt-3 pb-4">
      <ValueSettingButton title1="한국어" title2="English" />
      <div className="cursor-pointer">
        <div onClick={handleSkeletonClick}>
          <CommonComponentInDiaryNFeed props={props} />
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
    </div>
  );
};

export default ExploreTab;
