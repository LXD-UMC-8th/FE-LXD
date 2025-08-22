import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { getFriendsDiaries } from "../../../apis/diary";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import type {
  diaries,
  getDiariesResponseDTO,
} from "../../../utils/types/diary";
import { useEffect, useMemo } from "react";
import { translate } from "../../../context/translate";
import { useLanguage } from "../../../context/LanguageProvider";
import { QUERY_KEY } from "../../../constants/key";
import { useAuth } from "../../../hooks/useAuth";
import { useFriendSet } from "../../../hooks/queries/useFriendSet";

const FeedFriendTab = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const { isLoggedIn } = useAuth();
  const { friendSet } = useFriendSet();

  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.FriendsDiaries],
      queryFn: ({ pageParam = 1 }) => getFriendsDiaries(pageParam as number),
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  const { ref, inView } = useInView();

  const canSee = (item: diaries) => {
    const vis = (item.visibility || "").toUpperCase();
    // PRIVATE
    if (vis === "PRIVATE") return false;
    // FRIENDS
    if (vis === "FRIENDS") {
      const writerId = item.writerId ?? null;
      if (!isLoggedIn || writerId == null) return false;
      return friendSet.has(writerId);
    }
    // PUBLIC
    return true;
  };

  const visibleItems = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        (page.result.contents || []).filter(canSee)
      ) || []
    );
  }, [data, isLoggedIn, friendSet]);

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
      console.log("Fetching next page of friends' diaries:", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const isInitialEmpty =
    (data?.pages?.[0]?.result?.contents?.filter(canSee).length ?? 0) === 0 &&
    !(data?.pages?.[0]?.result?.hasNext ?? false);

  return (
    <div className="w-260 mb-10">
      {visibleItems.map((d) => (
        <CommonComponentInDiaryNFeed key={d.diaryId} props={d} />
      ))}

      {isInitialEmpty && (
        <div className="text-grey-500 text-center mt-4">{t.FriendFeedX}</div>
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

      <div ref={ref} aria-hidden />
    </div>
  );
};

export default FeedFriendTab;
