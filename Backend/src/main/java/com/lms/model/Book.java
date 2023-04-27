package com.lms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "Books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "book_title", nullable = false)
    private String bookTitle;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    @Min(value = 0)
    private long quantity;
    @Column(nullable = false)
    @Min(value = 0)
    private long availability;
    @Column(name = "published_date", nullable = false)
    String publishedDate;
    @Column(name = "registered_date", nullable = false)
    String registeredDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

    @OneToMany(mappedBy = "book")
    @JsonBackReference // Add this annotation
    private List<Borrow> borrows;

    public List<Borrow> getBorrows() {
        return borrows;
    }

    public void setBorrows(List<Borrow> borrows) {
        this.borrows = borrows;
    }

    public Book() {
    }

    public Book(long id, String bookTitle, String author, String category, String description, long quantity, long availability, String publishedDate, String registeredDate) {
        this.id = id;
        this.bookTitle = bookTitle;
        this.author = author;
        this.category = category;
        this.description = description;
        this.quantity = quantity;
        this.availability = availability;
        this.publishedDate = publishedDate;
        this.registeredDate = registeredDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public long getAvailability() {
        return availability;
    }

    public void setAvailability(long availability) {
        if (availability >= this.quantity) {
            this.availability = this.quantity;
        } else {
            this.availability = availability;
        }
    }

    public String getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(String registeredDate) {
        this.registeredDate = registeredDate;
    }

    public void borrowBook() {
        this.availability--;
    }

    public void returnBook() {
        this.availability++;
    }
}

