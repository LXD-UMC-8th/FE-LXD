import { useEffect } from "react";
import { useGetCorrections } from "../../../hooks/mutations/useGetCorrections";
import CorrectionComponent from "../CorrectionComponent";
import LoadingModal from "../../Common/LoadingModal";
import type { CorrectionsDetailDTO } from "../../../utils/types/correction";

const ReceivedCorrectionTab = () => {
  const {
    mutate: fetchCorrections,
    data: correctionData,
    isPending, // React Query v5에서는 isPending, v4에서는 isLoading
  } = useGetCorrections();

  // useEffect에서 mutate 호출
  useEffect(() => {
    fetchCorrections({ diaryId: 1, page: 1, size: 10 });
    // fetchCorrections는 useCallback으로 감싸지 않았다면 eslint-disable 해주는 게 안전
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isPending && <LoadingModal />}
      {correctionData?.result.corrections?.contents?.map(
        (correction: CorrectionsDetailDTO) => (
        <CorrectionComponent
          key={correction.correctionId}
          correction={correction}
        />
      ))}
    </div>
  );
};

export default ReceivedCorrectionTab;
