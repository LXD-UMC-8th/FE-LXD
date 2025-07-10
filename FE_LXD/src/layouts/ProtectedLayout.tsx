import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <div className="">
        <SideBar />
      </div>

      <div className="ml-60 pt-16 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
