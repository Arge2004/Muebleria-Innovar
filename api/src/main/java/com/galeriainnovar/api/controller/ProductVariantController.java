package com.galeriainnovar.api.controller;

import com.galeriainnovar.api.dto.ProductVariantDto;
import com.galeriainnovar.api.service.ProductVariantService;
import com.galeriainnovar.api.service.FirebaseStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/product-variants")
@RequiredArgsConstructor
@Tag(name = "Product Variants", description = "API para gestión de variantes de productos")
public class ProductVariantController {

    private final ProductVariantService productVariantService;
    private final FirebaseStorageService firebaseStorageService;

    @PostMapping
    @Operation(summary = "Crear nueva variante de producto", description = "Crea una nueva variante para un producto existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Variante creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "La variante ya existe para este producto")
    })
    public ResponseEntity<ProductVariantDto> createProductVariant(@Valid @RequestBody ProductVariantDto productVariantDto) {
        ProductVariantDto createdVariant = productVariantService.createProductVariant(productVariantDto);
        return new ResponseEntity<>(createdVariant, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener variante por ID", description = "Obtiene una variante específica por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Variante encontrada"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada")
    })
    public ResponseEntity<ProductVariantDto> getProductVariantById(
            @Parameter(description = "ID de la variante") @PathVariable String id) {
        ProductVariantDto variant = productVariantService.getProductVariantById(id);
        return ResponseEntity.ok(variant);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las variantes", description = "Obtiene una lista paginada de todas las variantes de productos")
    public ResponseEntity<List<ProductVariantDto>> getAllProductVariants(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<ProductVariantDto> variantsPage = productVariantService.getAllProductVariants(pageable);

        String contentRange = String.format("product-variants %d-%d/%d",
                start,
                Math.min(start + variantsPage.getContent().size() - 1, (int) variantsPage.getTotalElements() - 1),
                variantsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);
        headers.add("X-Total-Count", String.valueOf(variantsPage.getTotalElements()));

        return ResponseEntity.ok().headers(headers).body(variantsPage.getContent());
    }

    @GetMapping("/available")
    @Operation(summary = "Obtener variantes disponibles", description = "Obtiene todas las variantes disponibles")
    public ResponseEntity<List<ProductVariantDto>> getAllAvailableProductVariants() {
        List<ProductVariantDto> variants = productVariantService.getAllAvailableProductVariants();
        return ResponseEntity.ok(variants);
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Obtener variantes por producto", description = "Obtiene todas las variantes de un producto específico")
    public ResponseEntity<List<ProductVariantDto>> getProductVariantsByProductId(
            @Parameter(description = "ID del producto") @PathVariable String productId) {
        List<ProductVariantDto> variants = productVariantService.getProductVariantsByProductId(productId);
        return ResponseEntity.ok(variants);
    }

    @GetMapping("/product/{productId}/available")
    @Operation(summary = "Obtener variantes disponibles por producto", description = "Obtiene variantes disponibles de un producto específico")
    public ResponseEntity<List<ProductVariantDto>> getAvailableProductVariantsByProductId(
            @Parameter(description = "ID del producto") @PathVariable String productId) {
        List<ProductVariantDto> variants = productVariantService.getAvailableProductVariantsByProductId(productId);
        return ResponseEntity.ok(variants);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar variante", description = "Actualiza una variante existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Variante actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<ProductVariantDto> updateProductVariant(
            @Parameter(description = "ID de la variante") @PathVariable String id,
            @Valid @RequestBody ProductVariantDto productVariantDto) {
        ProductVariantDto updatedVariant = productVariantService.updateProductVariant(id, productVariantDto);
        return ResponseEntity.ok(updatedVariant);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar variante", description = "Elimina una variante permanentemente")
    @ApiResponse(responseCode = "204", description = "Variante eliminada exitosamente")
    public ResponseEntity<Void> deleteProductVariant(
            @Parameter(description = "ID de la variante") @PathVariable String id) {
        productVariantService.deleteProductVariant(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Desactivar variante", description = "Desactiva una variante sin eliminarla")
    @ApiResponse(responseCode = "204", description = "Variante desactivada exitosamente")
    public ResponseEntity<Void> deactivateProductVariant(
            @Parameter(description = "ID de la variante") @PathVariable String id) {
        productVariantService.deactivateProductVariant(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/image")
    @Operation(summary = "Subir imagen para variante", description = "Sube una imagen a Firebase Storage y asocia la URL a la variante")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imagen subida y asociada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<ProductVariantDto> uploadImage(
            @Parameter(description = "ID de la variante") @PathVariable String id,
            @Parameter(description = "Archivo de imagen") @RequestParam MultipartFile file) {
        ProductVariantDto updatedVariant = productVariantService.uploadImage(id, file);
        return ResponseEntity.ok(updatedVariant);
    }

    @DeleteMapping("/{id}/image")
    @Operation(summary = "Eliminar imagen de variante", description = "Elimina la imagen asociada a una variante en Firebase Storage")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Imagen eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada")
    })
    public ResponseEntity<Void> deleteImage(
            @Parameter(description = "ID de la variante") @PathVariable String id) {
        productVariantService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/images")
    @Operation(summary = "Subir imágenes de variante", description = "Sube imágenes específicas para una variante")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imágenes subidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada"),
            @ApiResponse(responseCode = "400", description = "Archivo de imagen inválido")
    })
    public ResponseEntity<List<String>> uploadVariantImages(
            @Parameter(description = "ID de la variante") @PathVariable String id,
            @Parameter(description = "Imágenes de la variante") @RequestParam("images") List<MultipartFile> images) {

        // Verificar que la variante existe
        productVariantService.getProductVariantById(id);

        List<String> imageUrls = firebaseStorageService.uploadImages(images, "variants", "variant_" + id);
        return ResponseEntity.ok(imageUrls);
    }
}
