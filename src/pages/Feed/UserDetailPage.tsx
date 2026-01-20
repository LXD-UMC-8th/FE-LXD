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
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEY } from "../../constants/key";
import PrevButton from "../../components/Common/PrevButton";

const UserDetailPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNumber = memberId ? parseInt(memberId, 10) : undefined;
  const navigate = useNavigate();

  const [_isDiarySummary, setIsDiarySummary] = useState<DiarySummary>({
    memberProfile: {
      id: 0,
      username: "",
      nickname: "",
      profileImage: "",
    },
    diaryCount: 0,
    friendCount: 0,
    relation: "",
    status: "",
    language: "",
    nativeLanguage: "",
  });

  useEffect(() => {
    getUserDiarySummary(memberIdNumber).then((response) => {
      if (response.result.relation === "SELF") {
        navigate("/mydiary");
      }
      setIsDiarySummary(response.result);
    });
  }, []);

  const { ref, inView } = useInView();
  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.UserDiary, memberId],
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
        <div className="px-5">
          <PrevButton navigateURL={-1} />
        </div>

        <DiaryHeader DiaryHeaderProps={_isDiarySummary} />
        {/* <CommonComponentInDiaryNFeed/> */}
        <div className="mt-15">
          {data?.pages.flatMap((page) =>
            page.result.contents.map((data) => (
              <CommonComponentInDiaryNFeed
                key={data.diaryId}
                props={data}
                // pageResult={page.result}
                // idx={idx}
              />
            )),
          )}
        </div>
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
