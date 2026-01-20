import CommonComponentSkeleton from "../../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../../Common/CommonComponentInDiaryNFeed";
import { useEffect, useMemo } from "react";
import { useInfiniteScroll } from "../../../hooks/queries/useInfiniteScroll";
import { getDiaryDetail, getLikedDiaries } from "../../../apis/diary";
import type {
  diaries,
  getDiariesResponseDTO,
} from "../../../utils/types/diary";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";
import { QUERY_KEY } from "../../../constants/key";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { useFriendSet } from "../../../hooks/queries/useFriendSet";

const LikesTab = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { isLoggedIn } = useAuth();
  const { friendSet } = useFriendSet();

  const { data, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteScroll({
      queryKey: [QUERY_KEY.LikesTab],
      queryFn: ({ pageParam = 1 }) => getLikedDiaries(pageParam as number),
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last.result.hasNext ? last.result.page + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) fetchNextPage();
      console.log("Fetching next page of liked diaries:", data);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // ---- 가시성 & 친구 여부 안전 필터 ----
  const normalizeVisibility = (v?: string) => (v || "").trim().toUpperCase();
  const isFriendVisibility = (v?: string) =>
    /^(FRIEND|FRIENDS|FRIEND[_\- ]?ONLY)$/.test(normalizeVisibility(v));
  const toNum = (x: unknown) => {
    const n = Number(x);
    return Number.isFinite(n) ? n : NaN;
  };

  const canSee = (item: diaries) => {
    const vis = normalizeVisibility(item.visibility);
    const writer = toNum(item.writerMemberProfile.id);

    if (vis === "PUBLIC") return true;
    if (vis === "PRIVATE") return false;

    if (isFriendVisibility(vis)) {
      if (!isLoggedIn || !Number.isFinite(writer)) return false;
      return friendSet.has(writer);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn("[LikesTab] Unknown visibility:", item.visibility, item);
    }
    return false;
  };

  const visibleItems = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        (page.result.contents || []).filter(canSee),
      ) || []
    );
  }, [data, isLoggedIn, friendSet]);

  const openDiary = async (diaryId?: number) => {
    if (!diaryId) return;
    await queryClient.ensureQueryData({
      queryKey: [QUERY_KEY.DiaryDetail, diaryId],
      queryFn: () => getDiaryDetail(diaryId),
      staleTime: 30_000,
    });

    navigate(
      {
        pathname: `/feed/${diaryId}`,
        search: location.search,
      },
      { replace: true },
    );
  };

  return (
    <div className="flex flex-col w-260 mb-10">
      {visibleItems.map((d) => (
        <div
          key={d.diaryId}
          role="button"
          tabIndex={0}
          aria-label={`Open diary ${d.diaryId}`}
          title={`Open diary ${d.diaryId}`}
          onClick={() => openDiary(d.diaryId)}
          onKeyDown={(e) => e.key === "Enter" && openDiary(d.diaryId)}
        >
          <CommonComponentInDiaryNFeed props={d} />
        </div>
      ))}

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
