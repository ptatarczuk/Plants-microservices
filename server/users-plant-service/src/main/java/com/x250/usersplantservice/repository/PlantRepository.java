package com.x250.usersplantservice.repository;

import com.x250.usersplantservice.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, String> {
}
