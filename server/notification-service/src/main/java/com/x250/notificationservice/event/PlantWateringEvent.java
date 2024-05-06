package com.x250.notificationservice.event;

import java.time.LocalDateTime;

public record PlantWateringEvent(
        Long usersPlantId,
        String plantName,
        LocalDateTime notificationDate,
        String uppUserId,
        String uppUserEmail
) {
}