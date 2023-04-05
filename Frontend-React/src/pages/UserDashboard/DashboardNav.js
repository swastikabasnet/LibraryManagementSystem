import { Link, Route, Routes } from 'react-router-dom';
import logo from '../../styles/images/logo.png';
import Dashboard from './Dashboard';
import MyAccount from './MyAccount';
import BookRequest from './BookRequest';
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, notificationsOutline, logOutOutline } from "ionicons/icons"
import { useLocation } from 'react-router-dom';


function DashboardNav() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div class="container" id="container">
            <div class="navigation">
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <span> <img class="user_logo" src={logo} alt="logo" /></span>
                            <span class="title_title">Hamro Library</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <span class="icon"><IonIcon icon={homeOutline}></IonIcon></span>
                            <span class="title">Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/myaccount">
                            <span class="icon"><IonIcon icon={personOutline}></IonIcon></span>
                            <span class="title">My Account</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/bookrequest">
                            <span class="icon"><IonIcon icon={notificationsOutline}></IonIcon></span>
                            <span class="title">Request for Book</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/login">
                            <span class="icon"><IonIcon icon={logOutOutline}></IonIcon></span>
                            <span class="title">Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/myaccount' element={<MyAccount />} />
                <Route path='/bookrequest' element={<BookRequest />} />
            </Routes>
        </div>

    );
}

export default DashboardNav;