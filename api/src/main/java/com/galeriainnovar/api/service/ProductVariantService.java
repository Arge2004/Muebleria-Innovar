package com.galeriainnovar.api.service;

import com.galeriainnovar.api.dto.ProductVariantDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductVariantService {

    ProductVariantDto createProductVariant(ProductVariantDto productVariantDto);

    ProductVariantDto getProductVariantById(String id);

    List<ProductVariantDto> getAllProductVariants();

    Page<ProductVariantDto> getAllProductVariants(Pageable pageable);

    List<ProductVariantDto> getAllAvailableProductVariants();

    List<ProductVariantDto> getProductVariantsByProductId(String productId);

    List<ProductVariantDto> getAvailableProductVariantsByProductId(String productId);

    ProductVariantDto updateProductVariant(String id, ProductVariantDto productVariantDto);

    void deleteProductVariant(String id);

    void deactivateProductVariant(String id);


    /**
     * Sube una imagen para una variante de producto
     *
     * @param id    ID de la variante
     * @param file  Archivo de imagen
     * @return ProductVariantDto actualizado con la URL de la imagen
     */
    ProductVariantDto uploadImage(String id, org.springframework.web.multipart.MultipartFile file);

    /**
     * Elimina la imagen de una variante de producto
     *
     * @param id ID de la variante
     */
    void deleteImage(String id);
}
