package com.x250.authenticationservice.service;

import com.x250.authenticationservice.dto.AuthenticationRequest;
import com.x250.authenticationservice.dto.AuthenticationResponse;
import com.x250.authenticationservice.dto.RegisterRequest;
import com.x250.authenticationservice.model.AppUser;
import com.x250.authenticationservice.repository.AppUserRepository;
import com.x250.authenticationservice.security.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        AppUser user = AppUser.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();
        Optional<AppUser> appUserOptional = repository.findByEmail(request.email());
        if (appUserOptional.isPresent()) {
            throw new RuntimeException("user already exists");
        }

        repository.save(user);

        Map<String, Object> claims = getClaims(user);
        String jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        AppUser user = repository.findByEmail(request.email())
                .orElseThrow();

        Map<String, Object> claims = getClaims(user);
        String jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public Boolean validateToken(String token) {
        return jwtService.isTokenValid(token);
    }

    private Map<String, Object> getClaims(AppUser user) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("imageUrl", user.getImageUrl());
        claims.put("role", user.getRole().name());

        return claims;
    }
}
