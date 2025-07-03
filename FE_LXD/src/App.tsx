import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import FeedPage from "./pages/FeedPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <ErrorPage />,
    // children: [{ index: true, element: <LoginPage /> }],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/feed",
        element: <FeedPage />,
      },
      // {
      //   path: "/diary",
      //   element: <DiaryPage />,
      // },
      // {
      //   path: "/corrections",
      //   element: <CorrectionsPage />,
      // },
      // {
      //   path: "friendslist",
      //   element: <FriendsListPage />,
      // },
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
