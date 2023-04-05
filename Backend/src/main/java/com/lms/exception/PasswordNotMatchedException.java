package com.lms.exception;

public class PasswordNotMatchedException extends RuntimeException {

    public PasswordNotMatchedException(){
        super("Email or Password not matched");
    }
}
