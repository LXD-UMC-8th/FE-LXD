import SideBarNavLink from "./SideBarNavLink";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 inset-y-0 z-0  bg-white shadow-md px-4 py-6 flex flex-col gap-6 w-[200px]">
      {/* <div className="text-xl font-bold">LXD</div> */}
      <nav className="flex flex-col mt-10">
        <SideBarNavLink
          imgSrcOn="/images/FeedOnIcon.svg"
          imgSrcOff="/images/FeedOffIcon.svg"
          toURL="/feed"
          label="피드"
          alt="피드 아이콘"
        />
        <SideBarNavLink
          imgSrcOn="/images/DiaryOnIcon.svg"
          imgSrcOff="/images/DiaryOffIcon.svg"
          toURL="/mydiary"
          label="나의 다이어리"
          alt="나의 다이어리 아이콘"
        />
        <SideBarNavLink
          imgSrcOn="/images/CorrectOnIcon.svg"
          imgSrcOff="/images/CorrectOffIcon.svg"
          toURL="/corrections"
          label="나의 교정"
          alt="교정 아이콘"
        />
        <SideBarNavLink
          imgSrcOn="/images/FriendOnIcon.svg"
          imgSrcOff="/images/FriendOffIcon.svg"
          toURL="/friendslist"
          label="친구"
          alt="친구 아이콘"
        />
      </nav>

      <div className="mt-auto flex items-center gap-[12px] w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] text-gray-600 font-semibold cursor-pointer hover:scale-105 transition-transform duration-300">
        <SideBarNavLink
          imgSrcOn=""
          imgSrcOff="/images/SettingIcon.svg"
          toURL="/settings"
          label="시스템 설정"
          alt="설정 아이콘"
        />
      </div>
    </div>
  );
};

export default Sidebar;
