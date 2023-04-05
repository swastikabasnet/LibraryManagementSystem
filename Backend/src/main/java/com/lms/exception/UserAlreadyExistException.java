package com.lms.exception;

public class UserAlreadyExistException extends RuntimeException{
    public UserAlreadyExistException(){
        super("User Already Exist");
    }
}
