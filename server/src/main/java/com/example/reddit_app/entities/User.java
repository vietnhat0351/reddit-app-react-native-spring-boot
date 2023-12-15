package com.example.reddit_app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String avatarUrl;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private List<Community> joinedCommunity;

    public User(String username, String email, String password, String avatarUrl, List<Community> joinedCommunity) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
        this.joinedCommunity = joinedCommunity;
    }

    public User(String id) {
        this.id = id;
    }
}
