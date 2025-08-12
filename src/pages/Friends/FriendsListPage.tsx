import ModalWithTabs from "../../components/Common/ModalWithTabs";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const FriendsListPage = () => {
  const { language } = useLanguage();                         
  const t = translate[language];
  const tabvalue = [
    { value: "findINfriend", title: t.tabFind },
    { value: "friendINfriend", title: t.tabFriends, count: 5 },
    { value: "requestINfriend", title: t.tabRequests, count: 19 },
  ];

  return (
    <div className="bg-gray-100 mx-10">
      {/* 탭 메뉴 */}
      <ModalWithTabs tabvalue={tabvalue} />
    </div>
  );
};

export default FriendsListPage;
