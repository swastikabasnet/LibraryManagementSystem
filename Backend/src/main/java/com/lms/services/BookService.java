package com.lms.services;

import com.lms.exception.BookNotFoundException;
import com.lms.exception.UserNotFoundException;
import com.lms.model.Book;
import com.lms.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks(){
        List<Book> book = new ArrayList<>();
        bookRepository.findAll().forEach(book::add);
        return book;
    }

    public Book getBookById(long id) {
        return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
    }

    public Book addBook(Book book) {
        return  bookRepository.save(book);
    }

    public void updateBook(Book book){
        bookRepository.save(book);
    }
    public void deleteBook(long id){
        bookRepository.deleteById(id);
    }
}
