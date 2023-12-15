package com.example.reddit_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TextPostRequestDto {
    private Id userId;
    private Id CommunityId;
    private String content;
    private String title;
}
