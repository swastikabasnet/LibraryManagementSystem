import { Link, Outlet } from 'react-router-dom';
import logo from '../../styles/images/logo.png';
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, notificationsOutline, logOutOutline, bookOutline, arrowRedoOutline, settingsOutline } from "ionicons/icons"
import { useLocation } from 'react-router-dom';
import '../../AdminDashboardcss/Dashboard.css'

function AdminDashboardNav() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div class="container" id="container">
            <div class="navigation">
                <ul>
                    <li>
                        <Link to="/admindashboard">
                            <span> <img class="user_logo" src={logo} alt="logo" /></span>
                            <span class="title_title">Hamro Library</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard">
                            <span class="icon"><IonIcon icon={homeOutline}></IonIcon></span>
                            <span class="title">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard/users">
                            <span class="icon"><IonIcon icon={personOutline}></IonIcon></span>
                            <span class="title">User Details</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/addbooks">
                            <span class="icon"><IonIcon icon={bookOutline}></IonIcon></span>
                            <span class="title">Add Books</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/borrowedbooks">
                            <span class="icon"><IonIcon icon={notificationsOutline}></IonIcon></span>
                            <span class="title">Book Requests</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/issuebooks">
                            <span class="icon"><IonIcon icon={arrowRedoOutline}></IonIcon></span>
                            <span class="title">Issued Books</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/bookissuehistory">
                            <span class="icon"><IonIcon icon={arrowRedoOutline}></IonIcon></span>
                            <span class="title">Book Issue History</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/setting">
                            <span class="icon"><IonIcon icon={settingsOutline}></IonIcon></span>
                            <span class="title">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin">
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
export default AdminDashboardNav;