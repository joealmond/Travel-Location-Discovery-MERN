import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/visited',
    element: <>assd</>,
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

