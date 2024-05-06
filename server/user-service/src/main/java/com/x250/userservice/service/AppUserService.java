package com.x250.userservice.service;

import com.x250.userservice.dto.AppUserCreateDTO;
import com.x250.userservice.dto.AppUserDTOMapper;
import com.x250.userservice.dto.AppUserResponseDTO;
import com.x250.userservice.exception.EntityNotFoundException;
import com.x250.userservice.model.AppUser;
import com.x250.userservice.repository.AppUserRepository;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final AppUserDTOMapper appUserDTOMapper;
    private final WebClient.Builder webClientBuilder;
    private final ObservationRegistry observationRegistry;

    public List<AppUserResponseDTO> getAllUsers() {

        return appUserRepository.findAll().stream()
                .map(appUserDTOMapper)
                .toList();
    }

    public AppUserResponseDTO addUser(AppUserCreateDTO appUserCreateDTO) {
        AppUser appUser = mapToAppUser(appUserCreateDTO);

        return appUserDTOMapper.apply(appUserRepository.save(appUser));
    }

    public String deleteUser(String id) {

        Observation inventoryServiceObservation = Observation.createNotStarted("users-plant-service-lookup",
                this.observationRegistry);
        inventoryServiceObservation.lowCardinalityKeyValue("call", "users-plant-service");
        return inventoryServiceObservation.observe(() -> {

            boolean successfullyDeletedUsersPlants = deleteAllUsersPlants(id);

            if (successfullyDeletedUsersPlants) {
                AppUser appUser = appUserRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("User " + id + " not found in database"));

                appUserRepository.delete(appUser);
                return "User deleted successfully";
            }

            return "User " + id + " not found";

        });

    }

    private boolean deleteAllUsersPlants(String userId) {
        final String baseUrl = "http://users-plant-service/api/users_plant/user/";
        final String url = baseUrl + userId;

        return Boolean.TRUE.equals(deleteUsersPlants(url).block());
    }

    public Mono<Boolean> deleteUsersPlants(String url) {
        return webClientBuilder.build().delete()
                .uri(url)
//                .headers(headers -> headers.setBearerAuth(jwtToken))
                .retrieve()
                .bodyToMono(Boolean.class);
    }

    private static AppUser mapToAppUser(AppUserCreateDTO appUserCreateDTO) {
        return AppUser.builder()
                .username(appUserCreateDTO.userName())
                .email(appUserCreateDTO.email())
                .password(appUserCreateDTO.password())
                .role(appUserCreateDTO.role())
                .build();
    }

    public AppUserResponseDTO getUserById(String id) throws EntityNotFoundException {
        return appUserDTOMapper.apply(appUserRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found in DB")));
    }
}
