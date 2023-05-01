import './App.css';
import Landing from './pages/Landing';
// import Home from "./components/home";
// import About from "./components/about";
// import Work from "./components/work";
// import Test from "./components/testimonials";
// import Footer from "./components/footer";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminDashboard/AdminLogin';
import Login from './pages/UserDashboard/Login';
import DashboardNav from './pages/UserDashboard/DashboardNav';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<DashboardNav/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
