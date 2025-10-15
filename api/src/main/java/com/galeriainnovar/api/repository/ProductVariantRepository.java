package com.galeriainnovar.api.repository;

import com.galeriainnovar.api.entity.ProductVariant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends MongoRepository<ProductVariant, String> {

    List<ProductVariant> findByProductId(String productId);

    @Query("{ 'productId': ?0, 'available': true }")
    List<ProductVariant> findAvailableByProductId(String productId);

    @Query("{ 'available': true }")
    List<ProductVariant> findAllAvailable();

    boolean existsByProductIdAndName(String productId, String name);
}
