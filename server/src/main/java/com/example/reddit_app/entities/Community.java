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
@AllArgsConstructor
@NoArgsConstructor
@Document("communities")
public class Community {
    @Id
    private String id;
    private String name;
    private String description;
    private String imageUrl;

    @DocumentReference(lazy = true)
    private List<Post> postList;

    @DocumentReference(lazy = true)
    private List<User> memberList;

    public Community(String name, String description, String imageUrl, List<Post> postList, List<User> memberList) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.postList = postList;
        this.memberList = memberList;
    }

    public Community(String id) {
        this.id = id;
    }
}
