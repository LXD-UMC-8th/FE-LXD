import CorrectionComponent from "../components/CorrectionComponent";
import ModalWithTabs from "../components/ModalWithTabs";

const CorrectionsPage = () => {
  const tabvalue = [
    {
      value: "receivedCorrections",
      title: "내가 받은 교정",
    },
    {
      value: "providedCorrections",
      title: "내가 제공한 교정",
    },
  ];

  return (
    <div className="w-3/5 h-screen bg-gray-100">
      {/* Tabs */}
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default CorrectionsPage;
