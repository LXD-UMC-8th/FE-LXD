import { Outlet } from "react-router-dom";
import { getLocalStorageItem } from "../apis/axios";
import { Navigate } from "react-router-dom";

const HomeLayout = () => {
  if (
    getLocalStorageItem("accessToken") ||
    getLocalStorageItem("refreshToken")
  ) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
