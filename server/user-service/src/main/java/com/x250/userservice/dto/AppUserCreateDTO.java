package com.x250.userservice.dto;

import com.x250.userservice.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record AppUserCreateDTO(
        String userName,
        String email,
        String password,
        Role role
) {

}
