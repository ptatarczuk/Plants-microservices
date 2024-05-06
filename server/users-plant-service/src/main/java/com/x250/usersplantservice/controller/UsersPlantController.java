package com.x250.usersplantservice.controller;

import com.x250.usersplantservice.dto.UsersPlantCreateDTO;
import com.x250.usersplantservice.dto.UsersPlantResponseDTO;
import com.x250.usersplantservice.exception.EntityNotFoundException;
import com.x250.usersplantservice.service.UsersPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users_plant")
@RequiredArgsConstructor
public class UsersPlantController {

    private final UsersPlantService usersPlantService;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public UsersPlantResponseDTO addUsersPlant(@RequestBody UsersPlantCreateDTO usersPlantCreateDTO) throws EntityNotFoundException {
        return usersPlantService.addUsersPlant(usersPlantCreateDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUsersPlant(
            @PathVariable Long id
    ) throws EntityNotFoundException {
        usersPlantService.deleteUsersPlant(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
        public List<UsersPlantResponseDTO> getUsersPlants(
                @PathVariable String id) {
        return usersPlantService.getUsersPlants(id);
    }

    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean deleteAllUsersPlants(
            @PathVariable String id
    ) throws InterruptedException {
        usersPlantService.deleteAllUsersPlant(id);
        return true;
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsersPlantResponseDTO updateNextWatering(@PathVariable Long id) throws EntityNotFoundException {
        return usersPlantService.updateNextWatering(id);
    }

}
