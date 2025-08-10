import TitleHeader from "../Common/TitleHeader";
import Avatar from "../Common/Avatar";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { Link } from "react-router-dom";
import type { DiarySummary } from "../../utils/types/diary";

const DiaryHeader = ({
  DiaryHeaderProps,
}: {
  DiaryHeaderProps: DiarySummary;
}) => {
  const { language } = useLanguage();
  const t = translate[language];

  return (
    <div>
      <div className="h-37 mt-8 rounded-t-[12px] rounded-b-none">
        <div className="grid grid-cols-[1fr_4fr_1fr] px-5">
          <div className="flex justify-start items-center">
            <Avatar size="w-30 h-30" src={DiaryHeaderProps.profileImg} />
          </div>
          <div className="pb-2 mt-5 text-xl font-bold grid grid-rows-2 gap-4">
            <TitleHeader title={`${DiaryHeaderProps.username} 님의 다이어리`} />
            <div className="text-[16px] font-normal flex text-gray-600">
              <span className="flex gap-3">
                <p>{DiaryHeaderProps.nickname} </p>
                <p>&middot;</p>
                <p>
                  {DiaryHeaderProps.diaryCount > 1 ? t.Diaries : t.Diary}
                  &nbsp; {DiaryHeaderProps.diaryCount}
                  {t.CountDiary}
                </p>
                <p>&middot;</p>
                <p>
                  {DiaryHeaderProps.friendCount > 1 ? t.Friends : t.Friend}
                  &nbsp; {DiaryHeaderProps.friendCount}
                  {t.CountFriend}
                </p>
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-6 relative">
            <Link
              to="/mydiary/writing"
              className="w-auto inline-flex z-10 rounded-[8px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-3 flex flex-row gap-3 items-center justify-center"
            >
              <img src="/images/plusimg.svg" alt="+" /> {t.createNewDiary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryHeader;
