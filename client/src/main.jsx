import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, Login } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<App />>
      <Route path="" element=<Home /> />
      <Route path="/login" element=<Login /> />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
