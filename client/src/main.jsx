import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import VisitedPoisList from "./components/VisitedPoisList.jsx";
import WishedPoisList from "./components/WishedPoisList.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/visited',
    element: <VisitedPoisList />,
  },
  {
    path: '/wished',
    element: <WishedPoisList />
  }
]);




  //<React.StrictMode>
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
      <RouterProvider router={router} />
  );
  //</React.StrictMode>,

