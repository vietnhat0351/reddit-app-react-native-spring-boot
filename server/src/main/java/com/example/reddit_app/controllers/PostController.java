package com.example.reddit_app.controllers;

import com.example.reddit_app.dtos.*;
import com.example.reddit_app.entities.*;
import com.example.reddit_app.services.PostService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService service;

    @GetMapping("/all")
    public ResponseEntity<List<Post>> allPost() {
        return new ResponseEntity<List<Post>>(service.getAllPost(), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<PostsRequestDto>> getAllPostDto() {
        return new ResponseEntity<>(service.getAllPostDto(), HttpStatus.OK);
    }

    @PostMapping("/community")
    private ResponseEntity<List<PostCommentResponse>> getAllPostInCommunity(@RequestBody Id communityId) {
        return ResponseEntity.ok(service.getAllPostInCommunity(communityId));
    }

//    @GetMapping("/id")
//    public ResponseEntity<Optional<Post>> getPostById(@RequestParam("id")ObjectId id) {
//        return new ResponseEntity<Optional<Post>>(service.getPostById(id), HttpStatus.OK);
//    }

    @PostMapping("/create/text-post")
    public ResponseEntity<Post> createPost(@RequestBody TextPostRequestDto dto) {
        System.out.println(dto);
        TextPost textPost = new TextPost();
        textPost.setContent(dto.getContent());
        textPost.setPostDate(LocalDateTime.now());
        textPost.setAuthor(new User(dto.getUserId().getId()));
        textPost.setTitle(dto.getTitle());
        textPost.setComments(new ArrayList<>());
        textPost.setLikes(new ArrayList<>());
        textPost.setCommunity(new Community(dto.getCommunityId().getId()));
        textPost.setId(new ObjectId().toHexString());
        return new ResponseEntity<Post>(service.createPost(textPost), HttpStatus.OK);
    }

    @PostMapping("/create/image-post")
    public ResponseEntity<Post> createPost(@RequestBody ImagePostRequestDto dto) {
        ImagePost imagePost = new ImagePost();
        imagePost.setPostDate(LocalDateTime.now());
        imagePost.setId(new ObjectId().toHexString());
        imagePost.setCommunity(new Community(dto.getCommunityId().getId()));
        imagePost.setAuthor(new User(dto.getUserId().getId()));
        imagePost.setComments(new ArrayList<>());
        imagePost.setLikes(new ArrayList<>());
        imagePost.setTitle(dto.getTitle());
        imagePost.setImgUrl(dto.getImageUrl());
        return new ResponseEntity<Post>(service.createPost(imagePost), HttpStatus.OK);
    }

    @PostMapping("/create/video-post")
    public ResponseEntity<Post> createPost(@RequestBody VideoPostRequestDto dto) {
        VideoPost videoPost = new VideoPost();
        videoPost.setPostDate(LocalDateTime.now());
        videoPost.setId(new ObjectId().toHexString());
        videoPost.setCommunity(new Community(dto.getCommunityId().getId()));
        videoPost.setAuthor(new User(dto.getUserId().getId()));
        videoPost.setComments(new ArrayList<>());
        videoPost.setLikes(new ArrayList<>());
        videoPost.setTitle(dto.getTitle());
        videoPost.setVideoUrl(dto.getVideoUrl());
        return new ResponseEntity<Post>(service.createPost(videoPost), HttpStatus.OK);
    }

        @PostMapping("/comments")
    public List<CommentResponse> getPostCommentList(@RequestBody Id postID) {
        List<CommentResponse> commentResponses = new ArrayList<>();
        List<Comment> commentList = service.getPostById(postID).get().getComments();
        for (Comment comment : commentList) {
            CommentResponse commentResponse = new CommentResponse();
            commentResponse.setText(comment.getContent());
            commentResponse.setUserId(comment.getUser().getId());
            commentResponses.add(commentResponse);
        }
        return commentResponses;
    }

        @PostMapping("/comments/add")
    public ResponseEntity<Comment> addComment(@RequestBody CommentResquest commentResquest) {
            return ResponseEntity.ok(service.createComment(commentResquest));
        }

        @PostMapping("/post-comments")
    public ResponseEntity<PostCommentResponse> getPostComments(@RequestBody Id id) {
            return ResponseEntity.ok(service.getPostCommentResponse(id.getId()));
        }
}
