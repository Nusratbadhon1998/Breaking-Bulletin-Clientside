import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <p>Error</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
    ],
  },
]);
