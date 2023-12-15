package com.example.reddit_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckUserRequest {
    private String userId;
    private String communityId;
}
