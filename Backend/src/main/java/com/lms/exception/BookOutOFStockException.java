package com.lms.exception;

public class BookOutOFStockException extends RuntimeException{
    public BookOutOFStockException(String msg){
        super("Book "+ msg +" is out of stock!");
    }
}
