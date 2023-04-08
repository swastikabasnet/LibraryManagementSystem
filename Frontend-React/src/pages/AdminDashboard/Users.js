import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/logo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/Users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <div>
                <div class="main">
                    <div class="topbar">
                        <div class="toggle">
                            <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                        </div>
                        <div class="user">
                            <img class="user" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div id="dashboard-container">
                        <table class="dashboard-table" id="book-list">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Name</th>
                                    <th>Email Address</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                    </tr>))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Users;