import logo from '../../styles/images/logo.png';
import { IonIcon } from '@ionic/react';
import { book, library, menuOutline, people, reader, searchOutline } from "ionicons/icons"

function AdminDashboard() {
    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <IonIcon icon={menuOutline}></IonIcon>
                </div>
                <div class="search">
                    <label>
                        <input type="text" placeholder="Search book" />
                        <IonIcon icon={searchOutline}></IonIcon>
                    </label>
                </div>
                <div class="user">
                    <img class="user" src={logo} alt="logo" />
                </div>
            </div>
            <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">1,504</div>
                        <div class="cardName">Total Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={library}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">80</div>
                        <div class="cardName">Available Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={reader}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">284</div>
                        <div class="cardName">Issued Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={book}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">120</div>
                        <div class="cardName">Total Members</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={people}></IonIcon>
                    </div>
                </div>
            </div>
            <div id="dashboard-container">
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Availability</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>The Alchemist</td>
                            <td>10</td>
                            <td>5</td>
                            <td>A novel by Brazilian author Paulo Coelho</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Harry Potter and the Philosopher's Stone</td>
                            <td>8</td>
                            <td>4</td>
                            <td>A novel by British author J. K. Rowling</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Die a Mockingbird</td>
                            <td>5</td>
                            <td>2</td>
                            <td>A novel by American author Harper Lee</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Live Like A MOnk</td>
                            <td>4</td>
                            <td>2</td>
                            <td>A novel by American author Jay Shetty</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>War and Peace</td>
                            <td>12</td>
                            <td>6</td>
                            <td>A novel by American author Hitler</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Quantam Mechanis</td>
                            <td>9</td>
                            <td>3</td>
                            <td>A novel by American author Albert Shrestha </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminDashboard;