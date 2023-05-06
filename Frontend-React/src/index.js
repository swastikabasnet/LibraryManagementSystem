import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Toaster} from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <App />
  </React.StrictMode>
);


// Or

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Users from './pages/AdminDashboard/Users';
// import AdminLogin from './pages/AdminDashboard/AdminLogin';
// import DashboardNav from './pages/UserDashboard/DashboardNav';
// import AdminDashboardNav from './pages/AdminDashboard/AdminDashboardNav';
// import Login from './pages/UserDashboard/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import VerifyOtp from './pages/VerifyOtp';
// import ResetPasswordOTP from './pages/ResetPasswordOTP';
// import Home from './pages/Home';

// const router = createBrowserRouter([
//   {
//     path: "/app",
//     element: <App />
//   },
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/home",
//     element: <Home />
//   },
//   {
//     path: "/admin",
//     element: <AdminLogin />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/users",
//     element: <Users />
//   },
//   {
//     path: "/dashboard/*",
//     element: <DashboardNav />
//   },
//   {
//     path: "/admindashboard/*",
//     element: <AdminDashboardNav />
//   },
//   {
//     path: "/forgotpassword",
//     element: <ForgotPassword />
//   },
//   {
//     path: "/verify_otp",
//     element: <VerifyOtp />
//   },
//   {
//     path: "/reset_password_otp",
//     element: <ResetPasswordOTP />
//   }
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
