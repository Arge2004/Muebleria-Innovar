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
@Schema(description = "DTO para la entidad Material")
public class MaterialDto {

    @Schema(description = "ID único del material", example = "64f8b9c8e4b0f123456789ad")
    private String id;

    @NotBlank(message = "El nombre del material es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Schema(description = "Nombre del material", example = "Roble", required = true)
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    @Schema(description = "Descripción del material", example = "Madera de roble macizo de alta calidad")
    private String description;

    @NotBlank(message = "El tipo de material es obligatorio")
    @Schema(description = "Tipo de material", example = "WOOD", required = true)
    private String type;

    @Schema(description = "Estado activo del material", example = "true")
    private boolean active;
}
