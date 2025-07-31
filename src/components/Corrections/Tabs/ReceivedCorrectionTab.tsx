import { useEffect } from "react";
import { useGetCorrections } from "../../../hooks/mutations/useGetCorrections";
import type { CorrectionsDetailDTO } from "../../../utils/types/correction";
import CorrectionComponent from "../CorrectionComponent"
import LoadingModal from "../../Common/LoadingModal";

const ReceivedCorrectionTab = () => {

  const { 
    mutate: fetchCorrections, 
    data: correctionData, 
    isPending,
  } = useGetCorrections();

  useEffect(() => {
    fetchCorrections({diaryId: 1, page: 0, size: 10 });
  }, [fetchCorrections]);

  return (
    <div className="flex flex-col gap-4">
      {isPending && <LoadingModal />}
      {correctionData?.result.corrections.map((correction: CorrectionsDetailDTO) => (
        <CorrectionComponent key={correction.correctionId} correction={correction} />
      ))}
    </div>
  )
}

export default ReceivedCorrectionTab;
