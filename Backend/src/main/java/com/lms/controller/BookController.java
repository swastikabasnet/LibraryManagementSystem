package com.lms.controller;

import com.lms.model.Book;
import com.lms.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public Book getBookByID(@PathVariable long id){
        return bookService.getBookById(id);
    }

    @PostMapping("/books")
    public @ResponseBody Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @PutMapping("/books/{id}")
    public void updateBook(@RequestBody Book book, @PathVariable long id) {
        Book setBook = bookService.getBookById(id);
        setBook.setBookTitle(book.getBookTitle());
        setBook.setAuthor(book.getAuthor());
        setBook.setCategory(book.getCategory());
        setBook.setDescription(book.getDescription());
        setBook.setQuantity(book.getQuantity());
        setBook.setAvailability(book.getAvailability());
        setBook.setPublishedDate(book.getPublishedDate());
        bookService.updateBook(setBook);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable long id) {
        bookService.deleteBook(id);
    }
}
