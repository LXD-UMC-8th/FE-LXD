import { Outlet } from "react-router-dom";
import { getLocalStorageItem } from "../apis/axios";
import { Navigate } from "react-router-dom";
import { HomeLanguageProvider } from "../context/HomeLanguageProvider";

const HomeLayout = () => {
  if (
    getLocalStorageItem("accessToken") ||
    getLocalStorageItem("refreshToken")
  ) {
    return <Navigate to="/" replace />;
  }
  return (
    <HomeLanguageProvider>
      <div className="min-h-screen bg-white">
        <Outlet />
      </div>
    </HomeLanguageProvider>
  );
};

export default HomeLayout;
