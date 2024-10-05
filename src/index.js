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
import Suggests from "./Components/suggests/Suggests.jsx";
import EditUser from "./Components/EditUser/EditUser.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import AdminPanel from "./Components/admin_panel/AdminPanel.jsx";
import Messages from "./Components/Messages/Messages.jsx";

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
            {
                path: "/suggests/:ID",
                element: <Suggests />,
            },
            {
                path: "/messages/:ID",
                element: <Messages />,
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
            },
        ],
    },
]);

// rendering
ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    </StrictMode>
);
