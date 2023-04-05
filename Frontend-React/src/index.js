import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './pages/AdminDashboard/Users';
import AddUsers from './pages/AdminDashboard/AddUsers';
import AdminLogin from './pages/AdminDashboard/AdminLogin';
import DashboardNav from './pages/UserDashboard/DashboardNav';
import AdminDashboardNav from './pages/AdminDashboard/AdminDashboardNav';
import Login from './pages/UserDashboard/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/users/add",
    element: <AddUsers />
  },
  {
    path: "/dashboard/*",
    element: <DashboardNav />
  },
  {
    path: "/admindashboard/*",
    element: <AdminDashboardNav />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
