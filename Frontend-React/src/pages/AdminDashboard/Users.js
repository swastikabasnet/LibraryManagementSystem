import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/logo.png';

function Users() {
    return (
        <div>
            <div>
                <div class="main">
                    <div class="topbar">
                        <div class="toggle">
                            <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                        </div>
                        <div class="user">
                            <img class="user" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div id="dashboard-container">
                        <table class="dashboard-table" id="book-list">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Name</th>
                                    <th>Email Address</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Swastika Basnet</td>
                                    <td>Swastikabasnet123@gmail.com</td>
                                    <td>9867584532</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>It's Dgbro</td>
                                    <td>dgbro123@gmail.com</td>
                                    <td>9876543210</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Abhinaya Gupta</td>
                                    <td>abhinaya22@gmail.com</td>
                                    <td>9878765431</td>

                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Sajan Kumar Shrestha</td>
                                    <td>sajanshrestha921@gmail.com</td>
                                    <td>9821234512</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Rekha bro</td>
                                    <td>rekha223@gmail.com</td>
                                    <td>9878685645</td>

                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Rohal Dahal</td>
                                    <td>Rohan23@gmail.com</td>
                                    <td>9878654323</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Users;