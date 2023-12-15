package com.example.reddit_app.controllers;

import com.example.reddit_app.dtos.Message;
import com.example.reddit_app.entities.Chat;
import com.example.reddit_app.entities.User;
import com.example.reddit_app.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/sendToUser")
//    @SendTo("/user/user1/topic/messages")
    public void sendToUser(Message message) {
        // Send message to a specific user
        Chat chat = new Chat(new User(message.getSender()), new User(message.getReceiver()),
                message.getContent(), LocalDateTime.now());
        chatService.addChat(chat);
        System.out.println(message);
//        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        message.setCreatedAt(LocalDateTime.now());
        messagingTemplate.convertAndSendToUser(message.getReceiver(), "/topic/messages", message);
////        messagingTemplate.convertAndSendToUser(message.getFromUser(), "/topic/messages", message.getContent());
    }
}