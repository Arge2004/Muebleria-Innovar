package com.galeriainnovar.api.service;

import com.galeriainnovar.api.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(String id);

    List<ProductDto> getAllProducts();

    Page<ProductDto> getAllProducts(Pageable pageable);

    List<ProductDto> getAllActiveProducts();

    Page<ProductDto> getAllActiveProducts(Pageable pageable);

    List<ProductDto> getProductsByCategory(String categoryId);

    Page<ProductDto> getProductsByCategory(String categoryId, Pageable pageable);

    List<ProductDto> getActiveProductsByCategory(String categoryId);

    ProductDto updateProduct(String id, ProductDto productDto);

    void deleteProduct(String id);

    void deactivateProduct(String id);

    List<ProductDto> searchProductsByName(String name);

    List<ProductDto> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    List<ProductDto> getProductsByMaterials(List<String> materials);

    List<String> uploadProductImages(String productId, List<MultipartFile> images);
}
