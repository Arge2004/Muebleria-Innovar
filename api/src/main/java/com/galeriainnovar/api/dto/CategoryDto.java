package com.galeriainnovar.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO para la entidad Category")
public class CategoryDto {

    @Schema(description = "ID único de la categoría", example = "64f8b9c8e4b0f123456789ab")
    private String id;

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Schema(description = "Nombre de la categoría", example = "Comedores", required = true)
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    @Schema(description = "Descripción de la categoría", example = "Muebles para comedor con garantía de 3 años")
    private String description;

    @Schema(description = "Estado activo de la categoría", example = "true")
    private boolean active;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO para crear una nueva categoría")
class CategoryCreateDto {

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Schema(description = "Nombre de la categoría", example = "Comedores", required = true)
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    @Schema(description = "Descripción de la categoría", example = "Muebles para comedor con garantía de 3 años")
    private String description;
}
