import type { DiarySummary } from "../../utils/types/diary";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { postFriendRequest } from "../../apis/friend";
import { useState } from "react";
import type { Friend } from "../../utils/types/friend";

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
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);

  const isRequesting = (username: string) =>
    requestingUsernames.includes(username);

  const handleSendRequest = async (username: string) => {
    let successOrAlreadySent = false;
    try {
      const receiverIdNum = memberId ? Number(memberId) : undefined;
      if (typeof receiverIdNum === "number" && !isNaN(receiverIdNum)) {
        await postFriendRequest({ receiverId: receiverIdNum });
      } else {
        throw new Error("Invalid memberId");
      }
      successOrAlreadySent = true;
    } catch (err: any) {
      console.error("❌ 친구 요청 실패: ", err);
      if (err?.response?.status === 409) successOrAlreadySent = true;
      else alert(t.friendRequestFailed);
    }

    if (successOrAlreadySent) {
      setRequestingUsernames((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );
      setSelectedUser((prev) =>
        prev?.username === username ? { ...prev } : prev
      );
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
                <p className="text-blue-500">{DiaryHeaderProps.relation}</p>
              </div>
            )}
            {DiaryHeaderProps.relation !== "FRIEND" &&
              DiaryHeaderProps.status !== "PENDING" && (
                <div
                  className="cursor-pointer bg-blue-500 p-3 hover:bg-blue-600 active:bg-blue-700 rounded-2xl"
                  onClick={() => {
                    handleSendRequest(DiaryHeaderProps.username ?? "");
                  }}
                >
                  <p>{t.RequestFriend}</p>
                </div>
              )}
            {DiaryHeaderProps.status === "PENDING" && (
              <div className="flex gap-3 bg-blue-200 rounded-2xl p-3">
                <img src="/images/requestingIcon.svg" alt="Pending" />
                <p className="text-blue-500">{DiaryHeaderProps.status}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DiaryHeaderButton;
