import ValueSettingButton from "../../Common/ValueSettingButton";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getExploreDiaries } from "../../../apis/diary";
import type { getMyDiariesResponseDTO } from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";

const ExploreTab = () => {
  const [lang, setLang] = useState<string>("KO");
  const handleLangChange = (value: string) => {
    if (value === "한국어") {
      setLang("KO");
    } else if (value === "English") {
      setLang("ENG");
    }
  };
  useEffect(() => {}, [lang]);

  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: ["ExploreTab", lang],
      queryFn: ({ pageParam = 1, queryKey }) => {
        const [_, lang] = queryKey as [string, string];
        return getExploreDiaries(pageParam as number, lang);
      },
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
    <div className="flex flex-col w-260 mb-10">
      <div className="mb-5">
        <ValueSettingButton
          title1="한국어"
          title2="English"
          selectedValue={lang}
          onClick={handleLangChange}
        />
      </div>
      {data?.pages.flatMap((page) =>
        page.result.diaries
          .filter(
            (diary) =>
              diary.language === lang && diary.visibility !== "PRIVATE",
          )
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
          {t.CannotLoadList}
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default ExploreTab;
