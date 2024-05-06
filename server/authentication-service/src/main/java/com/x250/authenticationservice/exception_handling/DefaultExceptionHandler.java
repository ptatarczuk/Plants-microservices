package com.x250.authenticationservice.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({AuthenticationException.class})
    @ResponseBody
    public ResponseEntity<Map<String, String>> handleAuthenticationException(Exception ex) {

        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(HttpStatus.UNAUTHORIZED.toString(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMap);
    }

    @ExceptionHandler({AuthorizationServiceException.class})
    @ResponseBody
    public ResponseEntity<Map<String, String>> handleAuthorizationException(Exception ex) {

        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(HttpStatus.FORBIDDEN.toString(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMap);
    }

}