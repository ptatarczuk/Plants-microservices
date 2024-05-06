package com.x250.plantservice.dto;

import com.x250.plantservice.model.Plant;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PlantDTOMapper implements Function<Plant, PlantResponseDTO> {

    @Override
    public PlantResponseDTO apply(Plant plant) {
        return new PlantResponseDTO(
                plant.getId(),
                plant.getName(),
                plant.getDescription(),
                plant.getPhoto(),
                plant.getWateringInterval()
        );
    }
}
