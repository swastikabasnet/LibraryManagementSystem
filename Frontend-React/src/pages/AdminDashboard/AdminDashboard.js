import logo from '../../styles/images/logo.png';
import { IonIcon } from '@ionic/react';
import { book, library, menuOutline, people, reader, reload, searchOutline } from "ionicons/icons"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {

    const [books, setBooks] = useState([]);
    const [editID, setEditID] = useState(-1);
    const [bookTitle, setbookTitle] = useState('');
    const [author, setauthor] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [availability, setAvailability] = useState('');
    const [publishedDate, setpublishedDate] = useState('');

    const [uBookTitle, usetbookTitle] = useState('');
    const [uQuantity, usetquantity] = useState('');
    const [uAvailability, usetAvailability] = useState('');
    const [uDescription, usetdescription] = useState('');
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


    const handleEdit = (id) => {
        axios.get('http://localhost:8080/books/' + id)
            .then(res => {
                usetbookTitle(res.data.bookTitle);
                usetquantity(res.data.quantity);
                usetAvailability(res.data.availability);
                usetdescription(res.data.description);
                setauthor(res.data.author);
                setpublishedDate(res.data.publishedDate);
                setcategory(res.data.category);
            })
        setEditID(id)
    }

    const handleUpdate = () => {
        axios.put('http://localhost:8080/books/' + editID, { id: editID, bookTitle: uBookTitle, author: author, category: category, quantity: uQuantity, availability: uAvailability, description: uDescription, publishedDate: publishedDate })
            .then(res => {
                console.log(res);
                window.location.reload(false);
            }).catch(err => console.log(err));
    }


    const handleDelete = (id) => {
        axios.delete('http://localhost:8080/books/' + id)
            .then(res => {
                window.location.reload(false);
            }).catch(err => console.log(err));
    }

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
                    <img class="user" src={logo} alt="logo" />
                </div>
            </div>
            <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">1,504</div>
                        <div class="cardName">Total Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={library}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">80</div>
                        <div class="cardName">Available Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={reader}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">284</div>
                        <div class="cardName">Issued Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={book}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">120</div>
                        <div class="cardName">Total Members</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={people}></IonIcon>
                    </div>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            book.id === editID ?
                                <tr>
                                    <td>{book.id}</td>
                                    <td><input type='text' value={uBookTitle} onChange={(e) => { usetbookTitle(e.target.value) }} /></td>
                                    <td><input type='text' value={uQuantity} onChange={(e) => { usetquantity(e.target.value) }} /></td>
                                    <td><input type='text' value={uAvailability} onChange={(e) => { usetAvailability(e.target.value) }} /></td>
                                    <td><textarea type='text' value={uDescription} onChange={(e) => { usetdescription(e.target.value) }} /></td>
                                    <td class="update"><button onClick={handleUpdate}>Update</button></td>
                                </tr>
                                :
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.availability}</td>
                                    <td>{book.description}</td>
                                    <td class="editOrDelete">
                                        <button onClick={() => handleEdit(book.id)}>edit</button>
                                        <button onClick={() => handleDelete(book.id)}>delete</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
export default AdminDashboard;