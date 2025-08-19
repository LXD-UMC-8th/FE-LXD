import { useEffect } from "react";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getMyDiaries } from "../../../apis/diary";
import type {
  diaries,
  getDiariesResponseDTO,
} from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";
import { QUERY_KEY } from "../../../constants/key";

const DiaryTotalTab = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.MyDiaryTotal],
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
        page.result.contents.map((data: diaries, idx: number) => (
          <CommonComponentInDiaryNFeed
            key={data.diaryId}
            props={data}
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
      {isError && (
        <div className="text-grey-500 text-center mt-4">
          목록을 불러올 수 없습니다.
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default DiaryTotalTab;
