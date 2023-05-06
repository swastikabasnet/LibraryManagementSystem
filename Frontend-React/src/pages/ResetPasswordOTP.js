import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../styles/images/logo.png';
import axios from 'axios';


function ResetPasswordOTP() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const resetPassword = () => {
        if (password == confirmPassword) {
            axios.put("http://localhost:8080/User/otp/reset_password", { "password": password }, {
            })
                .then(data => {
                    // handle the response from the server
                    console.log(data);
                    navigate("/login");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log("error");
        }
    }


    return (
        <div>
            <div class="flex-container">
                <img src={logo} />
                <h2>Hamro Library</h2>
            </div>
            <div class="row">
                <h1>Reset Password</h1>
                <div class="form-group">
                    <input type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" id="mew_pwd" name="new_pwd" placeholder="Re-enter Password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <button type='button' class="btn" onClick={() => resetPassword()}>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordOTP;