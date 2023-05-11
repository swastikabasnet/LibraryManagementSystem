// import "../../styles/MyAccount.css";
import "../../AdminDashboardcss/Settings.css";

import logo from '../../styles/images/admin.png';
import { IonIcon } from '@ionic/react';
import { book, library, menuOutline, people, reader, reload, searchOutline } from "ionicons/icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PasswordInput } from "../../components/PasswordInput";

// inner navigate
const TABS = {
    admins: "admins",
    editProfile: "edit-profile",
    profileDetails: "profile-details",
    addAdmin: "add-admin",
    changePassword: "change-password",
    delete: "delete"
}
function MyAccount() {
    const adminId = sessionStorage.getItem('adminId');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState(TABS.admins);

    // admin update
    const tabItemStyle = (tabItem) => ({ display: tabItem === tab ? "block" : "none", marginTop: "2rem", marginInline: "auto" })

    // get admin{id} data
    useEffect(() => {
        axios.get(`http://localhost:8080/admin/${adminId}`)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhoneNumber(res.data.phoneNumber);
                setPassword(res.data.password);
                console.log(res.data);
            })
    }, []);

    // self update
    const updateProfile = async () => {
        axios.put('http://localhost:8080/admin/' + adminId, {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password
        }).then(res => {
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    // admin user table
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/admin`)
            .then(res => {
                setAdmin(res.data);
            })
            .catch(error => {
                console.log(error);
            })

    }, []);

    // delete admin by Id
    const [deleteId, setDeleteId] = useState("");
    const deleteAdmin = async () => {
        axios.delete('http://localhost:8080/admin/' + deleteId)
            .then(res => {
                window.location.reload(false);
                setTab(TABS.delete);
            })
            .catch(error => {
                console.log(error);
            })
    };

    // add new admin
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
    const createAdmin = async (event) => {
        event.preventDefault();
        if (adminPassword !== adminConfirmPassword) {
            toast.error("Password did not match");
            setTab(TABS.addAdmin);
            return;
        }
        var requestBody = {
            name: adminName,
            phoneNumber: adminPhoneNumber,
            email: adminEmail,
            password: adminPassword,
        };
        await axios
            .post("http://localhost:8080/admin", requestBody)
            .then(() => {
                toast.success("Successfully admin created");
                setTab(TABS.addAdmin);
                // clear the input fields
                setAdminName("");
                setAdminEmail("");
                setAdminPhoneNumber("");
                setAdminPassword("");
                setAdminConfirmPassword("");
            }).catch(() => {
                toast.error("Failed to Signup")
                setTab(TABS.addAdmin);
            });
    };

    // change current admin password
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
        axios.put('http://localhost:8080/admin/' + adminId, {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: newPassowrd
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
            <div style={{ marginTop: "20px" }}>
                <div id="setting-nav" class="topbara">
                    <button onClick={() => setTab(TABS.admins)}>Admins</button>
                    <button onClick={() => {
                        setTab(TABS.editProfile)
                        setAdminName("");
                        setAdminEmail("");
                        setAdminPhoneNumber("");
                        setAdminPassword("");
                        setAdminConfirmPassword("");
                    }} >Edit Profile</button>
                    <button onClick={() => setTab(TABS.addAdmin)}>Add Admin</button>
                    <button onClick={() => setTab(TABS.changePassword)}>Change Password</button>
                    <button onClick={() => setTab(TABS.delete)}>Delete</button>
                </div>
                <form style={tabItemStyle(TABS.editProfile)} id="editForm" >
                    <h2>Edit Profile</h2>
                    <br />
                    <label for="name">Name:</label>
                    <input type="text" placeholder={name} onChange={(e) => { setName(e.target.value) }} autoComplete="off" />
                    <label for="email">Email:</label>
                    <input type="email" placeholder={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="off" />
                    <label for="phoneNumber">Phone number:</label>
                    <input type="tel" placeholder={phoneNumber} onChange={(e) => (setPhoneNumber(e.target.value))} autoComplete="off" />
                    <button class="save-button" type="submit" onClick={updateProfile}>Save Changes</button>
                </form>
                <form id="addAdminForm" style={tabItemStyle(TABS.addAdmin)}>
                    <h2>Add Admin</h2>
                    <br />
                    <label for="adminUsername">Name:</label>
                    <input type="text" onChange={(e) => setAdminName(e.target.value)} value={adminName} />
                    <label for="email">Email:</label>
                    <input type="email" onChange={(e) => setAdminEmail(e.target.value)} value={adminEmail} />
                    <label for="phoneNumber">Phone number:</label>
                    <input type="tel" onChange={(e) => setAdminPhoneNumber(e.target.value)} value={adminPhoneNumber} />
                    <label for="adminPassword">Password:</label>
                    <PasswordInput type="password" onChange={(e) => setAdminPassword(e.target.value)} value={adminPassword} />
                    <label for="adminConfirmPassword">Confirm Password:</label>
                    <input type="password" onChange={(e) => setAdminConfirmPassword(e.target.value)} value={adminConfirmPassword} />
                    <button class="save-button" type="submit" onClick={createAdmin}>Add Admin</button>
                </form>
                <form id="changePasswordForm" style={tabItemStyle(TABS.changePassword)}>
                    <h2>Change Password</h2>
                    <br />
                    <label for="currentPassword">Current Password:</label>
                    <PasswordInput
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword} />
                    <label for="newPassword">New Password:</label>
                    <PasswordInput
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassowrd} />
                    <label for="confirmNewPassword">Confirm New Password:</label>
                    <PasswordInput
                        type="password"
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                        value={newConfirmPassword} />
                    <button class="save-button" type="submit" onClick={changePassword}>Change Password</button>
                </form>

                <form id="deleteForm" style={tabItemStyle(TABS.delete)}>
                    <h2>Delete Admin</h2>
                    <br />
                    <label for="adminToDelete">Admin Id:</label>
                    <input type="text" id="adminToDelete" name="adminToDelete" onChange={(e) => setDeleteId(e.target.value)}></input>
                    <button class="save-button" type="submit" onClick={deleteAdmin}>Delete Admin</button>
                </form>
                <br />
                <div id="dashboard-container" style={tabItemStyle(TABS.admins)}>
                    <table class="dashboard-table" id="book-list">
                        <thead>
                            <tr>
                                <th>Admin Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin.map(br => (
                                <tr key={br.id}>
                                    <td>{br.id}</td>
                                    <td>{br.name}</td>
                                    <td>{br.email}</td>
                                    <td>{br.phoneNumber}</td>
                                </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}
export default MyAccount;