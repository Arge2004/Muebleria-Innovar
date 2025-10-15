package com.galeriainnovar.api.controller;

import com.galeriainnovar.api.dto.ProductDto;
import com.galeriainnovar.api.service.ProductService;
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

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "API para gestión de productos de mueblería")
public class ProductController {

    private final ProductService productService;
    private final FirebaseStorageService firebaseStorageService;

    @PostMapping
    @Operation(summary = "Crear nuevo producto", description = "Crea un nuevo producto en el catálogo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Producto creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "El producto ya existe")
    })
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto productDto) {
        ProductDto createdProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Obtiene un producto específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<ProductDto> getProductById(
            @Parameter(description = "ID del producto") @PathVariable String id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los productos", description = "Obtiene una lista paginada de todos los productos")
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<ProductDto> productsPage = productService.getAllProducts(pageable);

        String contentRange = String.format("products %d-%d/%d",
            start,
            Math.min(start + productsPage.getContent().size() - 1, (int) productsPage.getTotalElements() - 1),
            productsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);
        headers.add("X-Total-Count", String.valueOf(productsPage.getTotalElements()));

        return ResponseEntity.ok().headers(headers).body(productsPage.getContent());
    }

    @GetMapping("/active")
    @Operation(summary = "Obtener productos activos", description = "Obtiene una lista paginada de todos los productos activos")
    public ResponseEntity<List<ProductDto>> getAllActiveProducts(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<ProductDto> productsPage = productService.getAllActiveProducts(pageable);

        String contentRange = String.format("products %d-%d/%d",
            start,
            Math.min(start + productsPage.getContent().size() - 1, (int) productsPage.getTotalElements() - 1),
            productsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);

        return ResponseEntity.ok().headers(headers).body(productsPage.getContent());
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Obtener productos por categoría", description = "Obtiene todos los productos de una categoría específica")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String categoryId,
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<ProductDto> productsPage = productService.getProductsByCategory(categoryId, pageable);

        String contentRange = String.format("products %d-%d/%d",
            start,
            Math.min(start + productsPage.getContent().size() - 1, (int) productsPage.getTotalElements() - 1),
            productsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);

        return ResponseEntity.ok().headers(headers).body(productsPage.getContent());
    }

    @GetMapping("/category/{categoryId}/active")
    @Operation(summary = "Obtener productos activos por categoría", description = "Obtiene productos activos de una categoría específica")
    public ResponseEntity<List<ProductDto>> getActiveProductsByCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String categoryId) {
        List<ProductDto> products = productService.getActiveProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto", description = "Actualiza un producto existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<ProductDto> updateProduct(
            @Parameter(description = "ID del producto") @PathVariable String id,
            @Valid @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto", description = "Elimina un producto permanentemente")
    @ApiResponse(responseCode = "204", description = "Producto eliminado exitosamente")
    public ResponseEntity<Void> deleteProduct(
            @Parameter(description = "ID del producto") @PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Desactivar producto", description = "Desactiva un producto sin eliminarlo")
    @ApiResponse(responseCode = "204", description = "Producto desactivado exitosamente")
    public ResponseEntity<Void> deactivateProduct(
            @Parameter(description = "ID del producto") @PathVariable String id) {
        productService.deactivateProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar productos", description = "Busca productos por nombre")
    public ResponseEntity<List<ProductDto>> searchProducts(
            @Parameter(description = "Término de búsqueda") @RequestParam String name) {
        List<ProductDto> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/price-range")
    @Operation(summary = "Buscar productos por rango de precio", description = "Filtra productos por rango de precios")
    public ResponseEntity<List<ProductDto>> getProductsByPriceRange(
            @Parameter(description = "Precio mínimo") @RequestParam BigDecimal minPrice,
            @Parameter(description = "Precio máximo") @RequestParam BigDecimal maxPrice) {
        List<ProductDto> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/materials")
    @Operation(summary = "Buscar productos por materiales", description = "Filtra productos por materiales utilizados")
    public ResponseEntity<List<ProductDto>> getProductsByMaterials(
            @Parameter(description = "Lista de materiales") @RequestParam List<String> materials) {
        List<ProductDto> products = productService.getProductsByMaterials(materials);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/{id}/images")
    @Operation(summary = "Subir imágenes del producto", description = "Sube una o varias imágenes para un producto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imágenes subidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
            @ApiResponse(responseCode = "400", description = "Archivo de imagen inválido")
    })
    public ResponseEntity<List<String>> uploadProductImages(
            @Parameter(description = "ID del producto") @PathVariable String id,
            @Parameter(description = "Imágenes del producto") @RequestParam("images") List<MultipartFile> images) {

        // Verificar que el producto existe
        productService.getProductById(id);

        List<String> imageUrls = firebaseStorageService.uploadImages(images, "products", "product_" + id);
        return ResponseEntity.ok(imageUrls);
    }

    @PostMapping("/{id}/main-image")
    @Operation(summary = "Subir imagen principal del producto", description = "Sube la imagen principal de un producto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imagen principal subida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
            @ApiResponse(responseCode = "400", description = "Archivo de imagen inválido")
    })
    public ResponseEntity<String> uploadProductMainImage(
            @Parameter(description = "ID del producto") @PathVariable String id,
            @Parameter(description = "Imagen principal del producto") @RequestParam("image") MultipartFile image) {

        // Verificar que el producto existe
        ProductDto product = productService.getProductById(id);

        String imageUrl = firebaseStorageService.uploadImage(image, "products", "main_" + id + "_" + image.getOriginalFilename());

        // Actualizar el producto con la nueva imagen principal
        product.setMainImageUrl(imageUrl);
        productService.updateProduct(id, product);

        return ResponseEntity.ok(imageUrl);
    }
}
