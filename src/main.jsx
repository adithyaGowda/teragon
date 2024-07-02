import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/500.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProjectParameter from "./components/ProjectParameter.jsx";
import App from "./App.jsx";
import ProjectListData from "./components/ProjectData/ProjectListData.jsx";
import ProjectScoreTable from "./components/ProjectScoreTable.jsx";
import ProjectScoreUpdate from "./components/ProjectScoreUpdate.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/projectParam",
        element: <ProjectParameter />,
      },
      {
        path: "/projectData",
        element: <ProjectListData />,
      },
      {
        path: "/",
        element: <ProjectScoreTable />,
      },
      {
        path: "/projectScoreUpdate",
        element: <ProjectScoreUpdate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
