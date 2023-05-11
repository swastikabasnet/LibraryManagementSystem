
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../styles/images/user.png';
import { toast } from 'react-hot-toast';
import { useResolvedPath } from 'react-router-dom';
// import "../../UserDashboardcss/UserDashboard.css"

function Dashboard() {

    // get books
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                // console.log(response.data[0].id);
                setBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const userId = sessionStorage.getItem('userId');
    const [userName, setUserName] = useState("");
    // console.log(userId);

    // get user
    useEffect(() => {
        axios.get('http://localhost:8080/users/' + userId)
            .then(response => {
                setUserName(response.data.name);
            })
    })

    // borrow book
    const handleBorrow = (id) => {
        axios.post('http://localhost:8080/borrow', { user: { id: userId }, book: { id: id } })
            .then(response => {
                // console.log(response.data);
                // window.location.reload(true);
                toast.success("Book requested");
            })
            .catch(error => {
                toast.error("Failed, max 2 request");
                console.log(error);
            });
    };

    // get rating
    const [averageRatings, setAverageRatings] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8080/ratings')
            .then(response => {
                const ratingMap = {};
                for (let i = 0; i < response.data.length; i++) {
                    const bookId = response.data[i].book.id;
                    const rating = response.data[i].rating;
                    if (ratingMap[bookId]) {
                        ratingMap[bookId].totalRating += rating;
                        ratingMap[bookId].numRatings += 1;
                    } else {
                        ratingMap[bookId] = { totalRating: rating, numRatings: 1 };
                    }
                }
                const newAverageRatings = {};
                for (const [bookId, ratingInfo] of Object.entries(ratingMap)) {
                    const averageRating = ratingInfo.totalRating / ratingInfo.numRatings;
                    newAverageRatings[bookId] = averageRating.toFixed(1); // format to one decimal place
                }
                setAverageRatings(newAverageRatings);
            })
    }, []);

    // console.log(averageRatings);


    return (
        <div class="main">
            <div class="topbar">
                <h3 style={{ margin: '4px', padding: '4px', color: '#2d6d05' }}>Hello, {userName}</h3>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>
            <div id="dashboard-container" style={{ marginTop: "2rem" }}>
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Availability</th>
                            <th>Description</th>
                            <th>Ratings</th>
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
                                <td>
                                    {averageRatings[book.id] ? (
                                        <strong>{averageRatings[book.id]}</strong>
                                    ) : (
                                        '0.0'
                                    )} / 5
                                </td>
                                <td class="Request">
                                    <button class="request-button" type='button' onClick={() => handleBorrow(book.id)} >Request</button>
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