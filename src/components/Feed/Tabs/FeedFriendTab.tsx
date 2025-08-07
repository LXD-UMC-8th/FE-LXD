import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useNavigate } from "react-router-dom";
import { getFriendsDiaries } from "../../../apis/diary";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import type { getMyDiariesResponseDTO } from "../../../utils/types/diary";
import { useEffect } from "react";

const FeedFriendTab = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: ["FriendsDiaries"],
      queryFn: ({ pageParam = 1 }) => getFriendsDiaries(pageParam as number),
      getNextPageParam: (last: getMyDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
      console.log("Fetching next page of friends' diaries:", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="w-260 mb-10">
      {data?.pages.flatMap((page) =>
        page.result.diaries
          .filter((diary) => diary.visibility !== "PRIVATE")
          .map((data, idx) => (
            <CommonComponentInDiaryNFeed
              key={data.diaryId}
              props={data}
              pageResult={page.result}
              idx={idx}
            />
          )),
      )}
      {isFetching && (
        <div>
          <CommonComponentSkeleton />
          <CommonComponentSkeleton />
        </div>
      )}
      {isError && (
        <div className="text-grey-500 text-center mt-4">
          목록을 불러올 수 없습니다.
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default FeedFriendTab;
