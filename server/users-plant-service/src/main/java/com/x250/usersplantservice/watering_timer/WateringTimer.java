package com.x250.usersplantservice.watering_timer;

import com.x250.usersplantservice.event.PlantWateringEvent;
import com.x250.usersplantservice.model.UsersPlant;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.errors.TimeoutException;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@EnableKafka
public class WateringTimer {

    private final WateringChecker wateringChecker;

    private final KafkaTemplate<String, PlantWateringEvent> kafkaTemplate;

    @Scheduled(fixedDelay = 10000) // 1000 milliseconds (1 second)
    public void notifyAboutPlantsToWater() {
        LocalDateTime currentTime = LocalDateTime.now();

        List<UsersPlant> plantsToWater = wateringChecker.findPlantsToWater(currentTime);

        plantsToWater.forEach(usersPlant -> {
            PlantWateringEvent plantWateringEvent = new PlantWateringEvent(
                    usersPlant.getId(),
                    usersPlant.getPlant().getName(),
                    LocalDateTime.now(),
                    usersPlant.getAppUser().getId(),
                    usersPlant.getAppUser().getEmail()
            );

            try {
                kafkaTemplate.send("notificationTopic", plantWateringEvent).get(100, TimeUnit.MILLISECONDS);
                System.out.println("!!!!!!!!!!!!!!!!!!!!---------Notification sent to Kafka----------!!!!!!!!!!!!!!!!!!!!!!!!!");
                wateringChecker.moveNextWateringOneDayAhead(usersPlant);
            } catch (ExecutionException e) {
                System.out.println("Kafka send message failure 1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                throw new RuntimeException("Kafka failure 1 !!!!!!!!!!!!!!!!");
            } catch (TimeoutException e) {
                System.out.println("Kafka send message failure 2 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                throw new RuntimeException("Kafka failure 2 !!!!!!!!!!!!!!!!");
            } catch (InterruptedException e) {
                System.out.println("Kafka send message failure 3 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                throw new RuntimeException("Kafka failure 3 !!!!!!!!!!!!!!!!");
            } catch (java.util.concurrent.TimeoutException e) {
                System.out.println("Kafka send message failure 4 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                throw new RuntimeException("Kafka failure 4 !!!!!!!!!!!!!!!!");

            }
        });

    }

}
