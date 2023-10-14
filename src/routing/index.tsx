import { Navigate, RouteObject, createHashRouter } from "react-router-dom";
import { App } from "../App";
import { MainPage } from "../components/MainPage";
import { SavedQRS } from "../components/SavedQRS";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Navigate to={"/app"} replace />, index: true },
      { path: "app", element: <MainPage /> },
      { path: "savedqrs", element: <SavedQRS /> },
    ],
  },
];

export const router = createHashRouter(ROUTES);
