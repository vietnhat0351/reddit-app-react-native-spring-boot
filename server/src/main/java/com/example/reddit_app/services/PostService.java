package com.example.reddit_app.services;

import com.example.reddit_app.dtos.*;
import com.example.reddit_app.entities.Comment;
import com.example.reddit_app.entities.Community;
import com.example.reddit_app.entities.Post;
import com.example.reddit_app.entities.User;
import com.example.reddit_app.repositories.CommunityRepository;
import com.example.reddit_app.repositories.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository repository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Post> getAllPost() {
        Query query = new Query();

        // Sort the result by the "date" field in descending order (newest first)
        query.with(Sort.by(Sort.Order.desc("postDate")));

        // Execute the query and return the result
        return mongoTemplate.find(query, Post.class);
    }

    public Post createPost(Post post) {
        repository.insert(post);
        Query query = Query.query(Criteria.where("id").is(post.getCommunity().getId()));
        Update update = new Update().push("postList", post);
        mongoTemplate.updateFirst(query, update, Community.class);
        return post;
    }

    public List<PostCommentResponse> getAllPostInCommunity(Id communityId) {
        List<PostCommentResponse> list = new ArrayList<>();
        List<Post> postList = communityRepository.findById(new ObjectId(communityId.getId())).get().getPostList();
        for(Post post : postList) {
            list.add(new PostCommentResponse(post));
        }
        return list;
    }

    public Optional<Post> getPostById(Id postId) {
        return repository.findById(new ObjectId(postId.getId()));
    }

    public List<PostsRequestDto> getAllPostDto() {
        List<PostsRequestDto> list = new ArrayList<>();
        Query query = new Query();

        // Sort the result by the "date" field in descending order (newest first)
        query.with(Sort.by(Sort.Order.desc("postDate")));

        // Execute the query and return the result

        List<Post> postList = mongoTemplate.find(query, Post.class);
        for(Post post : postList) {
            list.add(new PostsRequestDto(post));
        }
        return  list;
    }

    public Comment createComment(CommentResquest commentResquest) {

        Comment comment = new Comment();
        comment.setContent(commentResquest.getText());
        comment.setUser(new User(commentResquest.getUserId()));

        Query query = Query.query(Criteria.where("id").is(commentResquest.getPostId()));
        Update update = new Update().push("comments", comment);
        mongoTemplate.updateFirst(query, update, Post.class);
        return comment;
    }

    public PostCommentResponse getPostCommentResponse(String postId) {
        return new PostCommentResponse(repository.findById(new ObjectId(postId)).orElseThrow());
    }
}
