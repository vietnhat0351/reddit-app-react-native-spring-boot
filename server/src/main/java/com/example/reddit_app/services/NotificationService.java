package com.example.reddit_app.services;

import com.example.reddit_app.entities.Notification;
import com.example.reddit_app.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository repository;

    public Notification addNotification(Notification notification) {
        return repository.save(notification);
    }
}
