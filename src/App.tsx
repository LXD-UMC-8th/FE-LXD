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
import SignupFlow from "./pages/Login/SignupFlow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DiaryEditPage from "./pages/Diary/DiaryEditPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserDetailPage from "./pages/Feed/UserDetailPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <HomeLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup/*", element: <SignupFlow /> },
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
