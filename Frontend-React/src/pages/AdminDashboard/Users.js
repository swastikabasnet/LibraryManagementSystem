import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../AdminDashboardcss/User.css"
import { toast } from 'react-hot-toast';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const generatePdf = () => {
        const newWindow = window.open('http://localhost:8080/pdf/users', '_blank');
        if (newWindow) {
            toast.success('Generating PDF');
        } else {
            toast.error('Failed generating PDF');
        }
    }

    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
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
                            <th>Number of Borrows</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.numBookBorrowed}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
            <button class="generatepdf" onClick={generatePdf}>Generate PDF</button>
        </div>
    );
}
export default Users;