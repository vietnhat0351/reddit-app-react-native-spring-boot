package com.example.reddit_app.controllers;

import com.example.reddit_app.dtos.UserLoginRequestDto;
import com.example.reddit_app.entities.User;
import com.example.reddit_app.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final String avatarUrl = "https://firebasestorage.googleapis.com/v0/b/marine-lodge-308314.appspot.com/o/images%2Favatar.png?alt=media&token=72bb1332-e0ad-49d9-81c4-2df087b61e17&_gl=1*1jobxcg*_ga*NDYxNzYzOS4xNjk4OTg3NzY0*_ga_CW55HF8NVT*MTY5OTM2NTQwOS42LjEuMTY5OTM2NTU4My4xNy4wLjA.";

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<List<User>> allUser() {
        return new ResponseEntity<List<User>>(service.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@RequestParam ObjectId id) {
        return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<User> getUser(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        User user = service.findUserByEmailAndPassword(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());
        System.out.println(user.getId());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setId(new ObjectId().toHexString());
        System.out.println(user.getId());
        user.setAvatarUrl(avatarUrl);
        user.setJoinedCommunity(new ArrayList<>());
        return new ResponseEntity<>(service.addUser(user), HttpStatus.OK);
    }
}
