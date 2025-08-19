import ValueSettingButton from "../../Common/ValueSettingButton";
import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getDiaryDetail, getExploreDiaries } from "../../../apis/diary";
import type {
  diaries,
  getDiariesResponseDTO,
} from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/key";

const ExploreTab = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { language } = useLanguage();
  const t = translate[language];
  const titleKorean = "한국어";
  const titleEnglish = "English";
  const [lang, setLang] = useState<string>("KO");
  const handleLangChange = (value: string) => {
    if (value === titleKorean) {
      setLang("KO");
    } else if (value === titleEnglish) {
      setLang("ENG");
    }
  };

  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.ExploreTab, lang],
      queryFn: ({ pageParam = 1, queryKey }) => {
        const [_, lang] = queryKey as [string, string];
        return getExploreDiaries(pageParam as number, lang);
      },
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
      console.log("Fetching next page of friends' diaries:", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleOpenDiary = async (diaryId?: number) => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.DiaryDetail, diaryId],
      queryFn: () => getDiaryDetail(diaryId || 0),
      staleTime: 30_000,
    });

    navigate(`/feed/${diaryId}`);
  };

  return (
    <div className="flex flex-col w-260 mb-10">
      <div className="mb-5">
        <ValueSettingButton
          title1={titleKorean}
          title2={titleEnglish}
          onClick={handleLangChange}
        />
      </div>
      {data?.pages.flatMap((page) =>
        page.result.contents
          .filter(
            (contents: diaries) =>
              contents.language === lang && contents.visibility !== "PRIVATE"
          )
          .map((d: diaries) => (
            <div
              key={d.diaryId}
              role="button"
              tabIndex={0}
              aria-label={`Open diary ${d.diaryId}`}
              title={`Open diary ${d.diaryId}`}
              onClick={() => handleOpenDiary(d.diaryId)}
              onKeyDown={(e) => e.key === "Enter" && handleOpenDiary(d.diaryId)}
            >
              <CommonComponentInDiaryNFeed props={d} />
            </div>
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

export default ExploreTab;
