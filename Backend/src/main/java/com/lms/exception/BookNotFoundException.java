package com.lms.exception;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(long id){
        super("Could not found book with id "+ id);
    }
}
