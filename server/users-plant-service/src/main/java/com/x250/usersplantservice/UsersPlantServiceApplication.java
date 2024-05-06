package com.x250.usersplantservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UsersPlantServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UsersPlantServiceApplication.class, args);
    }

}
