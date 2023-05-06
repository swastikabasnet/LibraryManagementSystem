import "../../styles/login.css";
import logo from "../../styles/images/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../Home";
import {toast} from "react-hot-toast"
import { PasswordInput } from "../../components/PasswordInput";

function Login() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Log in
  const login = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    const requestBody = { email: logEmail, password: logPassword };
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        requestBody
      );
      const user = response.data;
      sessionStorage.setItem("userId", user.id); // Store the user ID in the session storage
      navigate("/dashboard", { state: user });
      toast.success("Successfully Sign In")
    } catch (error) {
      setErrorMsg(error.response?.data?.errorMessage);  
      toast.error("Failed to Sign In")
    }
  };

  // Sign up
  const register = async (event) => {
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    var requestBody = {
      name: name,
      phoneNumber: phoneNumber,
      email: regEmail,
      password: regPassword,
    };
    await axios
      .post("http://localhost:8080/register", requestBody)
      .then((response) => {
        navigate("/login", { state: response.data });
        toast.success("Successfully Signed in");
      }).catch(() => toast.error("Failed to Signup"));
  };

  return (
    
    <div class="login-Body">
      <div class="topnav">
        <Link class="active" to="/">
          Home
        </Link>
        <Link to="/login">User</Link>
      </div>
      <div class="flex-container">
        <img class="navLogo" src={logo} alt="" />
        <h1 class="title">Welcome to Hamro Library</h1>
      </div>

      <div
        class={`container ${isRegistering && "right-panel-active"}`}
        id="container"
      >
        <div class="form-container sign-up-container">
          <form action="#" required>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Full name"
              pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please enter a valid full name (letters and spaces only)"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="phone number"
              placeholder="Phone number"
              pattern="[0-9]{10}"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please enter a valid 10-digit phone number"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <input
              type="email"
              placeholder="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid email address")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => {
                setRegEmail(e.target.value);
              }}
            />

            <PasswordInput
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => {
                setRegPassword(e.target.value);
              }}
            />

            <PasswordInput
              placeholder="Confirm password"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please re-enter your password")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button type="submit" onClick={register}>
              Sign Up
            </button>
          </form>
        </div>

        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <label style={{width:"100%"}}>
              <input
                type="email"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                value={logEmail}
                onChange={(e) => {
                  setlogEmail(e.target.value);
                }}
              />
            </label>
            <label style={{width:"100%"}}>
              <PasswordInput
                type="password"
                placeholder="Password"
                value={logPassword}
                onChange={(e) => {
                  setLogPassword(e.target.value);
                }}
                required
              />
            </label>
            <div class="forgot" style={{ margin: "10px" }}>
              <Link to="/forgotpassword" style={{ color: "blue" }}>
                Forgot password?
              </Link>
            </div>
            <div class="check">
              <input
                type="checkbox"
                checked={rememberMe}
                name="remember"
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
              />
              <div style={{ margin: "15px", fontSize: "14px" }}>
                Remember Me
              </div>
            </div>
            <button style={{ margin: "10px" }} type="button" onClick={login}>
              Sign In
            </button>
            {errorMsg && (
              <h4
                className="error-message"
                style={{ color: "red", marginTop: "10px" }}
              >
                {errorMsg}
              </h4>
            )}
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                class="ghost"
                id="signIn"
                onClick={() => {
                  setIsRegistering(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Don't have account?</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                class="ghost"
                id="signUp"
                onClick={() => {
                  setIsRegistering(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/forgotpassowrd" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
export default Login;
