package com.example.reddit_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunityResponseDto {
    private String id;
    private String name;
    private String imageUrl;
}
