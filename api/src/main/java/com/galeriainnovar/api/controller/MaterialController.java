package com.galeriainnovar.api.controller;

import com.galeriainnovar.api.dto.MaterialDto;
import com.galeriainnovar.api.service.MaterialService;
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
@RequestMapping("/api/materials")
@RequiredArgsConstructor
@Tag(name = "Materials", description = "API para gestión de materiales utilizados en productos")
public class MaterialController {

    private final MaterialService materialService;

    @PostMapping
    @Operation(summary = "Crear nuevo material", description = "Crea un nuevo material para productos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Material creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "El material ya existe")
    })
    public ResponseEntity<MaterialDto> createMaterial(@Valid @RequestBody MaterialDto materialDto) {
        MaterialDto createdMaterial = materialService.createMaterial(materialDto);
        return new ResponseEntity<>(createdMaterial, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener material por ID", description = "Obtiene un material específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Material encontrado"),
            @ApiResponse(responseCode = "404", description = "Material no encontrado")
    })
    public ResponseEntity<MaterialDto> getMaterialById(
            @Parameter(description = "ID del material") @PathVariable String id) {
        MaterialDto material = materialService.getMaterialById(id);
        return ResponseEntity.ok(material);
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Obtener material por nombre", description = "Obtiene un material específico por su nombre")
    public ResponseEntity<MaterialDto> getMaterialByName(
            @Parameter(description = "Nombre del material") @PathVariable String name) {
        MaterialDto material = materialService.getMaterialByName(name);
        return ResponseEntity.ok(material);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los materiales", description = "Obtiene una lista paginada de todos los materiales")
    public ResponseEntity<List<MaterialDto>> getAllMaterials(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<MaterialDto> materialsPage = materialService.getAllMaterials(pageable);

        String contentRange = String.format("materials %d-%d/%d",
            start,
            Math.min(start + materialsPage.getContent().size() - 1, (int) materialsPage.getTotalElements() - 1),
            materialsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);

        return ResponseEntity.ok().headers(headers).body(materialsPage.getContent());
    }

    @GetMapping("/active")
    @Operation(summary = "Obtener materiales activos", description = "Obtiene una lista paginada de todos los materiales activos")
    public ResponseEntity<List<MaterialDto>> getAllActiveMaterials(
            @RequestParam(value = "_start", defaultValue = "0") int start,
            @RequestParam(value = "_end", defaultValue = "10") int end,
            @RequestParam(value = "_sort", defaultValue = "name") String sort,
            @RequestParam(value = "_order", defaultValue = "ASC") String order) {

        int page = start / (end - start);
        int size = end - start;

        Sort.Direction direction = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));

        Page<MaterialDto> materialsPage = materialService.getAllActiveMaterials(pageable);

        String contentRange = String.format("materials %d-%d/%d",
            start,
            Math.min(start + materialsPage.getContent().size() - 1, (int) materialsPage.getTotalElements() - 1),
            materialsPage.getTotalElements());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", contentRange);
        headers.add("X-Total-Count", String.valueOf(materialsPage.getTotalElements()));

        return ResponseEntity.ok().headers(headers).body(materialsPage.getContent());
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Obtener materiales por tipo", description = "Obtiene materiales filtrados por tipo")
    public ResponseEntity<List<MaterialDto>> getMaterialsByType(
            @Parameter(description = "Tipo de material (WOOD, METAL, FABRIC, GLASS, etc.)") @PathVariable String type) {
        List<MaterialDto> materials = materialService.getMaterialsByType(type);
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/type/{type}/active")
    @Operation(summary = "Obtener materiales activos por tipo", description = "Obtiene materiales activos filtrados por tipo")
    public ResponseEntity<List<MaterialDto>> getActiveMaterialsByType(
            @Parameter(description = "Tipo de material") @PathVariable String type) {
        List<MaterialDto> materials = materialService.getActiveMaterialsByType(type);
        return ResponseEntity.ok(materials);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar material", description = "Actualiza un material existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Material actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Material no encontrado"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<MaterialDto> updateMaterial(
            @Parameter(description = "ID del material") @PathVariable String id,
            @Valid @RequestBody MaterialDto materialDto) {
        MaterialDto updatedMaterial = materialService.updateMaterial(id, materialDto);
        return ResponseEntity.ok(updatedMaterial);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar material", description = "Elimina un material permanentemente")
    @ApiResponse(responseCode = "204", description = "Material eliminado exitosamente")
    public ResponseEntity<Void> deleteMaterial(
            @Parameter(description = "ID del material") @PathVariable String id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Desactivar material", description = "Desactiva un material sin eliminarlo")
    @ApiResponse(responseCode = "204", description = "Material desactivado exitosamente")
    public ResponseEntity<Void> deactivateMaterial(
            @Parameter(description = "ID del material") @PathVariable String id) {
        materialService.deactivateMaterial(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar materiales", description = "Busca materiales por nombre")
    public ResponseEntity<List<MaterialDto>> searchMaterials(
            @Parameter(description = "Término de búsqueda") @RequestParam String name) {
        List<MaterialDto> materials = materialService.searchMaterialsByName(name);
        return ResponseEntity.ok(materials);
    }
}
