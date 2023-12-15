package com.example.reddit_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommunityRequestDto {
    private String userId;
    private String name;
    private String description;
}
