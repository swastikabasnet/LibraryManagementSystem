import logo from '../../styles/images/user.png';
import "../../styles/BookRequest.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons"

function BookRequest() {
    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <IonIcon icon={menuOutline}></IonIcon>
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>

            <div id="Requestforbook">
                <h2>Request for the Book</h2>
                <form>
                    <label for="bookid">Book ID:</label>
                    <input type="text" id="bookid" name="bookid" />
                    <label for="bookName">Book Name:</label>
                    <input type="text" id="bookName" name="bookName" />
                    <label for="Note">Note:</label>
                    <textarea placeholder="Why require this Book ?"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookRequest;