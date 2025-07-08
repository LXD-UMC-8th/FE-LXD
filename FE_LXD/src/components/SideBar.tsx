import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-[240px] bg-white shadow-md px-4 py-6 flex flex-col gap-6">
      <div className="text-xl font-bold">LXD</div>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          피드
        </NavLink>
        <NavLink
          to="/diary"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          다이어리
        </NavLink>
        <NavLink
          to="/corrections"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          나의 교정
        </NavLink>
        <NavLink
          to="/friendslist"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
          }
        >
          친구목록
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col gap-4 text-sm text-gray-500">
        <span>알림</span>
        <span>서비스 설정</span>
        <span>도움말 및 지원</span>
      </div>
    </div>
  );
};

export default Sidebar;
