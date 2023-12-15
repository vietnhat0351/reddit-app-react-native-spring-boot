package com.example.reddit_app.services;

import com.example.reddit_app.entities.Chat;
import com.example.reddit_app.repositories.ChatRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ChatService {

    @Autowired
    private ChatRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Chat> getUserChat(String userId, String receiverId) {
        Query query = new Query(Criteria.where("sender").is(new ObjectId(userId)).and("receiver").is(new ObjectId(receiverId)));
        Query query2 = new Query(Criteria.where("sender").is(new ObjectId(receiverId)).and("receiver").is(new ObjectId(userId)));
        List<Chat> list = Stream.concat(mongoTemplate.find(query, Chat.class).stream(),
                mongoTemplate.find(query2, Chat.class).stream()).toList();
        return list;
    }

    public Chat addChat(Chat chat) {
        return repository.save(chat);
    }

    public List<Chat> findChattingPartners(String userId) {
        Criteria senderCriteria = Criteria.where("sender").is(new ObjectId(userId));
        Criteria receiverCriteria = Criteria.where("receiver").is(new ObjectId(userId));

        Criteria orCriteria = new Criteria().orOperator(senderCriteria, receiverCriteria);

        // Thực hiện truy vấn
        Query query = new Query(orCriteria);

        return mongoTemplate.findDistinct(query, "receiver", "chats", Chat.class);
    }

}
