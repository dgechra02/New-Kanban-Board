import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store.js";
import App from "./App.jsx";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import OpenBoard from "./Components/OpenBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"home"} />,
  },
  {
    path: '/home', 
    element: <App />
  },
  {
    path: "/boards", 
    element: <Navigate to={"/"} />
  },
  {
    path: "/boards/:boardId",
    element: <OpenBoard  />,
    // errorElement: <div>Something went wrong!</div>
  },
  {
    path: "*",
    element: <span>404 page not found</span>,
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
