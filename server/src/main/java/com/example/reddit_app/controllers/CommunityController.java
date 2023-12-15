package com.example.reddit_app.controllers;

import com.example.reddit_app.dtos.*;
import com.example.reddit_app.entities.Community;
import com.example.reddit_app.services.CommunityService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/communities")
public class CommunityController {

    @Autowired
    private CommunityService service;

//    @GetMapping
//    public ResponseEntity<List<CommunityResponseDto>> allCommunity() {
//        return ResponseEntity.ok(service.getAllCommunity());
//    }

    @PostMapping("/find")
    public ResponseEntity<Optional<Community>> getCommunityById(@RequestBody Id id) {
//        System.out.println(service.getCommunityById(id));
        return ResponseEntity.ok(service.getCommunityById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<Community> createCommunity(@RequestBody CreateCommunityRequestDto dto) {
        return new ResponseEntity<Community>(service.addCommunity(dto), HttpStatus.OK);
    }

    @PostMapping("/add-member")
    public ResponseEntity<CheckUser> addMember(@RequestBody AddUserDto dto) {
        return ResponseEntity.ok(service.addMember(dto));
    }

    @PostMapping("/remove-member")
    public ResponseEntity<CheckUser> removeMember(@RequestBody AddUserDto dto) {
        return ResponseEntity.ok(service.removeMember(dto));
    }

    @PostMapping("/user")
    public ResponseEntity<List<CommunityResponseDto>> getUserCommunities(@RequestBody Id userId) {
//        System.out.println(userId.getId());
        return new ResponseEntity<>(service.getUserCommunites(userId.getId()), HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<CommunityResponseDto>> getAllCommunitiyDto() {
//        System.out.println(userId.getId());
        return ResponseEntity.ok(service.getAllCommunity());
    }

    @PostMapping("/check-user-joined")
    public ResponseEntity<CheckUser> checkUserJoined(@RequestBody CheckUserRequest checkUserRequest) {
        return ResponseEntity.ok(service.checkUserJoined(checkUserRequest));
    }
}
