import type { DiarySummary } from "../../utils/types/diary";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { postFriendRequest } from "../../apis/friend";
import { useState } from "react";

const DiaryHeaderButton = ({
  DiaryHeaderProps,
}: {
  DiaryHeaderProps: DiarySummary;
}) => {
  const isMyDiary = DiaryHeaderProps.relation === "SELF" ? true : false;
  const { language } = useLanguage();
  const t = translate[language];
  const [requestingUsernames, setRequestingUsernames] = useState<string[]>([]);
  const { memberId } = useParams<{ memberId: string }>();

  const isRequesting = (username: string) =>
    requestingUsernames.includes(username);

  const handleSendRequest = async (username: string) => {
    const receiverIdNum = memberId ? Number(memberId) : undefined;

    // Optimistically update UI
    setRequestingUsernames((prev) =>
      prev.includes(username) ? prev : [...prev, username]
    );

    try {
      if (typeof receiverIdNum === "number" && !isNaN(receiverIdNum)) {
        await postFriendRequest({ receiverId: receiverIdNum });
      } else {
        throw new Error("Invalid memberId");
      }

      // Optionally: do nothing, UI already updated
    } catch (err: any) {
      // Revert optimistic update if it fails
      setRequestingUsernames((prev) => prev.filter((u) => u !== username));
      if (err?.response?.status !== 409) {
        alert(t.friendRequestFailed);
      }
    }
  };

  return (
    <>
      {isMyDiary ? (
        <div className="flex justify-end items-center gap-x-6 relative">
          <Link
            to="/mydiary/writing"
            className="w-auto inline-flex z-10 rounded-[8px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-3 flex flex-row gap-3 items-center justify-center"
          >
            <img src="/images/plusimg.svg" alt="+" /> {t.createNewDiary}
          </Link>
        </div>
      ) : (
        <div className="flex justify-end items-center gap-x-6 relative ">
          <div className="w-auto inline-flex z-10 rounded-[8px] font-bold text-white p-3 flex flex-row gap-3 items-center justify-center">
            {DiaryHeaderProps.relation === "FRIEND" && (
              <div className="flex bg-blue-200 p-3 rounded-2xl">
                <p className="text-blue-500">
                  {language === "KO" ? "친구" : DiaryHeaderProps.relation}
                </p>
              </div>
            )}
            {DiaryHeaderProps.relation !== "FRIEND" &&
              DiaryHeaderProps.status !== "PENDING" &&
              !isRequesting(DiaryHeaderProps.username ?? "") && (
                <div
                  className="cursor-pointer bg-blue-500 p-3 hover:bg-blue-600 active:bg-blue-700 rounded-2xl flex gap-3 justify-center items-center"
                  onClick={() => {
                    handleSendRequest(DiaryHeaderProps.username ?? "");
                  }}
                >
                  <img src="/images/plusimg.svg" alt="+" />
                  <p>{t.RequestFriend}</p>
                </div>
              )}
            {(DiaryHeaderProps.status === "PENDING" ||
              isRequesting(DiaryHeaderProps.username ?? "")) && (
              <div className="flex gap-3 bg-blue-200 rounded-2xl p-3">
                <img src="/images/requestingIcon.svg" alt="Pending" />
                <p className="text-blue-500">{t.pending}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DiaryHeaderButton;
