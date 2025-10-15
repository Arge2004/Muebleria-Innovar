package com.galeriainnovar.api.service.impl;

import com.galeriainnovar.api.dto.ProductDto;
import com.galeriainnovar.api.entity.Product;
import com.galeriainnovar.api.mapper.ProductMapper;
import com.galeriainnovar.api.repository.ProductRepository;
import com.galeriainnovar.api.repository.CategoryRepository;
import com.galeriainnovar.api.service.ProductService;
import com.galeriainnovar.api.service.FirebaseStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final FirebaseStorageService firebaseStorageService;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        log.info("Creando nuevo producto: {}", productDto.getName());

        if (productRepository.existsByName(productDto.getName())) {
            throw new RuntimeException("Ya existe un producto con el nombre: " + productDto.getName());
        }

        if (!categoryRepository.existsById(productDto.getCategoryId())) {
            throw new RuntimeException("Categoría no encontrada con ID: " + productDto.getCategoryId());
        }

        Product product = productMapper.toEntity(productDto);
        Product savedProduct = productRepository.save(product);

        log.info("Producto creado exitosamente con ID: {}", savedProduct.getId());
        return productMapper.toDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(String id) {
        log.info("Buscando producto con ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        return productMapper.toDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        log.info("Obteniendo todos los productos");

        List<Product> products = productRepository.findAll();
        return productMapper.toDtoList(products);
    }

    @Override
    public Page<ProductDto> getAllProducts(Pageable pageable) {
        log.info("Obteniendo todos los productos con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Product> productsPage = productRepository.findAll(pageable);
        return productsPage.map(productMapper::toDto);
    }

    @Override
    public List<ProductDto> getAllActiveProducts() {
        log.info("Obteniendo todos los productos activos");

        List<Product> products = productRepository.findAllActive();
        return productMapper.toDtoList(products);
    }

    @Override
    public Page<ProductDto> getAllActiveProducts(Pageable pageable) {
        log.info("Obteniendo todos los productos activos con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Product> productsPage = productRepository.findAllActivePageable(pageable);
        return productsPage.map(productMapper::toDto);
    }

    @Override
    public List<ProductDto> getProductsByCategory(String categoryId) {
        log.info("Obteniendo productos por categoría: {}", categoryId);

        List<Product> products = productRepository.findByCategoryId(categoryId);
        return productMapper.toDtoList(products);
    }

    @Override
    public Page<ProductDto> getProductsByCategory(String categoryId, Pageable pageable) {
        log.info("Obteniendo productos por categoría con paginación: {}, página: {}, tamaño: {}",
                categoryId, pageable.getPageNumber(), pageable.getPageSize());

        Page<Product> productsPage = productRepository.findByCategoryIdPageable(categoryId, pageable);
        return productsPage.map(productMapper::toDto);
    }

    @Override
    public List<ProductDto> getActiveProductsByCategory(String categoryId) {
        log.info("Obteniendo productos activos por categoría: {}", categoryId);

        List<Product> products = productRepository.findActiveByCategoryId(categoryId);
        return productMapper.toDtoList(products);
    }

    @Override
    public ProductDto updateProduct(String id, ProductDto productDto) {
        log.info("Actualizando producto con ID: {}", id);

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        if (!existingProduct.getName().equals(productDto.getName()) &&
            productRepository.existsByName(productDto.getName())) {
            throw new RuntimeException("Ya existe un producto con el nombre: " + productDto.getName());
        }

        if (!categoryRepository.existsById(productDto.getCategoryId())) {
            throw new RuntimeException("Categoría no encontrada con ID: " + productDto.getCategoryId());
        }

        productMapper.updateEntityFromDto(productDto, existingProduct);
        Product updatedProduct = productRepository.save(existingProduct);

        log.info("Producto actualizado exitosamente");
        return productMapper.toDto(updatedProduct);
    }

    @Override
    public void deleteProduct(String id) {
        log.info("Eliminando producto con ID: {}", id);

        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }

        productRepository.deleteById(id);
        log.info("Producto eliminado exitosamente");
    }

    @Override
    public void deactivateProduct(String id) {
        log.info("Desactivando producto con ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        product.setActive(false);
        productRepository.save(product);

        log.info("Producto desactivado exitosamente");
    }

    @Override
    public List<ProductDto> searchProductsByName(String name) {
        log.info("Buscando productos que contengan: {}", name);

        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return productMapper.toDtoList(products);
    }

    @Override
    public List<ProductDto> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        log.info("Buscando productos en rango de precio: {} - {}", minPrice, maxPrice);

        List<Product> products = productRepository.findByPriceRange(minPrice, maxPrice);
        return productMapper.toDtoList(products);
    }

    @Override
    public List<ProductDto> getProductsByMaterials(List<String> materials) {
        log.info("Buscando productos con materiales: {}", materials);

        List<Product> products = productRepository.findByMaterials(materials);
        return productMapper.toDtoList(products);
    }

    @Override
    public List<String> uploadProductImages(String productId, List<MultipartFile> images) {
        log.info("Subiendo {} imágenes para producto con ID: {}", images.size(), productId);

        // Verificar que el producto existe
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productId));

        // Subir imágenes a Firebase Storage
        List<String> imageUrls = firebaseStorageService.uploadImages(images, "products", "product_" + productId);

        log.info("Imágenes subidas exitosamente para producto: {}", productId);
        return imageUrls;
    }
}
