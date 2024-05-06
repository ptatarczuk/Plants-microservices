package com.x250.usersplantservice.dto;

import com.x250.usersplantservice.model.UsersPlant;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UsersPlantDTOMapper implements Function<UsersPlant, UsersPlantResponseDTO> {


    @Override
    public UsersPlantResponseDTO apply(UsersPlant usersPlant) {
        return new UsersPlantResponseDTO(
                usersPlant.getId(),
                usersPlant.getAppUser().getId(),
                usersPlant.getPlant(),
                usersPlant.getNextWatering()
        );
    }
}
