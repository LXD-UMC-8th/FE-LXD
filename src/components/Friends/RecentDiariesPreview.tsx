// src/components/Friends/RecentDiariesPreview.tsx
import { useEffect } from "react";
import CommonComponentSkeleton from "../Common/CommonComponentSkeleton";
import CommonComponentInDiaryNFeed from "../Common/CommonComponentInDiaryNFeed";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserDiaries, getDiaryDetail } from "../../apis/diary";
import type { getDiariesResponseDTO, diaries } from "../../utils/types/diary";
import { useLanguage } from "../../context/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  memberId: number;
}

const RecentDiariesPreview = ({ memberId }: Props) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ["userDiaries", memberId],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getUserDiaries(memberId, pageParam as number),
      getNextPageParam: (last: getDiariesResponseDTO) =>
        last?.result?.hasNext ? (last.result.page ?? 1) + 1 : undefined,
      staleTime: 30_000,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const openDiary = async (diaryId?: number) => {
    if (!diaryId) return;
    await qc.prefetchQuery({
      queryKey: ["diaryDetail", diaryId],
      queryFn: () => getDiaryDetail(diaryId),
      staleTime: 30_000,
    });
    navigate(`/feed/${diaryId}`);
  };

  const items: diaries[] =
    data?.pages.flatMap((p) => p?.result?.diaries ?? []) ?? [];

  // 안전 라벨 (번역키 없이)
  const recentTitle = language === "KO" ? "최근 일기" : "Recent diaries";
  const viewMoreLabel = language === "KO" ? "더보기" : "View more";
  const cannotLoad =
    language === "KO" ? "목록을 불러올 수 없어요." : "Cannot load list.";

  return (
    <section className="mt-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-2">
        <h3 className="text-base font-semibold text-gray-900">{recentTitle}</h3>
        <button
          onClick={() => navigate(`/diaries/member/${memberId}`)}
          className="inline-flex items-center gap-1 text-sm text-[#4170FE] font-medium hover:underline"
        >
          {viewMoreLabel}
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 리스트 래퍼: 폭 제한 → 피그마 느낌으로 슬림하게 */}
      <div className="w-full max-w-[680px] space-y-3">
        {items.map((d) => (
          <div
            key={d.diaryId}
            role="button"
            tabIndex={0}
            onClick={() => openDiary(d.diaryId)}
            onKeyDown={(e) => e.key === "Enter" && openDiary(d.diaryId)}
            title={`Open diary ${d.diaryId}`}
            className="
              rounded-2xl border border-gray-200 bg-white px-5 py-4
              hover:shadow-sm transition-shadow
              /* 내부 공용 컴포넌트 자식 이미지 사이즈/라운드 보정 */
              [&_img]:rounded-xl [&_img]:object-cover [&_img]:w-[148px] [&_img]:h-[108px]
            "
          >
            <CommonComponentInDiaryNFeed props={d} />
          </div>
        ))}

        {isFetching && (
          <div className="space-y-3">
            <CommonComponentSkeleton />
            <CommonComponentSkeleton />
          </div>
        )}

        {isError && (
          <div className="text-gray-500 text-sm mt-2">{cannotLoad}</div>
        )}

        {/* 무한 스크롤 센티넬 */}
        <div ref={ref} />
      </div>
    </section>
  );
};

export default RecentDiariesPreview;
