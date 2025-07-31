// ProvidedCorrectionTab.tsx
import CorrectionComponent from "../CorrectionComponent";
import { useInfiniteCorrectionList } from "../../hooks/useInfiniteCorrectionList"; // your fixed hook

interface ProvidedCorrectionTabProps {
  size?: number;
  lang?: "KO" | "EN";
}

const ProvidedCorrectionTab = ({
  size = 20,
  lang = "KO",
}: ProvidedCorrectionTabProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteCorrectionList(size, lang);

  const corrections = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div>
      <CorrectionComponent
        corrections={corrections}
        loadMore={fetchNextPage}
        hasMore={!!hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        error={isError ? error : undefined}
      />
      {/* fallback/load-more UI if auto-infinite-scroll isn’t inside CorrectionComponent */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          aria-label="Load more corrections"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default ProvidedCorrectionTab;
