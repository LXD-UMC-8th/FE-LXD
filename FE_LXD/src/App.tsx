import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import WritingPage from "./pages/Diary/WritingPage";
import DiaryPage from "./pages/Diary/DiaryPage";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/Etc/NotFoundPage";
import SignupPage from "./pages/Login/SignupPage";
import FriendsListPage from "./pages/Friends/FriendsListPage";
import CorrectionsPage from "./pages/Corrections/CorrectionsPage";
import ProfilePage from "./pages/Login/ProfilePage";
import EditProfilePage from "./pages/Navbar/EditProfilePage";
import SettingsPage from "./pages/Settings/SettingsPage";
import FeedPage from "./pages/Feed/FeedPage";
import DiaryDetailPage from "./pages/Diary/DiaryDetailPage";
import CorrectionsInDiaryDetail from "./components/Diary/CorrectionsInDiaryDetail";

const publicRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <HomeLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "signup/profile", element: <ProfilePage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/feed" replace />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/feed/:id",
        element: <DiaryDetailPage />,
      },
      {
        path: "/feed/:id/corrections",
        element: <CorrectionsInDiaryDetail />,
      },
      {
        path: "/mydiary",
        element: <DiaryPage />,
      },
      {
        path: "/friendslist",
        element: <FriendsListPage />,
      },

      {
        path: "/corrections",
        element: <CorrectionsPage />,
      },
      {
        path: "/friendslist",
        element: <FriendsListPage />,
      },

      {
        path: "/mydiary/writing",
        element: <WritingPage />,
      },

      {
        path: "/editprofile",
        element: <EditProfilePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
];
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
function App() {
  return (
    <div className="p-0">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
