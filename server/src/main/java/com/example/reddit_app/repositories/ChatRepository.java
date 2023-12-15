package com.example.reddit_app.repositories;

import com.example.reddit_app.entities.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
