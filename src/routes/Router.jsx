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
import { PrivateRoute } from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/project",
    element: (
      <PrivateRoute>
        <Layout>
          <Projects />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/project/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <ProjectView />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/project/create-project",
    element: (
      <PrivateRoute>
        <CreateProject />
      </PrivateRoute>
    ),
  },

  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <Layout>
          <Settings />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/add-admin",
    element: (
      <PrivateRoute>
        <Layout>
          <AddAdmin />
        </Layout>
      </PrivateRoute>
    ),
  },
]);

export default router;
