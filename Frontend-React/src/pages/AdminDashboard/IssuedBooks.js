import "../../styles/IssuedBook.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/logo.png';

function IssuedBooks() {
    return (
        <div class="IssuedBook-body">
            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                    </div>
                    <div class="user">
                        <img class="user" src={logo} alt="logo" />
                    </div>
                </div>

            </div>
            <div id="Bookissue">
                <h2>Issue Books</h2>
                <form action="#">
                    <label for="bookid">Book ID:</label>
                    <input type="text" id="bookid" name="bookid" />
                    <label for="UserEmail">User Email:</label>
                    <input type="text" id="UserEmail" name="UserEmail" />
                    <label for="bookTitle">Book Title:</label>
                    <input type="text" id="bookTitle" name="bookTitle" />
                    <label for="Dateissue">Date Issued:</label>
                    <input type="date" id="DateIssued" name="DateIssued" />
                    <label for="WhentoReturn">When to Return:</label>
                    <input type="text" id="" name="WhentoReturn" />
                    <button type="submit" onclick="addBook()">Issue Book</button>
                </form>
            </div>
        </div>
    );
}
export default IssuedBooks;