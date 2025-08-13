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

  const Native_Study_LangMap = {
    KO: { KO: "한국어", ENG: "영어" },
    ENG: { KO: "KOREAN", ENG: "ENGLISH" },
  };

  return (
    <div>
      <div className="h-37 mt-8 rounded-t-[12px] rounded-b-none">
        <div className="grid grid-cols-[1fr_4fr_1fr] px-5">
          <div className="flex justify-start items-center mb-10">
            <Avatar size="w-30 h-30" src={DiaryHeaderProps.profileImg} />
          </div>
          <div className="pb-2 mt-5 text-xl font-bold grid grid-rows-2 gap-4">
            <TitleHeader title={`${DiaryHeaderProps.username} 님의 다이어리`} />
            <div className=" flex text-gray-600">
              <span className="text-[16px] flex gap-3 font-normal">
                <p className="font-bold">@{DiaryHeaderProps.nickname} </p>
                <p>&middot;</p>
                <p className="flex">
                  {DiaryHeaderProps.diaryCount > 1 ? t.Diaries : t.Diary}
                  <p className="font-bold">
                    &nbsp; {DiaryHeaderProps.diaryCount}
                    {t.CountDiary}
                  </p>
                </p>
                <p>&middot;</p>
                <p className="flex">
                  {DiaryHeaderProps.friendCount > 1 ? t.Friends : t.Friend}
                  <p className="font-bold">
                    &nbsp; {DiaryHeaderProps.friendCount}
                    {t.CountFriend}
                  </p>
                </p>
              </span>
            </div>
            <div className="flex text-base gap-3 px-4">
              <div className="flex gap-1 bg-blue-200 rounded-xl p-2">
                <img
                  className="w-4"
                  src="/images/NativeIcon.svg"
                  alt="Native Icon"
                />
                <p className="text-blue-500">
                  모국어&nbsp;|&nbsp;
                  {
                    Native_Study_LangMap[language][
                      DiaryHeaderProps.nativeLanguage as "KO" | "ENG"
                    ]
                  }
                </p>
              </div>
              <div className="flex gap-1 bg-blue-200 rounded-xl p-2">
                <img
                  className="w-4"
                  src="/images/StudyIcon.svg"
                  alt="Study Icon"
                />
                <p className="text-blue-500">
                  학습언어&nbsp;|&nbsp;
                  {
                    Native_Study_LangMap[language][
                      DiaryHeaderProps.language as "KO" | "ENG"
                    ]
                  }
                </p>
              </div>
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
