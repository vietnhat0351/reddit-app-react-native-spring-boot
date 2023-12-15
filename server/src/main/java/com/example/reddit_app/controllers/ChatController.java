package com.example.reddit_app.controllers;

import com.example.reddit_app.dtos.ChatDataRequest;
import com.example.reddit_app.dtos.Message;
import com.example.reddit_app.entities.Chat;
import com.example.reddit_app.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService service;

    @PostMapping("/get-chats-with-user")
    public ResponseEntity<List<Message>> getUserMessage(@RequestBody ChatDataRequest dataRequest) {
        List<Chat> list = service.getUserChat(dataRequest.getSender(), dataRequest.getReceiver());
        List<Message> messageList = new ArrayList<>();
        list.forEach(chat -> {
            messageList.add(new Message(chat.getId(), chat.getSender().getId(), chat.getReceiver().getId()
            , chat.getContent(), chat.getDate()));
        });
        return ResponseEntity.ok(messageList);
    }

}
