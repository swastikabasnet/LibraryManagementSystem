package com.lms.exception;

public class BorrowNotFoundException extends RuntimeException{
    public BorrowNotFoundException(long id){
        super("Borrow Id "+ id +" not found");
    }
}
