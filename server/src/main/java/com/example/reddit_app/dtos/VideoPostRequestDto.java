package com.example.reddit_app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoPostRequestDto {
    private Id userId;
    private Id CommunityId;
    private String title;
    private String videoUrl;
}
