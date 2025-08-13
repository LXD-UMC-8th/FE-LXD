import LoadingModal from "../../Common/LoadingModal";
import { useEffect } from "react";
import { useSavedCorrections } from "../../../hooks/queries/useSavedCorrections";
import { useInView } from "react-intersection-observer";
import CorrectionComponent from "../CorrectionComponent";

const ReceivedCorrectionTab = () => {
  const {
    data,              // SavedCorrectionItem[]
    fetchNextPage,
    hasNextPage,
    isFetching,        // 다음 페이지 로딩 여부(초기에도 true가 될 수 있음)
    status,            // 'pending' | 'success' | 'error'
    error,
  } = useSavedCorrections();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // 1) 초기 로딩
  if (status === "pending") return <LoadingModal />;

  // 2) 에러 표시(500 등)
  if (status === "error") {
    return (
      <div className="p-4 text-red-500">
        교정 목록을 불러오지 못했습니다.
        <div className="text-gray-500 text-sm">{String(error)}</div>
      </div>
    );
  }

  // 여기까지 오면 success
  const list = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      {/* 3) 빈 목록 안내 */}
      {list.length === 0 && (
        <div className="p-6 text-center text-gray-500">저장된 교정이 없습니다.</div>
      )}

      {list.map((item) => (
        <CorrectionComponent
          key={item.savedCorrectionId}
          correction={item}
        />
      ))}

      {/* 무한스크롤 트리거 */}
      <div ref={ref} />

      {/* 4) 다음 페이지 로딩 중 표시 (초기 로딩과 분리) */}
      {isFetching && status === "success" && (
        <div className="py-3 text-center text-gray-400">불러오는 중…</div>
      )}
    </div>
  );
};

export default ReceivedCorrectionTab;
