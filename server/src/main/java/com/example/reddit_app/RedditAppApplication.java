package com.example.reddit_app;

import com.example.reddit_app.entities.*;
import com.example.reddit_app.services.ChatService;
import com.example.reddit_app.services.CommunityService;
import com.example.reddit_app.services.PostService;
import com.example.reddit_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.TreeSet;

@SpringBootApplication
//@CrossOrigin(origins = "http://localhost:8081")
public class RedditAppApplication {

    @Autowired
    private ChatService chatService;

    public static void main(String[] args) {
        SpringApplication.run(RedditAppApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(UserService service, CommunityService communityService, PostService postService, UserService userService) {
        return args -> {
//            System.out.println(chatService.findChattingPartners("6566066f2511bf6f6437d0a4"));
        };
    }
}
