package com.lms.services;

import com.lms.exception.BookOutOFStockException;
import com.lms.exception.BorrowNotFoundException;
import com.lms.exception.MaximumBooksBorrowedException;
import com.lms.model.Book;
import com.lms.model.Borrow;
import com.lms.model.BorrowStatus;
import com.lms.model.User;
import com.lms.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    public List<Borrow> findAll(){
        List<Borrow> borrows = new ArrayList<>();
        borrowRepository.findAll().forEach(borrows::add);
        return borrows;
    }

    public Borrow findById(long id) {
        return borrowRepository.findById(id).orElseThrow(() -> new BorrowNotFoundException(id));
    }

    public List<Borrow> findByUserId(Long userID){
        return borrowRepository.findByUserId(userID);
    }

    public void deleteRequest(long id){
        borrowRepository.deleteById(id);
    }

    public List<Borrow> getPendingBorrowRequestsByUserId(Long userId) {
        List<BorrowStatus> statuses = Arrays.asList(BorrowStatus.PENDING, BorrowStatus.ACCEPTED);
        return borrowRepository.findByUserIdAndStatusIn(userId, statuses);
    }

    @Transactional
    public Borrow requestBook(Borrow borrowBody) {
        System.out.println(borrowBody.getUser());
        User user = userService.getUserByID(borrowBody.getUser().getId());
        Book book = bookService.getBookById(borrowBody.getBook().getId());

        // Check if the user has any pending borrow requests
        List<Borrow> pendingRequests = getPendingBorrowRequestsByUserId(borrowBody.getUser().getId());
        if (pendingRequests.size() >= 2) {
            throw new MaximumBooksBorrowedException("You have reached the maximum limit of pending borrow requests.");
        }

        if (book.getAvailability() < 1) {
            throw new BookOutOFStockException(book.getBookTitle());
        }

//        book.borrowBook();
//        bookService.updateBook(book);

        Date currentDate = new java.sql.Date(System.currentTimeMillis());
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        c.add(Calendar.DATE, 7);
        Date dueDate = new java.sql.Date(c.getTimeInMillis());

        Borrow borrow = new Borrow(user, book, currentDate, dueDate, BorrowStatus.PENDING);


//        user.userBookBorrow(); // increment number of books borrowed
//        userService.updateUser(user);

        System.out.println(user.getName() + " has requested one copy of \"" + book.getBookTitle() + "\"!");

        return borrowRepository.save(borrow);
    }


    public Borrow acceptRequest(Borrow borrow) {
        Borrow request = findById(borrow.getBorrowId());

        // Check if the book is available
        Book book = bookService.getBookById(request.getBook().getId());
        if (book.getAvailability() < 1) {
            throw new BookOutOFStockException(book.getBookTitle());
        }

        // Update the borrow request status to accepted
        request.setStatus(BorrowStatus.ACCEPTED);
        borrowRepository.save(request);

        // Decrease the count of available books
        book.borrowBook();
        bookService.updateBook(book);

        // Increment the number of books borrowed by the user
        User user = request.getUser();
        user.userBookBorrow(); // increment
        userService.updateUser(user);

        return request;
    }

    public Borrow rejectRequest(Borrow borrow) {
        Borrow request = findById(borrow.getBorrowId());

        // Update the borrow request status to REJECTED
        request.setStatus(BorrowStatus.REJECTED);
        return borrowRepository.save(request);
    }


    public Borrow returnBook(Borrow borrow){
        Borrow borrowBook = findById(borrow.getBorrowId());
        Book book = bookService.getBookById(borrowBook.getBook().getId());

        // Increment number of books
        book.returnBook();
        bookService.updateBook(book);

        Date currentDate = new java.sql.Date(System.currentTimeMillis());
        borrowBook.setReturnDate(currentDate);

        User user = userService.getUserByID(borrowBook.getUser().getId());
        user.userReturnBook(); // decrement number of books borrowed
        userService.updateUser(user);

        // Update the borrow request status to RETURNED
        borrowBook.setStatus(BorrowStatus.RETURNED);
        return borrowRepository.save(borrowBook);
    }
}
