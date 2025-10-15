package com.galeriainnovar.api.repository;

import com.galeriainnovar.api.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends MongoRepository<Material, String> {

    Optional<Material> findByName(String name);

    List<Material> findByType(String type);

    @Query("{ 'active': true }")
    List<Material> findAllActive();

    @Query("{ 'active': true }")
    Page<Material> findAllActivePageable(Pageable pageable);

    @Query("{ 'type': ?0, 'active': true }")
    List<Material> findActiveByType(String type);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Material> findByNameContainingIgnoreCase(String name);

    boolean existsByName(String name);
}
