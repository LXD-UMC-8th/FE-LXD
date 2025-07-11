import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import FeedPage from "./pages/FeedPage";
import WritingPage from "./pages/Diary/WritingPage";
import DiaryPage from "./pages/Diary/DiaryPage";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import FriendsListPage from "./pages/FriendsListPage";
import CorrectionsPage from "./pages/CorrectionsPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <HomeLayout />,
    // errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
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
        path: "/diary",
        element: <DiaryPage />,
      },

      // {
      //   path: "/corrections",
      //   element: <CorrectionsPage />,
      // },
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
        path: "/diary/writing",
        element: <WritingPage />,
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
