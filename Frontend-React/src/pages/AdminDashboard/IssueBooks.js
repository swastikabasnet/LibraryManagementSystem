import "../../AdminDashboardcss/Issuebooks.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function IssuedBooks() {

    const [userId, setUserID] = useState("");
    const [bookId, setBookid] = useState("");
    const navigate = useNavigate();

    const issueBook = async (event) => {
        event.preventDefault();
        var requestBody = { "user": { "id": userId }, "book": { "id": bookId } }
        await axios.post("http://localhost:8080/borrow", requestBody).then(response => {
            // navigate("/admindashboard/issuebooks", { state: response.data })
            setUserID("");
            setBookid("");
            toast.success("Successfully book issued");
        }).catch(() => toast.error("Failed to issue book"));
    }

    return (
        <div class="IssuedBook-body">
            <div class="main">
                <div class="topbar">
                    <div class="toggle">
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
                        }} value={bookId} />
                        <label for="userid">User ID:</label>
                        <input type="text" id="UserEmail" name="userid" onChange={(e) => {
                            setUserID(e.target.value)
                        }} value={userId} />
                        <button type="submit" onClick={issueBook}>Issue Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default IssuedBooks;