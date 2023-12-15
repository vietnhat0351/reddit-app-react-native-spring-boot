package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.Post;
import com.example.reddit_app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentDto {
    private String text;
    private ObjectId postId;
    private ObjectId userId;
}
