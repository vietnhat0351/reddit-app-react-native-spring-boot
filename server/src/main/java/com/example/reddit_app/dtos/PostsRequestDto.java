package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.Post;
import com.example.reddit_app.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostsRequestDto {
    private Post post;
    private List<String> likes;
    private String authorId;
    private String communityId;
    private String communityImgUrl;
    private String communityName;

    public PostsRequestDto(Post post) {
        this.post = post;
        List<String> likes = new ArrayList<>();
        for(User user: post.getLikes()) {
            likes.add(user.getId());
        }
        this.likes = likes;
        this.authorId = post.getAuthor().getId();
        this.communityId = post.getCommunity().getId();
        this.communityImgUrl = post.getCommunity().getImageUrl();
        this.communityName = post.getCommunity().getName();
    }
}
