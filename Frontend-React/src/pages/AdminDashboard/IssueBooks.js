import "../../styles/IssueBook.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function IssuedBooks() {

    const [userId, setUserID] = useState("");
    const [bookId, setBookid] = useState("");
    const navigate = useNavigate();

    const issueBook = async (event) => {
        var requestBody = { "bookId": bookId, "userId": userId }
        await axios.post("http://localhost:8080/borrow", requestBody).then(response => {
            navigate("/admindashboard/issuebooks", { state: response.data })
        })
    }

    return (
        <div class="IssuedBook-body">
            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                    </div>
                    <div class="user">
                        <img class="navLogo" src={logo} alt="logo" />
                    </div>
                </div>

                <div id="Bookissue">
                    <h1>Issue Book</h1>
                    <form >
                        <label for="bookid">Book ID:</label>
                        <input type="text" id="bookid" name="bookid" onChange={(e) => {
                            setBookid(e.target.value)
                        }} />
                        <label for="userid">User ID:</label>
                        <input type="text" id="UserEmail" name="userid" onChange={(e) => {
                            setUserID(e.target.value)
                        }} />
                        <button type="submit" onClick={issueBook}>Issue Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default IssuedBooks;