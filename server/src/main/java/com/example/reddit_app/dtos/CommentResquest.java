package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResquest {
    private String userId;
    private String text;
    private String postId;
}
