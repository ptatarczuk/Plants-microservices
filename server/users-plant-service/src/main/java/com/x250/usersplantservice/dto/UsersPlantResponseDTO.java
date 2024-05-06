package com.x250.usersplantservice.dto;

import com.x250.usersplantservice.model.Plant;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

public record UsersPlantResponseDTO(
        Long id,
        String appUserId,
        Plant plant,
        LocalDateTime nextWatering
) {
}