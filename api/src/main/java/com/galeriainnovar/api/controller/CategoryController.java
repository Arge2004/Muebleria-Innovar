package com.galeriainnovar.api.controller;

import com.galeriainnovar.api.dto.CategoryDto;
import com.galeriainnovar.api.service.CategoryService;
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

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "API para gestión de categorías de productos")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @Operation(summary = "Crear nueva categoría", description = "Crea una nueva categoría de productos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoría creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "La categoría ya existe")
    })
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto createdCategory = categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoría por ID", description = "Obtiene una categoría específica por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoría encontrada"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada")
    })
    public ResponseEntity<CategoryDto> getCategoryById(
            @Parameter(description = "ID de la categoría") @PathVariable String id) {
        CategoryDto category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Obtener categoría por nombre", description = "Obtiene una categoría específica por su nombre")
    public ResponseEntity<CategoryDto> getCategoryByName(
            @Parameter(description = "Nombre de la categoría") @PathVariable String name) {
        CategoryDto category = categoryService.getCategoryByName(name);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las categorías", description = "Obtiene una lista paginada de todas las categorías")
    public ResponseEntity<List<CategoryDto>> getAllCategories(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        // Convertir parámetros de React Admin a Spring Data
        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<CategoryDto> categoriesPage = categoryService.getAllCategories(pageable);

        // Crear header Content-Range para React Admin
        String contentRange = String.format("categories %d-%d/%d",
            start,
            Math.min(start + categoriesPage.getContent().size() - 1, (int) categoriesPage.getTotalElements() - 1),
            categoriesPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();

        headers.add("X-Total-Count", String.valueOf(categoriesPage.getTotalElements()));

        return ResponseEntity.ok().headers(headers).body(categoriesPage.getContent());
    }

    @GetMapping("/active")
    @Operation(summary = "Obtener categorías activas", description = "Obtiene una lista paginada de todas las categorías activas")
    public ResponseEntity<List<CategoryDto>> getAllActiveCategories(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<CategoryDto> categoriesPage = categoryService.getAllActiveCategories(pageable);

        String contentRange = String.format("categories %d-%d/%d",
            start,
            Math.min(start + categoriesPage.getContent().size() - 1, (int) categoriesPage.getTotalElements() - 1),
            categoriesPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);

        return ResponseEntity.ok().headers(headers).body(categoriesPage.getContent());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría", description = "Actualiza una categoría existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoría actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<CategoryDto> updateCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String id,
            @Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto updatedCategory = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría", description = "Elimina una categoría permanentemente")
    @ApiResponse(responseCode = "204", description = "Categoría eliminada exitosamente")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Desactivar categoría", description = "Desactiva una categoría sin eliminarla")
    @ApiResponse(responseCode = "204", description = "Categoría desactivada exitosamente")
    public ResponseEntity<Void> deactivateCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String id) {
        categoryService.deactivateCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    @Operation(summary = "Activar categoría", description = "Activa una categoría previamente desactivada")
    @ApiResponse(responseCode = "204", description = "Categoría activada exitosamente")
    public ResponseEntity<Void> activateCategory(
            @Parameter(description = "ID de la categoría") @PathVariable String id) {
        categoryService.activateCategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar categorías", description = "Busca categorías por nombre")
    public ResponseEntity<List<CategoryDto>> searchCategories(
            @Parameter(description = "Término de búsqueda") @RequestParam String name) {
        List<CategoryDto> categories = categoryService.searchCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }
}
