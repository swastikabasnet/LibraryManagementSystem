
import "../../styles/BorrowedBooks.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
// import '../../UserDashboardcss/BookRequest.css';

function MyBorrowedBook() {
    const [bookTitle, setBookTitle] = useState({});
    const [borrow, setBorrow] = useState([]);
    const userId = sessionStorage.getItem('userId');
    console.log(userId);

    useEffect(() => {
        axios.get(`http://localhost:8080/borrow/user/${userId}`)
            .then(response => {
                console.log(response.data);
                setBorrow(response.data);
                const bookIds = response.data.map(br => br.book.id);
                const uniqueBookIds = [...new Set(bookIds)];
                Promise.all(uniqueBookIds.map(getBook))
                    .then(books => {
                        const updatedBookTitles = {};
                        books.forEach(book => updatedBookTitles[book.id] = book.title);
                        setBookTitle(updatedBookTitles);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }, [userId]);

    const getBook = async (id) => {
        try {
            const response = await axios.get('http://localhost:8080/books/' + id);
            return { id, title: response.data.bookTitle };
        } catch (error) {
            console.log(error);
        }
    }

    const handleReturn = (borrwID, bookID, userID) => {
        axios.put('http://localhost:8080/borrow/return', { borrowId: borrwID, bookId: bookID, userId: userID })
            .then(res => {
                toast.success("Book returned");
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }).catch(err => console.log(err));
    }

    return (
        <div class="main">
            <div id="dashboard-container">
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Borrow Id</th>
                            <th>Book Id</th>
                            <th>Book Title</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrow.map(br => (
                            <tr key={br.id}>
                                <td>{br.borrowId}</td>
                                <td>{br.book.id}</td>
                                <td>{bookTitle[br.book.id]}</td>
                                <td>{br.borrowDate}</td>
                                <td>{br.dueDate}</td>
                                <td>{br.returnDate}</td>
                                <td>
                                    {br.status === 'ACCEPTED' ? (
                                        <button onClick={() => handleReturn(br.borrowId, br.bookId, userId)}>Return</button>
                                    ) : (
                                        br.status
                                    )}
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyBorrowedBook;