import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <div className="hidden sm:block">
        <SideBar />
      </div>

      <div
        className="sm:ml-60 w-full pt-22 bg-gray-100 min-h-screen items-center flex sm:block justify-center items-center
    `}"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
