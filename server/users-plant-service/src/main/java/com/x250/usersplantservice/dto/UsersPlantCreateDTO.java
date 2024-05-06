package com.x250.usersplantservice.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public record UsersPlantCreateDTO(
        String appUserId,
        String plantId
) {
}