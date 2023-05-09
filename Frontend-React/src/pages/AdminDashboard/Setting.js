// import "../../styles/MyAccount.css";
import "../../AdminDashboardcss/Settings.css";

import logo from '../../styles/images/admin.png';
import { IonIcon } from '@ionic/react';
import { book, library, menuOutline, people, reader, reload, searchOutline } from "ionicons/icons"
import axios from "axios";
import { useEffect, useState } from "react";

const TABS = {
    editProfile: "edit-profile",
    profileDetails: "profile-details",
    addAdmin: "add-admin",
    changePassword: "change-password",
    delete: "delete"
}
function MyAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState("");

    // admin update
    const tabItemStyle = (tabItem) => ({ display: tabItem === tab ? "block" : "none", marginTop: "3rem", maxWidth: "25rem", marginInline: "auto" })

    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <IonIcon icon={menuOutline}></IonIcon>
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>
            <div>
                <div id="setting-nav" class="topbara">
                    <button onClick={() => setTab(TABS.editProfile)}>Edit Profile</button>
                    <button onClick={() => setTab(TABS.addAdmin)}>Add Admin</button>
                    <button onClick={() => setTab(TABS.changePassword)}>Change Password</button>
                    <button onClick={() => setTab(TABS.delete)}>Delete</button>
                </div>
                <form style={tabItemStyle(TABS.editProfile)} id="editForm" >
                    <h2>Edit Profile</h2>
                    <br />
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" />
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" />
                    <button class="save-button" type="submit">Save Changes</button>
                </form>
                <form id="addAdminForm" style={tabItemStyle(TABS.addAdmin)}>
                    <h2>Add Admin</h2>
                    <br />
                    <label for="adminUsername">Admin name:</label>
                    <input type="text" id="adminUsername" name="adminUsername" />
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" />
                    <label for="adminPassword">Admin Password:</label>
                    <input type="password" id="adminPassword" name="adminPassword" />
                    <label for="adminConfirmPassword">Confirm Password:</label>
                    <input type="password" id="adminConfirmPassword" name="adminConfirmPassword" />
                    <button type="submit">Add Admin</button>
                </form>
                <form id="changePasswordForm" style={tabItemStyle(TABS.changePassword)}>
                    <h2>Change Password</h2>
                    <br />
                    <label for="currentPassword">Current Password:</label>
                    <input type="password" id="currentPassword" name="currentPassword" />
                    <label for="newPassword">New Password:</label>
                    <input type="password" id="newPassword" name="newPassword" />
                    <label for="confirmNewPassword">Confirm New Password:</label>
                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" />
                    <button type="submit">Change Password</button>
                </form>

                <form id="deleteForm" style={tabItemStyle(TABS.delete)}>
                    <h2>Delete Admin</h2>
                    <br />
                    <label for="adminToDelete">Admin Username:</label>
                    <input type="text" id="adminToDelete" name="adminToDelete"></input>
                    <button type="submit">Delete Admin</button>

                </form>
            </div>
        </div>
    );
}
export default MyAccount;