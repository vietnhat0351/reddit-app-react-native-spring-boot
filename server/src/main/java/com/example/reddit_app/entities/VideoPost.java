package com.example.reddit_app.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoPost extends Post{
    private String videoUrl;

    public VideoPost(String id, String title, LocalDateTime postDate, User author, List<Comment> comments, List<User> likes, Community community, String videoUrl) {
        super(id, title, postDate, author, comments, likes, community);
        this.videoUrl = videoUrl;
    }
}
