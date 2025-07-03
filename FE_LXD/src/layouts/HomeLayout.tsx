import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
