package com.x250.usersplantservice.service;

import com.x250.usersplantservice.dto.UsersPlantCreateDTO;
import com.x250.usersplantservice.dto.UsersPlantDTOMapper;
import com.x250.usersplantservice.dto.UsersPlantResponseDTO;
import com.x250.usersplantservice.exception.EntityNotFoundException;
import com.x250.usersplantservice.model.AppUser;
import com.x250.usersplantservice.model.Plant;
import com.x250.usersplantservice.model.UsersPlant;
import com.x250.usersplantservice.repository.AppUserRepository;
import com.x250.usersplantservice.repository.PlantRepository;
import com.x250.usersplantservice.repository.UsersPlantRepository;
import com.x250.usersplantservice.utils.ObjectProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsersPlantService {

    private final UsersPlantRepository usersPlantRepository;
    private final AppUserRepository appUserRepository;
    private final PlantRepository plantRepository;
    private final UsersPlantDTOMapper usersPlantDTOMapper;

    public UsersPlantResponseDTO addUsersPlant(UsersPlantCreateDTO usersPlantCreateDTO) throws EntityNotFoundException {

        AppUser appUser = ObjectProvider.getObjectFromDB(usersPlantCreateDTO.appUserId(), appUserRepository);
        Plant plant = ObjectProvider.getObjectFromDB(usersPlantCreateDTO.plantId(), plantRepository);

        UsersPlant usersPlant = UsersPlant.builder()
                .appUser(appUser)
                .plant(plant)
                .nextWatering(LocalDateTime.now().plusDays(plant.getWateringInterval()))
                .notificationDate(LocalDateTime.now().plusDays(plant.getWateringInterval())) // added notifications date
                .build();

        return usersPlantDTOMapper.apply(usersPlantRepository.save(usersPlant));
    }

    public void deleteUsersPlant(Long id) throws EntityNotFoundException {
        UsersPlant usersPlant = ObjectProvider.getObjectFromDB(id, usersPlantRepository);

        usersPlantRepository.delete(usersPlant);
    }

    public void deleteAllUsersPlant(String id) throws InterruptedException {
//        log.info("Wait Started");
//        Thread.sleep(10000);
//        log.info("Wait Ended");

        List<UsersPlant> usersPlantList = usersPlantRepository.findByAppUserId(id);

        usersPlantRepository.deleteAllInBatch(usersPlantList);
    }

    public UsersPlantResponseDTO updateNextWatering(Long id) throws EntityNotFoundException {
        UsersPlant usersPlant = ObjectProvider.getObjectFromDB(id, usersPlantRepository);

        Plant plant = ObjectProvider.getObjectFromDB(usersPlant.getPlant().getId(), plantRepository);

        usersPlant.setNextWatering(LocalDateTime.now().plusDays(plant.getWateringInterval()));
        usersPlant.setNotificationDate(LocalDateTime.now().plusDays(plant.getWateringInterval()));

        return usersPlantDTOMapper.apply(usersPlantRepository.save(usersPlant));
    }


    public List<UsersPlantResponseDTO> getUsersPlants(String userId) {

        List<UsersPlant> usersPlants = usersPlantRepository.findByAppUserId(userId);

        return usersPlants.stream()
                .map(usersPlantDTOMapper)
                .toList();
    }
}
