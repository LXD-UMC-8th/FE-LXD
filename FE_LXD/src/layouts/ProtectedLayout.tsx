import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="">
        <SideBar />
      </div>
      <div className="ml-[240px] p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
