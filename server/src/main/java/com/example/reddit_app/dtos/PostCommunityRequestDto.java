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
public class PostCommunityRequestDto {
    private Post post;
    private String authorId;
    private String authorName;
    private String authorAvatarUrl;
    private List<String> likes;

    public PostCommunityRequestDto(Post post) {
        this.post = post;
        List<String> likes = new ArrayList<>();
        for(User user: post.getLikes()) {
            likes.add(user.getId());
        }
        this.likes = likes;
        this.authorId = post.getAuthor().getId();
        this.authorName = post.getAuthor().getUsername();
        this.authorAvatarUrl = post.getAuthor().getAvatarUrl();
    }

}
