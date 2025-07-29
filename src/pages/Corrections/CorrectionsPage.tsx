import ModalWithTabs from "../../components/Common/ModalWithTabs";

const CorrectionsPage = () => {

  const tabvalue = [
      { value: "receivedCorrections", title: "내가 받은 교정" },
      { value: "providedCorrections", title: "내가 제공한 교정" },
    ]

  return (
    <div className="w-[600px] min-h-screen bg-gray-100">
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default CorrectionsPage;
