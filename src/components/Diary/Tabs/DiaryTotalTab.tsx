import { useEffect } from "react";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";

const DiaryTotalTab = () => {
  useEffect(() => {});
  return (
    <div className="w-260">
      <CommonComponentInDiaryNFeed diaryId={1} />
      <CommonComponentSkeleton />
    </div>
  );
};

export default DiaryTotalTab;
