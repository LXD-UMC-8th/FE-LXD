import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div
      className="min-h-screen bg-white"
    >
      <Outlet />
    </div>
  );
};

export default HomeLayout;
