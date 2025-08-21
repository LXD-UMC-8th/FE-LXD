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
import FriendsListPage from "./pages/Friends/FriendsListPage";
import CorrectionsPage from "./pages/Corrections/CorrectionsPage";
import EditProfilePage from "./pages/Navbar/EditProfilePage";
import SettingsPage from "./pages/Settings/SettingsPage";
import FeedPage from "./pages/Feed/FeedPage";
import DiaryDetailPage from "./pages/Diary/DiaryDetailPage";
import ProvideCorrections from "./components/Diary/ProvideCorrections";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DiaryEditPage from "./pages/Diary/DiaryEditPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserDetailPage from "./pages/Feed/UserDetailPage";
import "react-calendar/dist/Calendar.css";
import SignupFlowLayout from "./layouts/SignupFlowLayout";
import SignupPage from "./pages/Login/SignupPage";
import ProfilePage from "./pages/Login/ProfilePage";
import ChangePWPage from "./pages/Login/ChangePWPage";
import GoogleRedirectPage from "./pages/Login/GoogleRedirectPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "signup/*",
        element: <SignupFlowLayout />,
        children: [
          { index: true, element: <SignupPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "change-pw", element: <ChangePWPage /> },
        ],
      },
      { path: "google-redirect", element: <GoogleRedirectPage /> },
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
        element: <Navigate to="feed" replace />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/feed/:diaryId",
        element: <DiaryDetailPage />,
      },
      {
        path: "/feed/:diaryId/corrections",
        element: <ProvideCorrections />,
      },
      {
        path: "/mydiary",
        element: <DiaryPage />,
      },
      {
        path: "/mydiary/edit/:diaryId",
        element: <DiaryEditPage />,
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
      {
        path: "/error",
        element: <NotFoundPage />,
      },
      {
        path: "/diaries/member/:memberId",
        element: <UserDetailPage />,
      },
    ],
  },
];
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <div className="p-0">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
