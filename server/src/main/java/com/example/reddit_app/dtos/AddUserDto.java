package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.Community;
import com.example.reddit_app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddUserDto {
    private String communityId;
    private String userId;
}
