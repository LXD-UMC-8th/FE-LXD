import SideBarNavLink from "./SideBarNavLink";
import { useLanguage } from "../../context/LanguageProvider";
import { translate } from "../../context/translate";

const Sidebar = () => {
  const { language } = useLanguage();
  const t = translate[language];
  return (
    <div className="fixed top-0 left-0 inset-y-0 z-20 bg-white py-6 flex flex-col gap-6 w-[200px] items-center ">
      {/* <div className="text-xl font-bold">LXD</div> */}
      <nav className="flex flex-col mt-10">
        <SideBarNavLink
          imgSrcOn="/images/FeedOnIcon.svg"
          imgSrcOff="/images/FeedOffIcon.svg"
          toURL="/feed"
          label={t.SidebarFeed}
          alt="feed icon"
        />
        <SideBarNavLink
          imgSrcOn="/images/DiaryOnIcon.svg"
          imgSrcOff="/images/DiaryOffIcon.svg"
          toURL="/mydiary"
          label={t.SidebarDiary}
          alt="my diary icon"
        />
        <SideBarNavLink
          imgSrcOn="/images/CorrectOnIcon.svg"
          imgSrcOff="/images/CorrectOffIcon.svg"
          toURL="/corrections"
          label={t.SidebarCorrections}
          alt="my corrections icon"
        />
        <SideBarNavLink
          imgSrcOn="/images/FriendOnIcon.svg"
          imgSrcOff="/images/FriendOffIcon.svg"
          toURL="/friendslist"
          label={t.SidebarFriends}
          alt="my friends icon"
        />
      </nav>

      <div className="mt-auto flex items-center py-[15px]">
        <SideBarNavLink
          imgSrcOn="/images/SettingOnIcon.svg"
          imgSrcOff="/images/SettingOffIcon.svg"
          toURL="/settings"
          label={t.SidebarSettings}
          alt="settings icon"
        />
      </div>
    </div>
  );
};

export default Sidebar;
