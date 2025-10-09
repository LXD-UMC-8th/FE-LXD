// 파일 경로: src/components/Corrections/Tabs/ReceivedCorrectionTab.tsx

import LoadingModal from "../../Common/LoadingModal";
import { useEffect } from "react";
import { useSavedCorrections } from "../../../hooks/queries/useSavedCorrections";
import { useInView } from "react-intersection-observer";
import CorrectionComponent from "../CorrectionComponent";
import { translate } from "../../../context/translate";
import { useLanguage } from "../../../context/LanguageProvider";
// 훅에서 사용하고 있는 타입을 가져와야 할 수 있습니다.
// import type { SavedCorrectionItem } from "../../../utils/types/savedCorrection";

const ReceivedCorrectionTab = () => {
  const {
    data, // 👈 이제 data는 {pages: [...]} 가 아니라 최종 배열 [] 입니다!
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useSavedCorrections();

  const { language } = useLanguage();
  const t = translate[language];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <LoadingModal />;

  if (status === "error") {
    return (
      <div className="p-4 text-red-500">
        교정 목록을 불러오지 못했습니다.
        <div className="text-gray-500 text-sm">{String(error)}</div>
      </div>
    );
  }
  
  // 👈 이 부분이 가장 중요합니다!
  // 더 이상 .pages에 접근할 필요 없이, data를 바로 list로 사용합니다.
  const list = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      {list.length === 0 && !isFetching && (
        <div className="p-6 text-center text-gray-500">
          {t.NotSavedCorrection}
        </div>
      )}

      {/* item의 타입이 SavedCorrectionItem으로 잘 추론됩니다. */}
      {list.map((item) => (
        <CorrectionComponent key={item.savedCorrectionId} correction={item} />
      ))}

      <div ref={ref} />

      {isFetchingNextPage && (
        <div className="py-3 text-center text-gray-400">불러오는 중…</div>
      )}
    </div>
  );
};

export default ReceivedCorrectionTab;