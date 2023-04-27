package com.lms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "Users1")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "phone_number", nullable = false, unique = true)
    private long phoneNumber;
    @Column(name = "password", nullable = false)
    private String password;
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    @Column(name = "registered_date")
    Date registeredDate = new java.sql.Date(System.currentTimeMillis());
    @Column(name = "numBookBorrowed")
    @Min(value = 0)
    private int numBookBorrowed;

    // In User class
    @OneToMany(mappedBy = "user")
    @JsonBackReference // Add this annotation
    private List<Borrow> borrows;

    public List<Borrow> getBorrows() {
        return borrows;
    }

    public void setBorrows(List<Borrow> borrows) {
        this.borrows = borrows;
    }

    public User() {
    }

    public User(long id, String name, String email, int phoneNumber, String password, Date registeredDate, int numBookBorrowed) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.registeredDate = registeredDate;
        this.numBookBorrowed = numBookBorrowed;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(Date registeredDate) {
        this.registeredDate = registeredDate;
    }

    public int getNumBookBorrowed() {
        return numBookBorrowed;
    }

    public void setNumBookBorrowed(int numBookBorrowed) {
        this.numBookBorrowed = numBookBorrowed;
    }

    public void userBookBorrow(){
        this.numBookBorrowed++;
    }

    public void userReturnBook(){
        this.numBookBorrowed--;
    }
}
