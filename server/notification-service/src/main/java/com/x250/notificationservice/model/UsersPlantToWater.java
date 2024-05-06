package com.x250.notificationservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersPlantToWater {

    @Id
    private Long usersPlantId;
    private String plantName;
    private LocalDateTime notificationDate;
    private String appUserId;
    private String appUserEmail;
    private Boolean emailSent;

}