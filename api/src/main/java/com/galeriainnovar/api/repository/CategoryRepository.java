package com.galeriainnovar.api.repository;

import com.galeriainnovar.api.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    Optional<Category> findByName(String name);

    @Query("{ 'active': true }")
    List<Category> findAllActive();

    @Query("{ 'active': true }")
    Page<Category> findAllActivePageable(Pageable pageable);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Category> findByNameContainingIgnoreCase(String name);

    boolean existsByName(String name);
}
