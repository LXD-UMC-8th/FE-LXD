// src/pages/Friends/FriendsListPage.tsx
import { useEffect, useState } from "react";
import ModalWithTabs from "../../components/Common/ModalWithTabs";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";
import { getFriends, getFriendRequests } from "../../apis/friend";
import type {
  FriendListResponseDTO,
  FriendRequestListResponseDTO,
} from "../../utils/types/friend";

const FriendsListPage = () => {
  const { language } = useLanguage();
  const t = translate[language];

  // 탭 카운트 상태
  const [friendCount, setFriendCount] = useState<number>(0);
  const [requestsCount, setRequestsCount] = useState<number>(0);

  useEffect(() => {
    // 친구 수, 요청(받은+보낸) 수 동시 조회
    const fetchCounts = async () => {
      try {
        // 1) 친구 수
        const friendsRes: FriendListResponseDTO = await getFriends(1, 1); // size=1로 total만 가져와도 OK
        const fTotal =
          friendsRes?.result?.friends?.totalElements ??
          friendsRes?.result?.friends?.contents?.length ??
          0;
        setFriendCount(fTotal);

        // 2) 요청 수(받은 + 보낸)
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
  }, []); // 언어 변경 시 재조회가 필요하면 [language]로 바꾸세요.

  const tabvalue = [
    { value: "findINfriend", title: t.tabFind },
    { value: "friendINfriend", title: t.tabFriends, count: friendCount },
    { value: "requestINfriend", title: t.tabRequests, count: requestsCount },
  ];

  return (
    <div className="bg-gray-100 mx-10">
      {/* 탭 메뉴 */}
      <ModalWithTabs key={language} tabvalue={tabvalue} />
    </div>
  );
};

export default FriendsListPage;
