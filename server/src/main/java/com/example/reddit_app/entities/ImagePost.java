package com.example.reddit_app.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagePost extends Post{
    private String imgUrl;

    public ImagePost(String id, String title, LocalDateTime postDate, User author, List<Comment> comments, List<User> likes, Community community, String imgUrl) {
        super(id, title, postDate, author, comments, likes, community);
        this.imgUrl = imgUrl;
    }
}
