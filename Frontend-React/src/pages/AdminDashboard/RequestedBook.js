import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';

function RequestedBooks() {
    return (

        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>

            <div id="dashboard-container">
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Requested Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Rich Dad</td>
                            <td>SwastikaBasnet</td>
                            <td>Swastikabasnet123@gmail.com</td>
                            <td>9867584532</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Poor Son</td>
                            <td>Rekha</td>
                            <td>Rekha123@gmail.com</td>
                            <td>9867584532</td>

                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Rich and poor Dad</td>
                            <td>DipaK</td>
                            <td>Dipak123@gmail.com</td>
                            <td>9867584532</td>

                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Rich and poor Son</td>
                            <td>Abhinaya</td>
                            <td>Abhinaya123@gmail.com</td>
                            <td>9867584532</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Modern Physics</td>
                            <td>Rohan</td>
                            <td>Rohan123@gmail.com</td>
                            <td>9867584532</td>

                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Think Like A Monk</td>
                            <td>Sajan Shrestha</td>
                            <td>SajanShrestha123@gmail.com</td>
                            <td>9867584532</td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default RequestedBooks;