package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message {
//    private LocalDateTime createdAt;
    private String id;
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime createdAt;
}
