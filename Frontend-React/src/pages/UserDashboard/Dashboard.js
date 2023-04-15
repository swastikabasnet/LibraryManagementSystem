import logo from '../../styles/images/user.png';
import { IonIcon } from '@ionic/react';
import { menuOutline, searchOutline } from "ionicons/icons"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                console.log(response.data);
                setBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [uBookTitle, usetbookTitle] = useState('');
    const [uQuantity, usetquantity] = useState('');
    const [uAvailability, usetAvailability] = useState('');
    const [uDescription, usetdescription] = useState('');

    return (
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <IonIcon icon={menuOutline}></IonIcon>
                </div>
                <div class="search">
                    <label>
                        <input type="text" placeholder="Search book" />
                        <IonIcon icon={searchOutline}></IonIcon>
                    </label>
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt=" logo" />
                </div>
            </div>

            <div id="dashboard-container">
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Availability</th>
                            <th>Description</th>
                            <th>Request Books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.bookTitle}</td>
                                <td>{book.quantity}</td>
                                <td>{book.availability}</td>
                                <td>{book.description}</td>
                                <td class="Request">
                                    <button >Request</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;