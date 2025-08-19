import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useEffect } from "react";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getLikedDiaries } from "../../../apis/diary";
import type { getDiariesResponseDTO } from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { QUERY_KEY } from "../../../constants/key";

const LikesTab = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.LikesTab],
      queryFn: ({ pageParam = 1 }) => {
        return getLikedDiaries(pageParam as number);
      },
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
      console.log("Fetching next page of liked' diaries:", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col w-260 mb-10">
      {data?.pages.flatMap((page) =>
        page.result.contents
          .filter((contents) => contents.visibility !== "PRIVATE")
          .map((data, _idx) => (
            <CommonComponentInDiaryNFeed
              key={data.diaryId}
              props={data}
              // pageResult={page.result}
              // idx={idx}
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
        <div className="text-grey-500 text-center mt-4">{t.CannotLoadList}</div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default LikesTab;
