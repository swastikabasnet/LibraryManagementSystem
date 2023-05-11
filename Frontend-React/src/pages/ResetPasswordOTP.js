import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../styles/images/logo.png';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../styles/verifyotp.css";
import { PasswordInput } from '../components/PasswordInput';

function ResetPasswordOTP() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const userEmail = sessionStorage.getItem("email");

    const resetPassword = () => {
        if (password === confirmPassword) {
            axios.put("http://localhost:8080/user/otp/reset_password",
                { "password": password },
                {
                    params: {
                        email: userEmail,
                    }
                })
                .then(data => {
                    // handle the response from the server
                    // console.log(data);
                    sessionStorage.clear();
                    toast.success("Password changed");
                    setTimeout(() => {
                        navigate("/login");
                    }, 500);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        } else {
            console.log("error");
            toast.error("Error password not match");
        }
    }


    return (
        <div class="verifyotp">
            <div class="flex-container">
                <img src={logo} />
                <h1>Hamro Library</h1>
            </div>
            <div class="row">
                <h2>Reset Password</h2>
                <div class="form-group">
                    <PasswordInput
                        type="password" id="pwd" name="pwd" placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <PasswordInput
                        type="password" id="mew_pwd" name="new_pwd" placeholder="Re-enter Password"
                        onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <button type='button' class="btn" onClick={resetPassword}>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordOTP;