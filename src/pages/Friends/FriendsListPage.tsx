import { useEffect, useState } from "react";
import ModalWithTabs from "../../components/Common/ModalWithTabs";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getFriends, getFriendRequests } from "../../apis/friend";
import type {
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
} from "../../utils/types/friend";
import { FriendCountsProvider } from "../../context/FriendCountsContext"; // ✅ 추가

const FriendsListPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  const [friendCount, setFriendCount] = useState<number>(0);
  const [requestsCount, setRequestsCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const friendsRes: FriendListResponseDTO = await getFriends(1, 1);
        const fTotal =
          friendsRes?.result?.friends?.totalElements ??
          friendsRes?.result?.friends?.contents?.length ??
          0;
        setFriendCount(fTotal);

        const reqRes: FriendRequestListResponseDTO = await getFriendRequests();
        const rTotal =
          (reqRes?.result?.receivedRequests?.totalElements ??
            reqRes?.result?.receivedRequests?.contents?.length ??
            0) +
          (reqRes?.result?.sentRequests?.totalElements ??
            reqRes?.result?.sentRequests?.contents?.length ??
            0);
        setRequestsCount(rTotal);
      } catch (e) {
        console.error("❌ 탭 카운트 조회 실패:", e);
        setFriendCount(0);
        setRequestsCount(0);
      }
    };
    fetchCounts();
  }, []);

  const tabvalue = [
    { value: "findINfriend", title: t.tabFind },
    { value: "friendINfriend", title: t.tabFriends, count: friendCount },
    { value: "requestINfriend", title: t.tabRequests, count: requestsCount },
  ];

  return (
    <FriendCountsProvider
      value={{ friendCount, requestsCount, setFriendCount, setRequestsCount }}
    >
      <div className="bg-gray-100 mx-10">
        <ModalWithTabs key={language} tabvalue={tabvalue} />
      </div>
    </FriendCountsProvider>
  );
};

export default FriendsListPage;
