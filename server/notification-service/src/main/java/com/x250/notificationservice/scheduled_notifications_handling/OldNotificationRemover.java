package com.x250.notificationservice.scheduled_notifications_handling;

import com.x250.notificationservice.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OldNotificationRemover {

    @Value("${notificationservice.notificationsToRemoveAge}")
    private long notificationsToRemoveAge;

    private final NotificationRepository notificationRepository;

    @Transactional
    public void remove() {
        notificationRepository
                .removeByEmailSentIsTrueOrNotificationDateBefore(LocalDateTime.now().minusHours(notificationsToRemoveAge));
    }

}