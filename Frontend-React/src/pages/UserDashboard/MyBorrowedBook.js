
import "../../styles/BorrowedBooks.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import logo from '../../styles/images/user.png';



function MyBorrowedBook() {
    const [bookTitle, setBookTitle] = useState({});
    const [borrow, setBorrow] = useState([]);
    const userId = parseInt(sessionStorage.getItem('userId'));
    // console.log(userId);

    useEffect(() => {
        axios.get(`http://localhost:8080/borrow/user/${userId}`)
            .then(response => {
                // console.log(response.data);
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

    // return book
    const handleReturn = (borrwID, bookID, userID) => {
        setBookId(bookID);
        axios.put('http://localhost:8080/borrow/return', { borrowId: borrwID, bookId: bookID, userId: userID })
            .then(res => {
                // change return status
                axios.get('http://localhost:8080/requests')
                    .then(response => {
                        const requests = response.data;
                        let returnId = null;
                        // console.log("user", userID, "book", bookID);
                        for (let i = 0; i < requests.length; i++) {
                            const req = requests[i];
                            // console.log(i);
                            // console.log(req);
                            if (req.user.id === userID && req.book.id === bookID) {
                                // console.log(req.user.id);
                                returnId = req.id;
                                break;
                            }
                        }
                        // console.log(returnId);
                        if (returnId !== null) {
                            axios.put(`http://localhost:8080/requests/${returnId}`, { user: { id: userID }, book: { id: bookID } })
                                .then(response => {
                                    // console.log("response \n", response.data);
                                    toast.success("Book return success");
                                    setTimeout(() => {
                                        setShowRatingForm(true);
                                    }, 500);
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        // handle error
                    });
                // toast.success("Book returned");
            }).catch(err => console.log(err));
    }


    const [showRatingForm, setShowRatingForm] = useState(false);
    // user rating form
    const [rating, setRating] = useState();
    const [review, setReview] = useState("");
    const [bookId, setBookId] = useState();

    const submitReview = (event) => {
        event.preventDefault();

        if (!rating || !review) {
            toast.error("Please rate the book and write a review.");
            return;
        }

        if (rating > 5 || rating < 0) {
            toast.error("Please rate the book between 0 and 5.");
            return;
        }

        // Check if the user has already reviewed the book
        axios
            .get("http://localhost:8080/ratings", {
                params: {
                    user: userId,
                    book: bookId,
                },
            })
            .then((response) => {
                let existingRating = null;
                for (let i = 0; i < response.data.length; i++) {
                    const rating = response.data[i];
                    if (rating.book.id === bookId && rating.user.id === userId) {
                        existingRating = rating;
                        break;
                    }
                }
                if (existingRating) {
                    // Update existing rating
                    axios
                        .put(
                            `http://localhost:8080/ratings/${existingRating.id}`,
                            {
                                rating: rating,
                                review: review,
                                user: { id: userId },
                                book: { id: bookId },
                            }
                        )
                        .then((response) => {
                            toast.success("Book review updated.");
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 500);
                        })
                        .catch((error) => {
                            toast.error("Update error.");
                            console.log(error);
                        });
                } else {
                    // Create new rating
                    axios
                        .post("http://localhost:8080/ratings", {
                            rating: rating,
                            review: review,
                            user: { id: userId },
                            book: { id: bookId },
                        })
                        .then((response) => {
                            toast.success("Book review success.");
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 500);
                        })
                        .catch((error) => {
                            toast.error("Rating error.");
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                toast.error("Failed to review.");
                console.log(error);
            });
    };

    return (
        <div class="main">
            <div class="topbar">

                <div class="toggle">
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>
            <div id="dashboard-container" style={{ marginTop: "2rem" }}>
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
                                        <button onClick={() => handleReturn(br.borrowId, br.book.id, userId)}>Return</button>
                                    ) : (
                                        br.status
                                    )}
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
            {showRatingForm && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Book Review</h2>
                        <form style={{ borderColor: '#f5f5f5' }}>
                            <label>
                                Rating (0-5):
                                <input type="number" min="0" max="5" onChange={(e) => setRating(e.target.value)} />
                            </label>
                            <label>
                                Review:
                                <textarea onChange={(e) => setReview(e.target.value)}></textarea>
                            </label>
                            <button type="submit" onClick={submitReview} >Submit Review</button>
                            {/* <button type="submit" onClick={setShowRatingForm(false)} >Close</button> */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyBorrowedBook;