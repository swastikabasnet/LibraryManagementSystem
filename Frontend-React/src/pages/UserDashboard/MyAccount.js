
import { useEffect, useState } from "react";
// import "../../styles/MyAccount.css";
import "../../UserDashboardcss/MyAccount.css"
import axios from "axios";
import logo from '../../styles/images/user.png';
import { PasswordInput } from "../../components/PasswordInput";
import { toast } from "react-hot-toast";

function MyAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    let userId = sessionStorage.getItem("userId");

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhoneNumber(res.data.phoneNumber);
                setPassword(res.data.password);
            })
    }, []);


    const updateProfile = async () => {
        axios.put('http://localhost:8080/users/' + userId, {
            id: userId,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password
        }).then(res => {
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    };

    // change current user password
    const [oldPassword, setOldPassword] = useState("");
    const [newPassowrd, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const changePassword = async (event) => {
        event.preventDefault();
        //check if old password is correct
        if (oldPassword !== password) {
            toast.error("Incorrect old password");
            return;
        }
        // validate new and confirm password
        if (newPassowrd !== newConfirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        axios.put('http://localhost:8080/user/reset-password',
            { "password": newPassowrd },
            {
                params: {
                    id: userId,
                }
            }).then(res => {
                toast.success("Password changed successfully");
                setOldPassword("");
                setNewPassword("");
                setNewConfirmPassword("");
            }).catch(err => {
                console.log(err)
                toast.error("Failed to change password");
            });
    }


    return (
        <div class="main">
            <div class="topbar">

                <div class="toggle">
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>
            <div class="form">
                <h1>My Account</h1>
                <form>
                    <div class="mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputFirstName">Full Name</label>
                            <input class="form-control" id="inputFirstName" type="text" placeholder={name}
                                onChange={(e) => (setName(e.target.value))} />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputEmailAddress">Email address</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder={email}
                            onChange={(e) => (setEmail(e.target.value))} />
                    </div>
                    <div class="mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputPhone">Phone number</label>
                            <input class="form-control" id="inputPhone" type="tel" placeholder={phoneNumber}
                                onChange={(e) => (setPhoneNumber(e.target.value))} />
                        </div>
                    </div>
                    <div>
                        <button class="save-button" type="button" onClick={updateProfile}>
                            Save changes
                        </button>
                        <button class="save-button" type="button" onClick={togglePasswordForm}>
                            Change password
                        </button>
                    </div>
                </form>
            </div>
            {showPasswordForm && (
                <div class="password-form">
                    <form onSubmit={changePassword}>
                        <h2>Change Password</h2>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputCurrentPassword">
                                Current Password
                            </label>
                            <PasswordInput
                                class="form-control"
                                id="inputCurrentPassword"
                                type="password"
                                required
                                onChange={(e) => { setOldPassword(e.target.value) }}
                                value={oldPassword}
                            />
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputNewPassword">
                                New Password
                            </label>
                            <PasswordInput
                                class="form-control"
                                id="inputNewPassword"
                                type="password"
                                required
                                onChange={(e) => { setNewPassword(e.target.value) }}
                                value={newPassowrd}
                            />
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputConfirmPassword">
                                Confirm New Password
                            </label>
                            <PasswordInput
                                class="form-control"
                                id="inputConfirmPassword"
                                type="password"
                                required
                                onChange={(e) => { setNewConfirmPassword(e.target.value) }}
                                value={newConfirmPassword}
                            />
                        </div>
                        <button class="save-button" type="submit">
                            Save changes
                        </button>
                    </form>
                </div>
            )}

        </div >
    );
}

export default MyAccount;

