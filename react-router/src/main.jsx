import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";

import DashboardLayout from "./layouts/Dashboard";
const Home = lazy(() => import("./views/Home"));
const About = lazy(() => import("./views/About"));
import Posts from "./views/Posts";
import Post from "./views/Post";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Fallback from "./components/Fallback";
import ErrorBoundary from "./components/ErrorBoundary";

const routes = [
  {
    element: <ErrorBoundary />,
    // errorElement: <div>Something went wrong from error element</div>,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/", element: <Home /> },
              { path: "/about", element: <About /> },
              {
                path: "/posts",
                children: [
                  {
                    index: true,
                    element: <Posts />,
                  },
                  {
                    path: ":postId",
                    element: <Post />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "/auth/login", element: <Login /> },
          { path: "/auth/register", element: <Register /> },
        ],
      },
      {
        element: <div>This is the 404 Page</div>,
        path: "*",
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
