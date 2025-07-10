import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-[240px] bg-white shadow-md px-4 py-6 flex flex-col gap-6">
      {/* <div className="text-xl font-bold">LXD</div> */}
      <nav className="flex flex-col">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            [
              "flex items-center gap-[12px]",
              "w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] hover:scale-105 transition-transform duration-300",
              isActive
                ? "bg-[#F1F5FD] text-blue-600 font-semibold"
                : "text-gray-600 font-semibold"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <img 
                src={isActive ? "/images/FeedOnIcon.svg" : "/images/FeedOffIcon.svg"}
                alt="피드 아이콘"
              />
              피드
            </>
          )}
        </NavLink>
        <NavLink
          to="/diary"
          className={({ isActive }) =>
            [
              "flex items-center gap-[12px]",
              "w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] hover:scale-105 transition-transform duration-300",
              isActive
                ? "bg-[#F1F5FD] text-blue-600 font-semibold"
                : "text-gray-600 font-semibold"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <img 
                src={isActive ? "/images/DiaryOnIcon.svg" : "/images/DiaryOffIcon.svg"}
                alt="다이어리 아이콘"
              />
              나의 다이어리
            </>
          )}
        </NavLink>
        <NavLink
          to="/corrections"
          className={({ isActive }) =>
            [
              "flex items-center gap-[12px]",
              "w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] hover:scale-105 transition-transform duration-300",
              isActive
                ? "bg-[#F1F5FD] text-blue-600 font-semibold"
                : "text-gray-600 font-semibold"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <img 
                src={isActive ? "/images/CorrectOnIcon.svg" : "/images/CorrectOffIcon.svg"}
                alt="교정 아이콘"
              />
              나의 교정
            </>
          )}
        </NavLink>
        <NavLink
          to="/friendslist"
          className={({ isActive }) =>
            [
              "flex items-center gap-[12px]",
              "w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] hover:scale-105 transition-transform duration-300",
              isActive
                ? "bg-[#F1F5FD] text-blue-600 font-semibold"
                : "text-gray-600 font-semibold"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <img 
                src={isActive ? "/images/FriendOnIcon.svg" : "/images/FriendOffIcon.svg"}
                alt="친구"
              />
              친구
            </>
          )}
        </NavLink>
      </nav>

      <button
        className="mt-auto flex items-center gap-[12px] w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] text-gray-600 font-semibold cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <img
          src="/images/SettingIcon.svg"
          alt="설정 아이콘"
          className="w-[23px] h-[22px]"
        />
        서비스 설정
      </button>
    </div>
  );
};

export default Sidebar;
