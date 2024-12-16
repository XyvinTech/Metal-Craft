import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
]);

export default router;
