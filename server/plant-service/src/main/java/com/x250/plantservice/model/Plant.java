package com.x250.plantservice.model;

import jakarta.persistence.*;
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
