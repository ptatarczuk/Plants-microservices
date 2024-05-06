package com.x250.authenticationservice.exception;

public class CaptchaVerificationException extends RuntimeException{

    public CaptchaVerificationException(String message) {
        super(message);
    }
}
