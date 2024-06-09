import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import MyProfile from "../pages/MyProfile/MyProfile";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ArticleStatistics from "../pages/Dashboard/ArticleStatistics/ArticleStatistics";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles/AllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AddArticle from "../pages/AddArticle/AddArticle";
import PublicArticles from "../pages/PublicArticles/PublicArticles";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import MyArticles from "../pages/MyArticles/MyArticles";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Payment/Payment";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import AdminStatistics from "../pages/Dashboard/AdminStatistics/AdminStatistics";
import UpdateArticle from "../pages/UpdateArticle/UpdateArticle";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-articles",
        element: <PublicArticles />,
      },
      {
        path: "/article/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "add-article",
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminStatistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-articles",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllArticles />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddPublisher />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
