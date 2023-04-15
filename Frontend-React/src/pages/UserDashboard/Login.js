import "../../styles/login.css";
import logo from '../../styles/images/logo.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";
import { Link, Route, Routes } from 'react-router-dom';
import Home from "../Home";

function Login() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const [logEmail, setlogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');


    const navigate = useNavigate();

    const login = async (event) => {
        var requestBody = { "email": logEmail, "password": logPassword }
        await axios.post("http://localhost:8080/login", requestBody).then(response => {
            navigate("/dashboard", { state: response.data })
        })
    }

    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle login logic here
    //     if (logEmail === '') {
    //         setEmailError('Email is required');
    //     } else if (!/\S+@\S+\.\S+/.test(logEmail)) {
    //         setEmailError('Invalid email format');
    //     } else {
    //         setEmailError('');
    //     }

    //     if (logPassword === '') {
    //         setPasswordError('Password is required');
    //     } else if (logPassword.length < 8) {
    //         setPasswordError('Password must be at least 8 characters');
    //     } else {
    //         setPasswordError('');
    //     }

    //     // Submit form if there are no errors
    //     if (emailError === '' && passwordError === '') {
    //         // Handle login logic here
    //         login(event);
    //     }
    // };


    const register = async (event) => {
        var requestBody = { "name": name, "phoneNumber": phoneNumber, "email": regEmail, "password": regPassword }
        await axios.post("http://localhost:8080/register", requestBody).then(response => {
            navigate("/dashboard", { state: response.data })
        })
    }

    return (
        <div class="login-Body">
            <div class="topnav">
                <Link class="active" to="/home">Home</Link>
                <Link to="/login">Login or Signup</Link>
            </div>
            <div class="flex-container">
                <img class="navLogo" src={logo} alt="" />
                <h1 class="title">Welcome to Hamro Library</h1>
            </div>

            <div class={`container ${isRegistering && "right-panel-active"}`} id="container">
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>

                        <input type="text" placeholder="Full name" onChange={(e) => { setName(e.target.value) }} />
                        <input type="phone number" placeholder="Phone number" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        <input type="email" placeholder="Email" onChange={(e) => { setRegEmail(e.target.value) }} />
                        <input type="password" placeholder="Password" onChange={(e) => { setRegPassword(e.target.value) }} />
                        <input type="password" placeholder="Re-enter password" onChange={(e) => { setReEnterPassword(e.target.value) }} />
                        <button type="button" onClick={register}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <label>
                            <input type="email" placeholder="Email" value={logEmail} onChange={(e) => { setlogEmail(e.target.value) }} />
                            {/* <div className="error">{emailError}</div> */}
                        </label>
                        <label>
                            <input type="password" placeholder="Password" value={logPassword} onChange={(e) => { setLogPassword(e.target.value) }} />
                            {/* <div className="error">{passwordError}</div> */}
                        </label>
                        <div class="forgot">
                            <Link to="/forgotpassword" style={{ color: "blue" }}>Forgot password?</Link>
                        </div>
                        <div class="check">
                            <input type="checkbox" checked={rememberMe} name="remember" />
                            <div style={{ margin: '20px', fontSize: '14px' }}>
                                Remember Me
                            </div>
                        </div>
                        <button style={{ margin: '20px' }} type="button" onClick={login}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="signIn" onClick={() => { setIsRegistering(false) }}>Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Don't have account?</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" id="signUp" onClick={() => { setIsRegistering(true) }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/forgotpassowrd' element={<ForgotPassword />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </div>
    );
}
export default Login;