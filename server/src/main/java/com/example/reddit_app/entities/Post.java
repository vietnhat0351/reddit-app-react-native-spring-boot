package com.example.reddit_app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String title;
    private LocalDateTime postDate;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private User author;
    private List<Comment> comments;
    @DocumentReference
    @JsonIgnore
    private List<User> likes;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private Community community;

    public Post(String title, LocalDateTime postDate, User author, List<Comment> comments, Community community) {
        this.title = title;
        this.postDate = postDate;
        this.author = author;
        this.comments = comments;
        this.community = community;
    }

    public Post(String id) {
        this.id = id;
    }
}
