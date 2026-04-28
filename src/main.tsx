/* eslint-disable prettier/prettier */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    // eslint-disable-next-line prettier/prettier
    <RouterProvider router={router} />
  </React.StrictMode>,
);
