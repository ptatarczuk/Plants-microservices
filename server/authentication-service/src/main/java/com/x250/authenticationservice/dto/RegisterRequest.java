package com.x250.authenticationservice.dto;

import com.x250.authenticationservice.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public record RegisterRequest(
        @NotBlank(message = "username cannot be blank")
        String username,
        @Email(
                regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                message = "incorrect email"
        )
        String email,
        @NotBlank(message = "password cannot be blank")
        String password,
        Role role
) {
}
