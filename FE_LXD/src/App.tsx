import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import FeedPage from "./pages/FeedPage";
import WritingPage from "./pages/DiaryNWriting/WritingPage";
import DiaryPage from "./pages/DiaryNWriting/DiaryPage";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/Login/SignupPage";
import FriendsListPage from "./pages/FriendsListPage";
import CorrectionsPage from "./pages/CorrectionsPage";
import ProfilePage from "./pages/Login/ProfilePage";
import FeedDetailPage from "./pages/FeedDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import SettingsPage from "./pages/SettingsPage";

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
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/feed/:id",
        element: <FeedDetailPage />,
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
        path: "/profileedit",
        element: <ProfileEditPage />,
      },

      {
        path: "/settings",
        element: <SettingsPage />,
      }
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
