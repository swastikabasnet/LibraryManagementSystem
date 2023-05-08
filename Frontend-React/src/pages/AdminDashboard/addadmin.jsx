import "../../AdminDashboardcss/Issuebooks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';

function AddAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    // add new admin
    const register = async (event) => {
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        var requestBody = {
            email: email,
            password: password,
        };
        await axios
            .post("http://localhost:8080/admin", requestBody)
            .then((response) => {
                navigate("/admindashboard/addadmin", { state: response.data });
                toast.success("Successfully added new admin");
                window.location.reload();
            }).catch(() => toast.error("Failed to add new admin"));
    };

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
                    <h1>Add Admin</h1>
                    <form >
                        <label for="bookid">Email</label>
                        <input type="Email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={(e) => { setEmail(e.target.value) }} />
                        <label for="userid">Password</label>
                        <input type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <label for="userid">Confirm Password</label>
                        <input type="password" id="pwd" name="pwd" placeholder="Confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        <button type="button" onClick={register}>Add</button>
                        {errorMsg && (
                        <h4 className="error-message" style={{ color: "red", marginTop: "10px" }}>
                            {errorMsg}
                        </h4>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAdmin;