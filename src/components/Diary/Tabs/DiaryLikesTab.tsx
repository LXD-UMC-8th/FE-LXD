import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import type {
  diaries,
  getDiariesResponseDTO,
} from "../../../utils/types/diary";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getMyDiaries } from "../../../apis/diary";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import { QUERY_KEY } from "../../../constants/key";

const DiaryLikesTab = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.MyDiaryLikes],
      queryFn: ({ pageParam = 1 }) => getMyDiaries(pageParam as number),
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="w-260 mb-10">
      {data?.pages.flatMap((page) =>
        page.result.contents
          .filter((contents: diaries) => contents.isLiked)
          .map((contents: diaries, idx: number) => (
            <CommonComponentInDiaryNFeed
              key={contents.diaryId}
              props={contents}
              pageResult={page.result}
              idx={idx}
            />
          ))
      )}
      {isFetching && (
        <div>
          <CommonComponentSkeleton />
          <CommonComponentSkeleton />
        </div>
      )}
      <div ref={ref}></div>
      {isError && (
        <div className="text-grey-500 text-center mt-4">
          목록을 불러올 수 없습니다.
        </div>
      )}
    </div>
  );
};

export default DiaryLikesTab;
