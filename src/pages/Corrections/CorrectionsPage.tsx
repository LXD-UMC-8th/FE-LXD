import ModalWithTabs from "../../components/Common/ModalWithTabs";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const CorrectionsPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const tabvalue = [
    { value: "receivedCorrections", title: t.receivedCorrections },
    { value: "providedCorrections", title: t.givenCorrections },
  ];

  return (
    <div className="w-260 mb-10 ml-10 min-h-screen bg-gray-100">
      <ModalWithTabs key={language} tabvalue={tabvalue} />
    </div>
  );
};

export default CorrectionsPage;
