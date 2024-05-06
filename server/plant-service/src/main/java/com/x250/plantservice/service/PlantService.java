package com.x250.plantservice.service;

import com.x250.plantservice.dto.PlantCreateDTO;
import com.x250.plantservice.dto.PlantDTOMapper;
import com.x250.plantservice.dto.PlantResponseDTO;
import com.x250.plantservice.exception.EntityNotFoundException;
import com.x250.plantservice.model.Plant;
import com.x250.plantservice.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantService {

    private final PlantRepository plantRepository;
    private final PlantDTOMapper plantDTOMapper;

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public PlantResponseDTO addPlant(PlantCreateDTO plantCreateDTO) {
        Plant plant = mapPlantCreateDTO(plantCreateDTO);
        return plantDTOMapper.apply(plantRepository.save(plant));
    }

    private Plant mapPlantCreateDTO(PlantCreateDTO plantCreateDTO) {
        return Plant.builder()
                .name(plantCreateDTO.name())
                .description(plantCreateDTO.description())
                .photo(plantCreateDTO.photo())
                .wateringInterval(plantCreateDTO.wateringInterval())
                .build();
    }

    public List<PlantResponseDTO> searchPlantsByName(String name) {

        return plantRepository.findByNameContainsIgnoreCase(name).stream()
                .map(plantDTOMapper)
                .toList();
    }

    public PlantResponseDTO getPlantById(String id) throws EntityNotFoundException {
        return plantDTOMapper.apply(plantRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plant " + id + " not found in DB")));
    }

}
