package com.x250.plantservice.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlantCreateDTO(
        @NotBlank(message = "Name cannot be blank")
        String name,

        @NotBlank(message = "Description cannot be blank")
        String description,
        String photo,

        @NotNull(message = "WateringInterval cannot be null")
        Integer wateringInterval
) {
}