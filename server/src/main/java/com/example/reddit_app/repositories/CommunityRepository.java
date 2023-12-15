package com.example.reddit_app.repositories;

import com.example.reddit_app.entities.Community;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends MongoRepository<Community, ObjectId> {
}
