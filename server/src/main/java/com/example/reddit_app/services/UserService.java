package com.example.reddit_app.services;

import com.example.reddit_app.entities.User;
import com.example.reddit_app.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<User> getAllUser() {
        return repository.findAll();
    }

    public User addUser(User user) {
        return repository.insert(user);
    }

    public Optional<User> getUserById(ObjectId id) {
        return repository.findById(id);
    }

    public User findUserByEmailAndPassword(String email, String password) {
        Query query = new Query(Criteria.where("email").is(email).and("password").is(password));
        return mongoTemplate.findOne(query, User.class);
    }
}
