import "../../styles/AdminLogin.css";
import logo from '../../styles/images/logo.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async (event) => {
        var requestBody = { "email": email, "password": password }
        await axios.post("http://localhost:8080/login", requestBody).then(response => {
            navigate("/admindashboard", { state: response.data })
        })
    }
    return (
        <div class="AdminLogin-body">
            <div class="flex-container">
                <img src={logo} alt="" />
                <h2>Welcome to Hamro Library</h2>
            </div>
            <div class="row">
                <h1>Admin Login</h1>
                <div class="form-group">
                    <input type="Email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button type="button" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}
export default AdminLogin;