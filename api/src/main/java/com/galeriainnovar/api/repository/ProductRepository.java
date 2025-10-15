package com.galeriainnovar.api.repository;

import com.galeriainnovar.api.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategoryId(String categoryId);

    @Query("{ 'categoryId': ?0 }")
    Page<Product> findByCategoryIdPageable(String categoryId, Pageable pageable);

    @Query("{ 'active': true }")
    List<Product> findAllActive();

    @Query("{ 'active': true }")
    Page<Product> findAllActivePageable(Pageable pageable);

    @Query("{ 'categoryId': ?0, 'active': true }")
    List<Product> findActiveByCategoryId(String categoryId);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Product> findByNameContainingIgnoreCase(String name);

    @Query("{ 'basePrice': { $gte: ?0, $lte: ?1 }, 'active': true }")
    List<Product> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("{ 'materials': { $in: ?0 }, 'active': true }")
    List<Product> findByMaterials(List<String> materials);

    boolean existsByName(String name);
}
