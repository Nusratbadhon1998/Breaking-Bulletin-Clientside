import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AOS from "aos";
import "aos/dist/aos.css";

const queryClient = new QueryClient();
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="noto-serif">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </div>
);
