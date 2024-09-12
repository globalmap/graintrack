import "reflect-metadata";
import "./index.css"
import { RouterProvider } from "@tanstack/react-router";
import "../core/di/container";
import router from "./router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const App = () => <RouterProvider router={router} />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
