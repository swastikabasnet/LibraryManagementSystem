package com.lms.exception;

public class EmailNotFoundException extends RuntimeException{

    public EmailNotFoundException(String email){
        super("Could not found email "+ email+"!");
    }
}
