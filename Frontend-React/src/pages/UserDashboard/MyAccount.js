import logo from '../../styles/images/logo.png';
import "../../styles/MyAccount.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons"

function MyAccount() {
    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <IonIcon icon={menuOutline}></IonIcon>
                </div>
                <div class="user">
                    <img class="user" src={logo} alt="logo" />
                </div>
            </div>
            <div class="form">
                <h2>My Account</h2>
                <ul>
                    <li>ID: 2204672</li>
                    <li>Name: Sajan Shrestha</li>
                    <li>Email Address: SajanShrestha123@gmail.com</li>
                    <li>Contact: 9867876754</li>
                </ul>
            </div>
        </div>
    );
}

export default MyAccount;