package com.example.reddit_app.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TextPost extends Post{
    private String content;

    public TextPost(String id, String title, LocalDateTime postDate, User author, List<Comment> comments, List<User> likes, Community community, String content) {
        super(id, title, postDate, author, comments, likes, community);
        this.content = content;
    }
}
