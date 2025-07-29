import ModalWithTabs from "../../components/Common/ModalWithTabs";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const CorrectionsPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const tabvalue = [
      { value: "receivedCorrections", title: t.receivedCorrections },
      { value: "providedCorrections", title: t.givenCorrections },
    ]

  return (
    <div className="w-[600px] min-h-screen bg-gray-100">
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default CorrectionsPage;
