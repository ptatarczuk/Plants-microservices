package com.x250.userservice.dto;

import com.x250.userservice.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record AppUserResponseDTO(
        String id,
        String username,
        String email,
        String imageUrl,
        Role role
) {
}