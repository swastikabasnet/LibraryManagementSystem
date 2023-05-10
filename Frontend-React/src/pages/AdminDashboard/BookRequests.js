import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function BookRequests() {
    const [borrow, setBorrow] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [bookTitle, setBookTitle] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/borrow')
            .then(response => {
                console.log(response.data);
                setBorrow(response.data);
                const userIds = response.data.map(br => br.user.id);
                const uniqueUserIds = [...new Set(userIds)];
                Promise.all(uniqueUserIds.map(getUser))
                    .then(users => {
                        const updatedUserNames = {};
                        users.forEach(user => updatedUserNames[user.id] = user.name);
                        setUserNames(updatedUserNames);
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
    }, []);


    const getUser = (id) => {
        return axios.get('http://localhost:8080/users/' + id)
            .then(response => {
                return { id, name: response.data.name };
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getBook = (id) => {
        return axios.get('http://localhost:8080/books/' + id)
            .then(response => {
                return { id, title: response.data.bookTitle };
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleAccept = (borrwID) => {
        axios.put('http://localhost:8080/borrow/accept', { borrowId: borrwID })
            .then(res => {
                toast.success("Request accepted");
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }).catch(err => console.log(err));
    }

    const handleReject = (borrwID) => {
        axios.put('http://localhost:8080/borrow/reject', { borrowId: borrwID })
            .then(res => {
                toast.error("Request rejected");
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }).catch(err => console.log(err));
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

            <div id="dashboard-container" style={{marginTop: "2rem"}}>
                <table class="dashboard-table" id="book-list">
                    <thead>
                        <tr>
                            <th>Borrow Id</th>
                            <th>Book Id</th>
                            <th>Book Title</th>
                            <th>User Id</th>
                            <th>Username</th>
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
                                <td>{br.user.id}</td>
                                <td>{userNames[br.user.id]}</td>
                                <td>{br.borrowDate}</td>
                                <td>{br.dueDate}</td>
                                <td>{br.returnDate}</td>
                                <td class="editOrDelete">
                                    {br.status === 'PENDING' ? (
                                        <>
                                            <button onClick={() => handleAccept(br.borrowId)}>Accept</button>
                                            <button onClick={() => handleReject(br.borrowId)}>Reject</button>
                                        </>
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
export default BookRequests;