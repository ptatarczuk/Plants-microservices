package com.x250.plantservice.service;

import com.x250.plantservice.dto.PlantCreateDTO;
import com.x250.plantservice.dto.PlantDTOMapper;
import com.x250.plantservice.dto.PlantResponseDTO;
import com.x250.plantservice.exception.EntityNotFoundException;
import com.x250.plantservice.model.Plant;
import com.x250.plantservice.repository.PlantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

@ExtendWith(MockitoExtension.class)
class PlantServiceTest {

    @Mock
    private PlantRepository plantRepository;

    @Mock
    private PlantDTOMapper plantDTOMapper;

    @InjectMocks
    private PlantService plantService;

    @Test
    void testGetAllPlants() {
        // Mocking data
        List<Plant> plants = Arrays.asList(
                new Plant("1", "Plant 1", "Description 1", "photo1.jpg", 2),
                new Plant("2", "Plant 2", "Description 2", "photo2.jpg", 3)
        );
        Mockito.when(plantRepository.findAll()).thenReturn(plants);

        // Calling the method
        List<Plant> returnedPlants = plantService.getAllPlants();

        // Verifying the result
        Assertions.assertEquals(plants, returnedPlants);
    }

    @Test
    void testAddPlant() {
        // Mocking data
        PlantCreateDTO plantCreateDTO = new PlantCreateDTO("Plant 1", "Description 1", "photo1.jpg", 2);
        Plant plant = new Plant("1", "Plant 1", "Description 1", "photo1.jpg", 2);
        PlantResponseDTO plantResponseDTO = new PlantResponseDTO("1", "Plant 1", "Description 1", "photo1.jpg", 2);
        Mockito.when(plantRepository.save(any())).thenReturn(plant);
        Mockito.when(plantDTOMapper.apply(any())).thenReturn(plantResponseDTO);

        // Calling the method
        PlantResponseDTO returnedPlant = plantService.addPlant(plantCreateDTO);

        // Verifying the result
        Assertions.assertEquals(plantResponseDTO, returnedPlant);
    }

    @Test
    void testSearchPlantsByName() {
        // Mocking data
        String name = "Plant";
        List<Plant> plants = Arrays.asList(
                new Plant("1", "Plant 1", "Description 1", "photo1.jpg", 2),
                new Plant("2", "Plant 2", "Description 2", "photo2.jpg", 3)
        );
        List<PlantResponseDTO> plantResponseDTOList = Arrays.asList(
                new PlantResponseDTO("1", "Plant 1", "Description 1", "photo1.jpg", 2),
                new PlantResponseDTO("2", "Plant 2", "Description 2", "photo2.jpg", 3)
        );
        Mockito.when(plantRepository.findByNameContainsIgnoreCase(anyString())).thenReturn(plants);
        Mockito.when(plantDTOMapper.apply(any())).thenReturn(plantResponseDTOList.get(0), plantResponseDTOList.get(1));

        // Calling the method
        List<PlantResponseDTO> returnedPlants = plantService.searchPlantsByName(name);

        // Verifying the result
        Assertions.assertEquals(plantResponseDTOList, returnedPlants);
    }

    @Test
    void testGetPlantById() throws EntityNotFoundException {
        // Mocking data
        String id = "1";
        Plant plant = new Plant("1", "Plant 1", "Description 1", "photo1.jpg", 2);
        PlantResponseDTO plantResponseDTO = new PlantResponseDTO("1", "Plant 1", "Description 1", "photo1.jpg", 2);
        Mockito.when(plantRepository.findById(anyString())).thenReturn(Optional.of(plant));
        Mockito.when(plantDTOMapper.apply(any())).thenReturn(plantResponseDTO);

        // Calling the method
        PlantResponseDTO returnedPlant = plantService.getPlantById(id);

        // Verifying the result
        Assertions.assertEquals(plantResponseDTO, returnedPlant);
    }

    @Test
    void testGetPlantById_EntityNotFoundException() {
        // Mocking data
        String id = "1";
        Mockito.when(plantRepository.findById(anyString())).thenReturn(Optional.empty());

        // Verifying the exception
        Assertions.assertThrows(EntityNotFoundException.class, () -> plantService.getPlantById(id));
    }

}