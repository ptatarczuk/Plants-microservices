package com.x250.authenticationservice.controller;

import com.x250.authenticationservice.captcha.RecaptchaService;
import com.x250.authenticationservice.dto.AuthenticationRequest;
import com.x250.authenticationservice.dto.AuthenticationResponse;
import com.x250.authenticationservice.dto.RegisterRequest;
import com.x250.authenticationservice.exception.CaptchaVerificationException;
import com.x250.authenticationservice.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final RecaptchaService recaptchaService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestParam(name = "g-recaptcha-response", required = false) String recaptchaResponse,
            HttpServletRequest request,
            @Valid @RequestBody  RegisterRequest registerRequest
    ) {
        String ip = getIp(request);
        boolean isCaptchaValid = recaptchaService.isValidCaptcha(ip, recaptchaResponse);

        if(!isCaptchaValid) {
//            return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Captcha verification failed");
            throw new CaptchaVerificationException("Captcha verification failed"); // CustomRuntimeException
        }
        return ResponseEntity.ok(service.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    private String getIp(HttpServletRequest request) {
        String ip;
        try {
            ip = request.getRemoteAddr();
            if (ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1")) {
                InetAddress hostAddress = InetAddress.getLocalHost();
                ip = hostAddress.getHostAddress();
            }
        } catch (UnknownHostException e) {
            ip = "unknown";
        }
        return ip;
    }

}
