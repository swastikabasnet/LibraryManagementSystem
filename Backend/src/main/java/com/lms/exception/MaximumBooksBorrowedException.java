package com.lms.exception;

public class MaximumBooksBorrowedException extends RuntimeException{
    public MaximumBooksBorrowedException(String msg){
        super(msg);
    }
}
