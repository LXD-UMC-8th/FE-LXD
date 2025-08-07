import DiaryHeader from "../../components/Diary/DiaryHeader";
import CalendarModal from "../../components/Common/CalendarModal";
import { translate } from "../../context/translate";
import { useLanguage } from "../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { getDiaryMySummary, getUserDiarySummary } from "../../apis/diary";
import type { DiarySummary } from "../../utils/types/diary";
import CommonComponentInDiaryNFeed from "../../components/Common/CommonComponentInDiaryNFeed";

const UserDetailPage = (memberId: number) => {
  // const { language } = useLanguage();
  // const t = translate[language];
  const [_isDiarySummary, setIsDiarySummary] = useState<DiarySummary>({
    profileImg: "",
    username: "",
    nickname: "",
    diaryCount: 0,
    friendCount: 0,
    relation: "",
    status: "",
  });

  useEffect(() => {
    getUserDiarySummary(memberId).then((response) => {
      setIsDiarySummary(response.result);
    });
  }, []);

  return (
    <div className="bg-gray-100 flex flex-cols gap-10 justify-between ml-10">
      <div>
        <DiaryHeader DiaryHeaderProps={_isDiarySummary} />
        {/* <CommonComponentInDiaryNFeed/> */}
      </div>
      <div>
        <div className="z-10 mx-10">
          <CalendarModal />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
