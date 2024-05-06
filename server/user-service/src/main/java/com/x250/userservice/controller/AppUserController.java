package com.x250.userservice.controller;

import com.x250.userservice.dto.AppUserCreateDTO;
import com.x250.userservice.dto.AppUserResponseDTO;
import com.x250.userservice.exception.EntityNotFoundException;
import com.x250.userservice.service.AppUserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<AppUserResponseDTO> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppUserResponseDTO getUserById(
            @PathVariable String id
    ) throws EntityNotFoundException {
        return appUserService.getUserById(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponseDTO addUser(@RequestBody AppUserCreateDTO appUserCreateDTO) {
        return appUserService.addUser(appUserCreateDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @CircuitBreaker(name = "users_plant", fallbackMethod = "fallbackMethod")
    @TimeLimiter(name = "users_plant")
    @Retry(name = "users_plant")
    public CompletableFuture<String> deleteUser(@PathVariable String id) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return appUserService.deleteUser(id);
            } catch (RuntimeException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }

    public CompletableFuture<String> fallbackMethod(String id, RuntimeException ex) {
        if (ex.getMessage().equals("User " + id + " not found in database")) {
            return CompletableFuture.supplyAsync(() -> ex.getMessage());
        }
        return CompletableFuture.supplyAsync(() -> "Oops! Something went wrong, please try to delete user later!");
    }
//
//    public CompletableFuture<String> fallbackMethod(String id, RuntimeException runtimeException){
//        return CompletableFuture.supplyAsync(() -> "Oops! Something went wrong, please try to delete user later!");
//    }

}
