import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  
  return (
    <div className="flex relative min-h-screen bg-gray-100 justify-center">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <aside className="hidden sm:block sm:w-50">
        <SideBar />
      </aside>

      <main className="pt-8 mt-14 px-4 bg-gray-100 flex-1 overflow-x-auto items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
