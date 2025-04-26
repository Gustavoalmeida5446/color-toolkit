import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";
import ColorConverter from "./ColorConverter";
import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route path="/color-converter" element={<ColorConverter />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
