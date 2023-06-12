import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import VisitedPoisList from "./components/VisitedPoisList.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/visited',
    element: <VisitedPoisList />,
  },
]);




  //<React.StrictMode>
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  //</React.StrictMode>,

