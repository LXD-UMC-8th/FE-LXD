import DiaryHeader from "../../components/Diary/DiaryHeader";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { getUserDiarySummary } from "../../apis/diary";
import type { DiarySummary } from "../../utils/types/diary";
import CommonComponentInDiaryNFeed from "../../components/Common/CommonComponentInDiaryNFeed";
import { useInView } from "react-intersection-observer";
import CommonComponentSkeleton from "../../components/Common/CommonComponentSkeleton";
import { useInfiniteScroll } from "../../hooks/queries/useInfiniteScroll";
import { getUserDiaries } from "../../apis/diary";
import type { getDiariesResponseDTO } from "../../utils/types/diary";
import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNumber = memberId ? parseInt(memberId, 10) : undefined;

  const [_isDiarySummary, setIsDiarySummary] = useState<DiarySummary>({
    profileImg: "",
    username: "",
    nickname: "",
    diaryCount: 0,
    friendCount: 0,
    relation: "",
    status: "",
  });

  useEffect(() => {
    getUserDiarySummary(memberIdNumber).then((response) => {
      setIsDiarySummary(response.result);
    });
  }, []);

  const { ref, inView } = useInView();
  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: ["UserDiary", memberId],
      queryFn: ({ pageParam = 1, queryKey }) => {
        const [_, memberId] = queryKey as [string, number];
        return getUserDiaries(memberId, pageParam as number);
      },
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between ml-10">
      <div>
        <DiaryHeader DiaryHeaderProps={_isDiarySummary} />
        {/* <CommonComponentInDiaryNFeed/> */}
        {data?.pages.flatMap((page) =>
          page.result.diaries.map((data, _idx) => (
            <CommonComponentInDiaryNFeed
              key={data.diaryId}
              props={data}
              // pageResult={page.result}
              // idx={idx}
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
      <div>
        <div className="z-10 mx-10">
          <CalendarModal />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
