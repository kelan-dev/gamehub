import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import GamePage from "../pages/GamePage";
import BaseLayout from "../pages/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "game/:slug",
        element: <GamePage />,
      },
    ],
  },
]);

export default router;
