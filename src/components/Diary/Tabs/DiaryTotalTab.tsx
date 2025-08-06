import { useEffect } from "react";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getMyDiaries } from "../../../apis/diary";
import type { getMyDiariesResponseDTO } from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";

const DiaryTotalTab = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteScroll({
    queryKey: ["MyDiaryTotal"],
    queryFn: ({ pageParam = 1 }) => getMyDiaries(pageParam as number),
    getNextPageParam: (last: getMyDiariesResponseDTO) =>
      last.result.hasNext ? last.result.page + 1 : undefined,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
      console.log("fetching data", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {});
  return (
    <div className="w-260 mb-10">
      {data?.pages.flatMap((page) =>
        page.result.diaries.map((data) => (
          <CommonComponentInDiaryNFeed key={data.diaryId} props={data} />
        )),
      )}
      {isFetching && (
        <div>
          <CommonComponentSkeleton />
          <CommonComponentSkeleton />
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default DiaryTotalTab;
