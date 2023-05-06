import './App.css';
import Landing from './pages/Landing';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminDashboard/AdminLogin';
import Login from './pages/UserDashboard/Login';
import DashboardNav from './pages/UserDashboard/DashboardNav';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/UserDashboard/MyAccount';
import BookRequest from './pages/UserDashboard/MyBorrowedBook'
import Dashboard from './pages/UserDashboard/Dashboard';
import Error from './pages/404';

import AdminDashboardNav from './pages/AdminDashboard/AdminDashboardNav';
import AddBooks from './pages/AdminDashboard/AddBooks';
import BorrowedBooks from './pages/AdminDashboard/BorrowedBooks';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import IssueBooks from './pages/AdminDashboard/IssueBooks';
import BookIssueHistory from './pages/AdminDashboard/bookuserhistory'
import Setting from './pages/AdminDashboard/Setting';
import AddAdmin from './pages/AdminDashboard/addadmin';
import Users from './pages/AdminDashboard/Users';



function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<DashboardNav/>} >
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/myaccount" element={<MyAccount/>} />
            <Route path="/dashboard/myborrowedbooks" element={<BookRequest/>} />
          </Route>

          <Route path="/admindashboard" element={<AdminDashboardNav/>} >
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path='/admindashboard/users' element={<Users />} />
            <Route path='/admindashboard/addbooks' element={<AddBooks />} />
            <Route path='/admindashboard/borrowedbooks' element={<BorrowedBooks />} />
            <Route path='/admindashboard/issuebooks' element={<IssueBooks />} />
            <Route path='/admindashboard/bookissuehistory' element={<BookIssueHistory />} />
            <Route path='/admindashboard/addadmin' element={<AddAdmin />} />

            <Route path='/admindashboard/setting' element={<Setting />} /> 
          </Route>

          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/admin/*" element={<AdminLogin/>} />
          <Route path="/login/*" element={<Login/>} />
          <Route path="/*" element={<Error/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
