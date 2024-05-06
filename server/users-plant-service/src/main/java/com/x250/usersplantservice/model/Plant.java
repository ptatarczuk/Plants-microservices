package com.x250.usersplantservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name="plants")
public class Plant {

    @Id
    @UuidGenerator
    private String id;

    private String name;

    private String description;

    private String photo;

    private Integer wateringInterval;

}
