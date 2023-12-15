package com.example.reddit_app.services;

import com.example.reddit_app.dtos.*;
import com.example.reddit_app.entities.Community;
import com.example.reddit_app.entities.Post;
import com.example.reddit_app.entities.User;
import com.example.reddit_app.repositories.CommunityRepository;
import com.example.reddit_app.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {

    private String defaultCommunityImageUrl = "https://firebasestorage.googleapis.com/v0/b/marine-lodge-308314.appspot.com/o/images%2Freddit-logo.png?alt=media&token=6477be27-5745-4d2f-ad27-d639eaac56b5";

    @Autowired
    private CommunityRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MongoTemplate mongoTemplate;

//    public List<Community> getAllCommunity() {
//        return repository.findAll();
//    }

    public Optional<Community> getCommunityById(Id communityId) {
//        Query query = new Query(Criteria.where("id").is((id)));
//        System.out.println(mongoTemplate.findOne(query, Community.class));
        return repository.findById(new ObjectId(communityId.getId()));
    }

    public CheckUser addMember(AddUserDto dto) {
        Query query = new Query(Criteria.where("id").is(dto.getCommunityId()));
        Update update = new Update().addToSet("memberList", new ObjectId(dto.getUserId()));
        mongoTemplate.upsert(query, update, Community.class);

        query = new Query(Criteria.where("id").is(dto.getUserId()));
        update = new Update().addToSet("joinedCommunity", new ObjectId(dto.getCommunityId()));
        mongoTemplate.upsert(query, update, User.class);

        return new CheckUser(true);
    }

    public CheckUser removeMember(AddUserDto dto) {
        Query query = new Query(Criteria.where("id").is(dto.getCommunityId()));
        Update update = new Update().pull("memberList", new ObjectId(dto.getUserId()));
        mongoTemplate.upsert(query, update, Community.class);

        query = new Query(Criteria.where("id").is(dto.getUserId()));
        update = new Update().pull("joinedCommunity", new ObjectId(dto.getCommunityId()));
        mongoTemplate.upsert(query, update, User.class);

        return new CheckUser(false);
    }

    public Community addCommunity(CreateCommunityRequestDto dto) {
        User user = new User(dto.getUserId());
//        System.out.println(dto.getUserId());
        List<User> userList = new ArrayList<>();
        userList.add(user);
        Community community = new Community(new ObjectId().toHexString(),
                dto.getName(), dto.getDescription(), defaultCommunityImageUrl,
                new ArrayList<Post>(), userList
                );
        Query query = new Query(Criteria.where("id").is(dto.getUserId()));
        Update update = new Update().addToSet("joinedCommunity", community);
        mongoTemplate.upsert(query, update, User.class);
        return repository.insert(community);
    }

    public List<CommunityResponseDto> getUserCommunites(String userId) {
        Optional<User> user = userRepository.findById(new ObjectId(userId));
        List<CommunityResponseDto> communityDtoList = new ArrayList<>();
        for (Community community : user.get().getJoinedCommunity()) {
            CommunityResponseDto dto = new CommunityResponseDto(community.getId(), community.getName(), community.getImageUrl());
            communityDtoList.add(dto);
        }
        return communityDtoList;
    }

    public List<CommunityResponseDto> getAllCommunity() {
        List<CommunityResponseDto> communityDtoList = new ArrayList<>();
        List<Community> communities = repository.findAll();
        for(Community community : communities) {
            CommunityResponseDto dto = new CommunityResponseDto(community.getId(), community.getName(), community.getImageUrl());
            communityDtoList.add(dto);
        }
        return communityDtoList;
    }

    public CheckUser checkUserJoined(CheckUserRequest checkUserRequest) {
        Community community = repository.findById((new ObjectId(checkUserRequest.getCommunityId()))).orElseThrow();
        for (User u : community.getMemberList()) {
            if(u.getId().equals(checkUserRequest.getUserId()))
                return new CheckUser(true);
        }
        return new CheckUser(false);
    }
}
