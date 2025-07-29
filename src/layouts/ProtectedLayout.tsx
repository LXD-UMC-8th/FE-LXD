import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="flex relative min-h-screen bg-gray-100 justify-center">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <aside className="hidden lg:block lg:w-50">
        <SideBar />
      </aside>

      <main className="pt-8 mt-14 px-4 bg-gray-100 flex-1 overflow-x-auto items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
