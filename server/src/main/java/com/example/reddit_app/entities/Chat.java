package com.example.reddit_app.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chats")
public class Chat {
    @Id
    private String id;
    @DocumentReference
    private User sender;
    @DocumentReference
    private User receiver;
    private String content;
    private LocalDateTime date;

    public Chat(User sender, User receiver, String content, LocalDateTime date) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.date = date;
    }
}
