import DiaryHeader from "../../components/Diary/DiaryHeader";
import ModalWithTabs from "../../components/Common/ModalWithTabs";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";

const DiaryPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const tabvalue = [
    { value: "totalINdiary", title: t.modaltabtitle_total },
    { value: "likeINdiary", title: t.modaltabtitle_likes },
  ];

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between mx-10">
      <div className="w-full">
        <DiaryHeader />
        {/*다이어리 밑 내용 추가 구분선*/}
        <ModalWithTabs tabvalue={tabvalue} />
      </div>
      <div>
        <div className="z-10 mx-10">
          <CalendarModal />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
