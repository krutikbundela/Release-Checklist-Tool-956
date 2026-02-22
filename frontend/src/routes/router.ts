import { createBrowserRouter } from "react-router";
import App from "../App";
import ReleaseListPage from "../pages/ReleaseListPage";
import ReleaseDetailPage from "../pages/ReleaseDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: ReleaseListPage,
      },
      {
        path: "release/:id",
        Component: ReleaseDetailPage,
      },
    ],
  },
]);
