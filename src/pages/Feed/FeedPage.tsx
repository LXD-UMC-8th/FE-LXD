import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";

const FeedPage = () => {
  const { language } = useLanguage();
  const t = translate[language];
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const sp = new URLSearchParams(loc.search);

    if (!sp.get("tab")) {
      sp.set("tab", "friendINfeed");
      nav({ pathname: loc.pathname, search: sp.toString() }, { replace: true });
    }
  }, [loc.pathname]);

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
      <div>
        <ModalWithTabs tabvalue={tabvalue} />
      </div>
      <div className="z-10 mx-10 pr-10">
        <CalendarModal />
      </div>
    </div>
  );
};
export default FeedPage;
