import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import FeedsPage from "./pages/FeedsPage";

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
    // errorElement: <NotFoundPgae />,
    children: [
      {
        path: "/feeds",
        element: <FeedsPage />,
      },
      // {
      //   path: "/diary",
      //   element: <DiaryPage />,
      // },
      // {
      //   path: "/corretions",
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
