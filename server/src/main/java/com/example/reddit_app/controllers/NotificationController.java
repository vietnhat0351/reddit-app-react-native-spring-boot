package com.example.reddit_app.controllers;

import com.example.reddit_app.entities.Notification;
import com.example.reddit_app.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService service;
}
