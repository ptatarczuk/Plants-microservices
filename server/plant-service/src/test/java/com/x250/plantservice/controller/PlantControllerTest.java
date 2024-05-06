package com.x250.plantservice.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.x250.plantservice.dto.PlantCreateDTO;
import com.x250.plantservice.dto.PlantResponseDTO;
import com.x250.plantservice.exception.EntityNotFoundException;
import com.x250.plantservice.model.Plant;
import com.x250.plantservice.service.PlantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest
//@AutoConfigureMockMvc
//@ExtendWith(MockitoExtension.class)

@WebMvcTest(PlantController.class)
class PlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlantService plantService;

    @Autowired
    private ObjectMapper objectMapper;

    private List<PlantResponseDTO> mockPlantResponseDTOList;
    private PlantResponseDTO mockPlantResponseDTO;
    private PlantCreateDTO mockPlantCreateDTO;

    @BeforeEach
    void setUp() {
        mockPlantResponseDTOList = Arrays.asList(
                new PlantResponseDTO("1", "Plant 1", "Description 1", "photo1.jpg", 2),
                new PlantResponseDTO("2", "Plant 2", "Description 2", "photo2.jpg", 3)
        );
        mockPlantResponseDTO = new PlantResponseDTO("1", "Plant 1", "Description 1", "photo1.jpg", 2);

        mockPlantCreateDTO = new PlantCreateDTO("Plant 1", "Description 1", "photo1.jpg", 2);
    }

    @Test
    void testGetAllPlants() throws Exception {
        when(plantService.getAllPlants()).thenReturn(Arrays.asList());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/plant/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }


    @Test
    void getAllPlantsItShouldGetAnEmptyList() throws Exception {

        //given
        when(plantService.getAllPlants()).thenReturn(new ArrayList<>());
        //when
        MvcResult mvcResult = mockMvc.perform(get("/api/plant/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();

        List<Plant> plants = objectMapper.readValue(content, new TypeReference<List<Plant>>() {
        });
        //then
        assertTrue(plants.isEmpty());
    }

    @Test
    void testSearchPlantsByName() throws Exception {
        String name = "Plant";
        when(plantService.searchPlantsByName(name)).thenReturn(mockPlantResponseDTOList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/plant/name")
                        .param("name", name)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(mockPlantResponseDTOList.get(0).name()));
    }

    @Test
    void testGetPlantById() throws Exception {
        String id = "1";
        when(plantService.getPlantById(id)).thenReturn(mockPlantResponseDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/plant/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockPlantResponseDTO.id()));
    }

    @Test
    void testGetPlanByIdShouldReplyWithStatusCode400() throws Exception {
        String id = "10";
        when(plantService.getPlantById(id)).thenThrow(new EntityNotFoundException("message"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/plant/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.errorMessage").value("message"));
    }

    @Test
    void testAddPlant() throws Exception {
        when(plantService.addPlant(any(PlantCreateDTO.class))).thenReturn(mockPlantResponseDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/plant/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockPlantCreateDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(mockPlantResponseDTO.id()));
    }

}