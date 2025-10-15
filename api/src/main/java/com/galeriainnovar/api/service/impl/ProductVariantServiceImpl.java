package com.galeriainnovar.api.service.impl;

import com.galeriainnovar.api.dto.ProductVariantDto;
import com.galeriainnovar.api.entity.ProductVariant;
import com.galeriainnovar.api.mapper.ProductVariantMapper;
import com.galeriainnovar.api.repository.ProductVariantRepository;
import com.galeriainnovar.api.repository.ProductRepository;
import com.galeriainnovar.api.service.ProductVariantService;
import com.galeriainnovar.api.service.FirebaseStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ProductRepository productRepository;
    private final ProductVariantMapper productVariantMapper;
    private final FirebaseStorageService firebaseStorageService;

    @Override
    public ProductVariantDto createProductVariant(ProductVariantDto productVariantDto) {
        log.info("Creando nueva variante de producto: {}", productVariantDto.getName());

        if (!productRepository.existsById(productVariantDto.getProductId())) {
            throw new RuntimeException("Producto no encontrado con ID: " + productVariantDto.getProductId());
        }

        if (productVariantRepository.existsByProductIdAndName(productVariantDto.getProductId(), productVariantDto.getName())) {
            throw new RuntimeException("Ya existe una variante con el nombre: " + productVariantDto.getName() + " para este producto");
        }

        ProductVariant productVariant = productVariantMapper.toEntity(productVariantDto);
        ProductVariant savedProductVariant = productVariantRepository.save(productVariant);

        log.info("Variante de producto creada exitosamente con ID: {}", savedProductVariant.getId());
        return productVariantMapper.toDto(savedProductVariant);
    }

    @Override
    public ProductVariantDto getProductVariantById(String id) {
        log.info("Buscando variante de producto con ID: {}", id);

        ProductVariant productVariant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante de producto no encontrada con ID: " + id));

        return productVariantMapper.toDto(productVariant);
    }

    @Override
    public List<ProductVariantDto> getAllProductVariants() {
        log.info("Obteniendo todas las variantes de producto");

        List<ProductVariant> productVariants = productVariantRepository.findAll();
        return productVariantMapper.toDtoList(productVariants);
    }

    @Override
    public Page<ProductVariantDto> getAllProductVariants(Pageable pageable) {
        log.info("Obteniendo todas las variantes de producto con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<ProductVariant> productVariantsPage = productVariantRepository.findAll(pageable);
        return productVariantsPage.map(productVariantMapper::toDto);
    }

    @Override
    public List<ProductVariantDto> getAllAvailableProductVariants() {
        log.info("Obteniendo todas las variantes de producto disponibles");

        List<ProductVariant> productVariants = productVariantRepository.findAllAvailable();
        return productVariantMapper.toDtoList(productVariants);
    }

    @Override
    public List<ProductVariantDto> getProductVariantsByProductId(String productId) {
        log.info("Obteniendo variantes por producto ID: {}", productId);

        List<ProductVariant> productVariants = productVariantRepository.findByProductId(productId);
        return productVariantMapper.toDtoList(productVariants);
    }

    @Override
    public List<ProductVariantDto> getAvailableProductVariantsByProductId(String productId) {
        log.info("Obteniendo variantes disponibles por producto ID: {}", productId);

        List<ProductVariant> productVariants = productVariantRepository.findAvailableByProductId(productId);
        return productVariantMapper.toDtoList(productVariants);
    }

    @Override
    public ProductVariantDto updateProductVariant(String id, ProductVariantDto productVariantDto) {
        log.info("Actualizando variante de producto con ID: {}", id);

        ProductVariant existingProductVariant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante de producto no encontrada con ID: " + id));

        if (!productRepository.existsById(productVariantDto.getProductId())) {
            throw new RuntimeException("Producto no encontrado con ID: " + productVariantDto.getProductId());
        }

        productVariantMapper.updateEntityFromDto(productVariantDto, existingProductVariant);
        ProductVariant updatedProductVariant = productVariantRepository.save(existingProductVariant);

        log.info("Variante de producto actualizada exitosamente");
        return productVariantMapper.toDto(updatedProductVariant);
    }

    @Override
    public void deleteProductVariant(String id) {
        log.info("Eliminando variante de producto con ID: {}", id);

        if (!productVariantRepository.existsById(id)) {
            throw new RuntimeException("Variante de producto no encontrada con ID: " + id);
        }

        productVariantRepository.deleteById(id);
        log.info("Variante de producto eliminada exitosamente");
    }

    @Override
    public void deactivateProductVariant(String id) {
        log.info("Desactivando variante de producto con ID: {}", id);

        ProductVariant productVariant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante de producto no encontrada con ID: " + id));

        productVariant.setAvailable(false);
        productVariantRepository.save(productVariant);

        log.info("Variante de producto desactivada exitosamente");
    }

    @Override
    public ProductVariantDto uploadImage(String id, MultipartFile file) {
        log.info("Subiendo imagen para la variante de producto ID: {}", id);

        ProductVariant productVariant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante de producto no encontrada con ID: " + id));

        // Eliminar imagen anterior si existe
        if (productVariant.getMainImageUrl() != null) {
            firebaseStorageService.deleteImage(productVariant.getMainImageUrl());
        }

        String imageUrl = firebaseStorageService.uploadImage(file, "variants", "variant_" + id);
        productVariant.setMainImageUrl(imageUrl);
        ProductVariant updatedProductVariant = productVariantRepository.save(productVariant);

        log.info("Imagen subida y URL actualizada exitosamente: {}", imageUrl);
        return productVariantMapper.toDto(updatedProductVariant);
    }

    @Override
    public void deleteImage(String id) {
        log.info("Eliminando imagen de la variante de producto ID: {}", id);

        ProductVariant productVariant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante de producto no encontrada con ID: " + id));

        if (productVariant.getMainImageUrl() != null) {
            firebaseStorageService.deleteImage(productVariant.getMainImageUrl());
            productVariant.setMainImageUrl(null);
            productVariantRepository.save(productVariant);
            log.info("Imagen eliminada exitosamente");
        } else {
            log.warn("No hay imagen para eliminar en la variante ID: {}", id);
        }
    }
}
