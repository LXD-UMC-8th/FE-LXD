import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import { useMemo } from "react";

const FeedPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const tabvalue = useMemo(
    () => [
      { value: "friendINfeed", title: t.Friends },
      { value: "searchINfeed", title: t.explore },
      { value: "likeINfeed", title: t.Likes },
    ],
    [t]
  );

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between mx-10">
      <div className="">
        <ModalWithTabs key={language} tabvalue={tabvalue} />
      </div>
      <div className="z-10 mx-10 pr-10">
        <CalendarModal />
      </div>
    </div>
  );
};
export default FeedPage;
