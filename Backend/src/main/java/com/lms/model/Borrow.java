package com.lms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.sql.Date;


@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "Borrow")
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long borrowId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("borrows")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonIgnoreProperties("borrows")
    private Book book;

    @Enumerated(EnumType.STRING)
    private BorrowStatus status;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date borrowDate;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date returnDate;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date dueDate;

    public Borrow() {
    }

    public Borrow(User user, Book book, Date borrowDate, Date dueDate, BorrowStatus status) {
        this.user = user;
        this.book = book;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public long getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(long borrowId) {
        this.borrowId = borrowId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }


    public BorrowStatus getStatus() {
        return status;
    }

    public void setStatus(BorrowStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Borrow{" +
                "borrowId=" + borrowId +
                ", bookId=" + book +
                ", userId=" + user +
                ", status='" + status + '\'' +
                ", borrowDate=" + borrowDate +
                ", returnDate=" + returnDate +
                ", dueDate=" + dueDate +
                '}';
    }
}