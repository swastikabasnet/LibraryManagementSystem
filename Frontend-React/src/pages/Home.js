
import "../styles/Home.css";
import logo from '../styles/images/logo.png';
import logo1 from '../styles/images/logo.png';
import Login from './UserDashboard/Login';
import { Link, Route, Routes } from 'react-router-dom';

function Home() {
    return (
        <div class="Home-body">
            <div class="flex-container">
                <img src={logo} alt='logo' />
                <h1>Welcome to Hamro Library</h1>
                <div class="topnav">
                    <Link class="active" to="/home">Home</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/login">User</Link>
                </div>
            </div>
            <div class="logo-container">
                <img class='topLogo' src={logo1} alt="logo" />
            </div>

            <footer>
                <div class="about-us">
                    <h4>About Us</h4>
                    <p>The Library Management System is a web application that our team of developers, project managers, and business
                        analysts are collaborating on to create. Our goal is to provide an efficient and user-friendly platform that
                        allows library patrons to easily browse and borrow books. The project manager is responsible for overseeing the
                        development process and ensuring that the project is on track, while the business analyst is focused on
                        understanding user needs and ensuring that the application meets those needs. As developers, our role is to write
                        the code that brings the application to life. We work closely with the project manager and business analyst to
                        ensure that the application is functional, easy to use, and meets the needs of our users. Our team collaboration
                        is key to the success of this project, and we work together to overcome any challenges that arise and ensure that
                        the Library Management System is a top-quality product.</p>
                </div>
            </footer>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </div>
    );
}

export default Home;