import "../../styles/AddBooks.css";
import { IonIcon } from '@ionic/react';
import { menuOutline } from "ionicons/icons";
import logo from '../../styles/images/admin.png';
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddBooks() {
    // useEffect(() => {
    //     showAddForm();
    // }, []);

    // add books
    const [bookTitle, setBookTitle] = useState('');
    const [author, setauthor] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [publishedDate, setpublishedDate] = useState('');
    const navigate = useNavigate();

    // add new book
    const register = async (event) => {
        event.preventDefault()

        const currentDate = new Date();
        const selectedDate = new Date(publishedDate);

        if (selectedDate > currentDate) {
            toast.error('Date cannot be in the future');
            return;
        }

        // Check if any input fields are empty
        if (!bookTitle || !author || !category || !description || !quantity || !publishedDate) {
            toast.error('Fill out all fields.');
            return;
        }

        const requestBody = {
            "bookTitle": bookTitle,
            "author": author,
            "category": category,
            "description": description,
            "quantity": quantity,
            "availability": quantity,
            "publishedDate": publishedDate
        };

        await axios.post("http://localhost:8080/books", requestBody)
            .then(response => {
                // navigate("/admindashboard/AddBooks", { state: response.data })
                // book add success
                toast.success("Book added successfully");
                setBookTitle("");
                setauthor("");
                setcategory("");
                setdescription("");
                setquantity("");
                setpublishedDate("");
            })
            .catch(error => {
                console.log(error);
                toast.error("Failed to add book");
            });
    }


    // // edit
    // const updateBook = async (updatedBookData) => {
    //     await axios.put(`http://localhost:8080/books/${bookId}`, updatedBookData);
    //     navigate("/admindashboard/AddBooks");
    // }


    // // delete
    // const [bookId, setBookId] = useState('');
    // const [bookQuantity, setBookQuantity] = useState('');

    // const deleteBook = async (event) => {
    //     await axios.delete(`http://localhost:8080/books/${bookId}`).then(response => {
    //         navigate("/admindashboard/AddBooks", { state: response.data })
    //     })
    // }

    return (
        <div class="ManageBook-body">
            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <span class="icon"><IonIcon icon={menuOutline}></IonIcon></span>
                    </div>
                    <div class="user">
                        <img class="navLogo" src={logo} alt="logo" />
                    </div>
                </div>
                <div>
                    {/* <div class="options">
                        <h1>Manage Books</h1>
                        <button id="addBtn" onClick={showAddForm}>Add</button>
                        <button id="editBtn" onClick={showEditForm}>Edit</button>
                        <button id="deleteBtn" onClick={showdeleteForm}>Delete</button>
                    </div> */}

                    <div id="addForm">
                        <h1>Add Book</h1>
                        <form>
                            <label for="authorName">Author Name:</label>
                            <input type="text" id="authorName" name="authorName" onChange={(e) => { setauthor(e.target.value) }} autoComplete="off" required value={author} />
                            <label for="bookTitle">Book Title:</label>
                            <input type="text" id="bookTitle" name="bookTitle" onChange={(e) => { setBookTitle(e.target.value) }} autoComplete="off" required value={bookTitle} />
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" min="0" onChange={(e) => { setquantity(e.target.value) }} autoComplete="off" required value={quantity} />
                            <label for="category">Category:</label>
                            <input type="text" id="category" name="category" onChange={(e) => { setcategory(e.target.value) }} autoComplete="off" required value={category} />
                            <label for="bookDesc">Book Description:</label>
                            <textarea id="bookDesc" name="bookDesc" onChange={(e) => { setdescription(e.target.value) }} autoComplete="off" required value={description}></textarea>
                            <label for="bookpublished">Book Published</label>
                            <input type="date" id="bookpublished" name="bookpublished" onChange={(e) => { setpublishedDate(e.target.value) }} autoComplete="off" required value={publishedDate} />
                            <button type="submit" onClick={register}>Add Book</button>
                        </form>
                    </div>
                    {/* <div id="editForm">
                        <h2>Edit Book</h2>
                        <form>
                            <label for="bookid">Book ID:</label>
                            <input type="text" id="bookid" name="bookid" />
                            <label for="authorName">Author Name:</label>
                            <input type="text" id="authorName" name="authorName" />
                            <label for="bookTitle">Book Title:</label>
                            <input type="text" id="bookTitle" name="bookTitle" />
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" />
                            <label for="category">Category:</label>
                            <input type="text" id="category" name="category" />
                            <label for="bookDesc">Book Description:</label>
                            <textarea id="bookDesc" name="bookDesc"></textarea>
                            <label for="bookpublished">Book Published</label>
                            <input type="date" id="bookpublished" name="bookpublished" />
                            <button type="submit" onclick="editBook()">Edit Book</button>
                        </form>
                    </div>
                    <div id="deleteForm">
                        <h2>Delete Book</h2>
                        <form>
                            <label for="bookid">Book ID:</label>
                            <input type="text" id="bookid" name="bookid" onChange={(e) => { setBookId(e.target.value) }} />
                            <button type="submit" onClick={deleteBook}>Delete Book</button>
                        </form>
                    </div> */}
                </div>
            </div>

        </div>
    );
}


// function showAddForm() {
//     document.getElementById("addForm").style.display = "block";
//     document.getElementById("editForm").style.display = "none";
//     document.getElementById("deleteForm").style.display = "none";
// }

// function showEditForm() {
//     document.getElementById("editForm").style.display = "block";
//     document.getElementById("addForm").style.display = "none";
//     document.getElementById("deleteForm").style.display = "none";
// }

// function showdeleteForm() {
//     document.getElementById("addForm").style.display = "none";
//     document.getElementById("editForm").style.display = "none";
//     document.getElementById("deleteForm").style.display = "block";
// }

export default AddBooks;
