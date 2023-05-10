import { Link, Outlet } from 'react-router-dom';
import logo from '../../styles/images/logo.png';

import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, notificationsOutline, logOutOutline } from "ionicons/icons"
import { useLocation } from 'react-router-dom';
import '../../UserDashboardcss/UserDashboard.css';




function DashboardNav() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div class="container" id="container">
            <div class="navigation">
                <div class="topbar" >
                </div>
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
                        <Link to="/dashboard/myborrowedbooks">
                            <span class="icon"><IonIcon icon={notificationsOutline}></IonIcon></span>
                            <span class="title">My Borrowed Books</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/myaccount">
                            <span class="icon"><IonIcon icon={personOutline}></IonIcon></span>
                            <span class="title">My Account</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/userlogout" onClick={() => {
                            localStorage.clear(); // clear all items in localStorage
                            sessionStorage.clear(); // clear all items in sessionStorage
                        }}>
                            <span class="icon"><IonIcon icon={logOutOutline}></IonIcon></span>
                            <span class="title">Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>

    );
}

export default DashboardNav;