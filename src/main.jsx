import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer/>
  </AuthProvider>
);
