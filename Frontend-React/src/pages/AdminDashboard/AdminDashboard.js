import logo from '../../styles/images/admin.png';
import { IonIcon } from '@ionic/react';
import { book, library, menuOutline, people, reader, reload, searchOutline } from "ionicons/icons"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../AdminDashboardcss/Dashboard.css'
import { toast } from 'react-hot-toast';

function AdminDashboard() {
    const adminId = sessionStorage.getItem('adminId');

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
    const [totalmenmbers, settotalmenmbers] = useState('');
    const [totalbooks, settotalbooks] = useState('');
    const [totalAvailibility, setTotalAvailibility] = useState("");
    const [totalIssued, setTotalIssue] = useState("");

    // dynamic data to get in Admin Dashboard
    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                // get total user count
                settotalmenmbers(response.data.length)
                // get total number of borrowed book count
                let count = 0;
                for (let i = 0; i < response.data.length; i++) {
                    count += response.data[i].numBookBorrowed;
                }
                setTotalIssue(count);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // get books and the total availibility count
    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                // console.log(response.data);
                setBooks(response.data);
                settotalbooks(response.data.length);
                let count = 0;
                for (let i = 0; i < response.data.length; i++) {
                    count += response.data[i].availability;
                }
                setTotalAvailibility(count);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    // edit book
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

    // updated edited book
    const handleUpdate = () => {

        if (uQuantity < 0 || uAvailability < 0) {
            toast.error("Invalid negative value");
            return;
        }

        axios.put('http://localhost:8080/books/' + editID, { id: editID, bookTitle: uBookTitle, author: author, category: category, quantity: uQuantity, availability: uAvailability, description: uDescription, publishedDate: publishedDate })
            .then(res => {
                console.log(res);
                window.location.reload(false);
            }).catch(err => console.log(err));
    }

    // delete book
    const handleDelete = (id) => {
        axios.delete('http://localhost:8080/books/' + id)
            .then(res => {
                window.location.reload(false);
            }).catch(err => console.log(err));
    }


    //generate book pdf
    const generatePdf = () => {
        const newWindow = window.open('http://localhost:8080/pdf/books', '_blank');
        if (newWindow) {
            toast.success('Generating PDF');
        } else {
            toast.error('Failed generating PDF');
        }
    }

    return (
        <div class="main">
            <div class="topbar">
                <h3 style={{margin:'4px', padding: '4px'}}>Hello, Admin</h3>
                <div class="toggle">
                    
                </div>
                <div class="user">
                    <img class="navLogo" src={logo} alt="logo" />
                </div>
            </div>
            <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">{totalbooks}</div>
                        <div class="cardName">Total Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={library}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{totalAvailibility}</div>
                        <div class="cardName">Available Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={reader}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{totalIssued}</div>
                        <div class="cardName">Issued Books</div>
                    </div>

                    <div class="iconBx">
                        <IonIcon icon={book}></IonIcon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">{totalmenmbers}</div>
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
                                        <button onClick={() => handleEdit(book.id)}>Edit</button>
                                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <button class="generatepdf" onClick={generatePdf}>Generate PDF</button>
        </div>
    );
}
export default AdminDashboard;