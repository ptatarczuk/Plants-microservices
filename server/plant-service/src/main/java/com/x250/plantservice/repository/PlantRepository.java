package com.x250.plantservice.repository;

import com.x250.plantservice.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, String> {

    List<Plant> findByNameContainsIgnoreCase(String name);
}
