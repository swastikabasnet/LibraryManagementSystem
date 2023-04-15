package com.lms.exception;

public class PhoneNumberAlreadyExistException extends RuntimeException {
    public PhoneNumberAlreadyExistException(){
        super("Phone number already exist! ");
    }
}
