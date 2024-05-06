package com.x250.notificationservice.scheduled_notifications_handling;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledNotificationManager {

    private final EmailNotificationSender emailNotificationSender;
    private final OldNotificationRemover oldNotificationRemover;

    @Scheduled(fixedDelay = 60000) // every hour
    public void sendByEmailAndRemoveOld() {
        emailNotificationSender.send();
        oldNotificationRemover.remove();
    }

}
