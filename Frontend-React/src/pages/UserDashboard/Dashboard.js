
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import "../../UserDashboardcss/UserDashboard.css"

function Dashboard() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                console.log(response.data[0].id);
                setBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const userId = sessionStorage.getItem('userId');
    console.log(userId);

    const handleBorrow = (id) => {
        axios.post('http://localhost:8080/borrow', { user: { id: userId }, book: { id: id } })
            .then(response => {
                console.log(response.data);
                // window.location.reload(true);
                toast.success("Book requested");
            })
            .catch(error => {
                toast.error("Failed, max 2 request");
                console.log(error);
            });
    };


    return (
        <div class="main">
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
                                    <button type='button' onClick={() => handleBorrow(book.id)} >Request</button>
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