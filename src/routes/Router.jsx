import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Layout from "../Layout/Layout";
import Projects from "../pages/Projects";
import Summary from "../pages/Summary";
import Settings from "../pages/Settings";
import Report from "../pages/Report";
import CreateProject from "../components/projects/CreateProject";
import AddAdmin from "../components/settings/AddAdmin";
import ProjectView from "../pages/ProjectView";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/project",
    element: (
      <Layout>
        <Projects />
      </Layout>
    ),
  },
  {
    path: "/project/:id",
    element: (
      <Layout>
        <ProjectView />
      </Layout>
    ),
  },
  {
    path: "/project/create-project",
    element: <CreateProject />,
  },
  {
    path: "/summary",
    element: (
      <Layout>
        <Summary />
      </Layout>
    ),
  },
  {
    path: "/reports",
    element: (
      <Layout>
        <Report />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  {
    path: "/settings/add-admin",
    element: (
      <Layout>
        <AddAdmin />
      </Layout>
    ),
  },
]);

export default router;
