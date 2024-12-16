import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Layout from "../Layout/Layout";
import Projects from "../pages/Projects";
import Summary from "../pages/Summary";
import Settings from "../pages/Settings";
import Report from "../pages/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Layout></Layout>,
  },
  {
    path: "/projects",
    element: <Layout><Projects/></Layout>,
  },
  {
    path: "/summary",
    element: <Layout><Summary/></Layout>,
  },
  {
    path: "/reports",
    element: <Layout><Report/></Layout>,
  },
  {
    path: "/settings",
    element: <Layout><Settings/></Layout>,
  },
]);

export default router;
