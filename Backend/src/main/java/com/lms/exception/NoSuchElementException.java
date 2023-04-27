package com.lms.exception;

public class NoSuchElementException extends RuntimeException{
    public NoSuchElementException(String msg){
        super("Element doesn't exist.");
    }
}
