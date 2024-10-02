// dependencies
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// styles
import "./index.css";
// pages
import App from "./Components/App";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/User/Users";
import ViewUser from "./Components/ViewUser/ViewUser";
import EditUser from "./Components/EditUser/EditUser.jsx";

// routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/view/:ID",
        element: <ViewUser />,
      },
      {
        path: "/edit/:ID",
        element: <EditUser />,
      },
    ],
  },
]);

// rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
