import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingModal from "../../Common/LoadingModal";
import CorrectionComponent from "../CorrectionComponent";
import { useProvidedCorrections } from "../../../hooks/queries/useProvidedCorrections";
import { useLanguage } from "../../../context/LanguageProvider";
import { translate } from "../../../context/translate";

const ProvidedCorrectionTab = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const {
    data,              
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,           
    error,
  } = useProvidedCorrections();

  const { ref, inView } = useInView({ rootMargin: "200px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const list = data ?? [];
  const isInitialLoading = status === "pending" && list.length === 0;

  if (isInitialLoading) return <LoadingModal />;

  if (status === "error") {
    return (
      <div className="p-4 text-red-500">
        {t.FailToLoadCorrections}
        <div className="text-gray-500 text-sm">{String(error)}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {list.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          {t.NothingCreatedCorrection}
        </div>
      )}

      {list.map((item) => (
        <CorrectionComponent key={item.correctionId} correction={item} />
      ))}

      {/* 무한스크롤 트리거 */}
      <div ref={ref} />

      {isFetching && status === "success" && (
        <div className="py-3 text-center text-gray-400">{t.Loading}</div>
      )}
    </div>
  );
};

export default ProvidedCorrectionTab;
