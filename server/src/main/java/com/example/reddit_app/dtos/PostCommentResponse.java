package com.example.reddit_app.dtos;

import com.example.reddit_app.entities.Comment;
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
public class PostCommentResponse {
    private Post post;
    private List<String> likes;
    private String authorId;
    private String authorName;
    private String authorAvatarUrl;
    private String communityId;
    private String communityImgUrl;
    private String communityName;
    private List<CommentResponse> Comments;

    public PostCommentResponse(Post post) {
        this.post = post;
        List<String> likes = new ArrayList<>();
        for(User user: post.getLikes()) {
            likes.add(user.getId());
        }
        List<CommentResponse> list = new ArrayList<>();
        for(Comment comments : post.getComments()) {
            list.add(new CommentResponse(
                    comments.getContent(),
                    comments.getUser().getUsername(),
                    comments.getUser().getAvatarUrl(),
                    comments.getUser().getUsername()));
        }
        this.likes = likes;
        this.authorId = post.getAuthor().getId();
        this.communityId = post.getCommunity().getId();
        this.communityImgUrl = post.getCommunity().getImageUrl();
        this.communityName = post.getCommunity().getName();
        this.authorName = post.getAuthor().getUsername();
        this.Comments = list;
        this.authorAvatarUrl = post.getAuthor().getAvatarUrl();
    }
}
