package com.galeriainnovar.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO para la entidad Product")
public class ProductDto {

    @Schema(description = "ID único del producto", example = "64f8b9c8e4b0f123456789ac")
    private String id;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(min = 2, max = 200, message = "El nombre debe tener entre 2 y 200 caracteres")
    @Schema(description = "Nombre del producto", example = "Comedor roble 4 puestos", required = true)
    private String name;

    @Size(max = 1000, message = "La descripción no puede exceder los 1000 caracteres")
    @Schema(description = "Descripción del producto", example = "Comedor roble 4 puestos con vidrio 10 mm")
    private String description;

    @NotNull(message = "El precio base es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    @Schema(description = "Precio base del producto", example = "1250000.00", required = true)
    private BigDecimal basePrice;

    @NotBlank(message = "La categoría es obligatoria")
    @Schema(description = "ID de la categoría", example = "64f8b9c8e4b0f123456789ab", required = true)
    private String categoryId;

    @Schema(description = "Lista de materiales utilizados", example = "[\"Roble\", \"Vidrio\"]")
    private List<String> materials;

    @Schema(description = "Dimensiones del producto")
    private DimensionsDto dimensions;

    @Schema(description = "Lista de especificaciones del producto", example = "[\"Vidrio 10mm\", \"4 puestos\"]")
    private List<String> specifications;

    @Schema(description = "Información de garantía", example = "3 años en broma y desajuste")
    private String warranty;

    @Schema(description = "Opciones de personalización disponibles", example = "[\"Color\", \"Acabado\"]")
    private List<String> customizationOptions;

    @Schema(description = "URL de la imagen principal del producto", example = "https://firebasestorage.googleapis.com/.../imagen-principal.jpg")
    private String mainImageUrl;

    @Schema(description = "Lista de URLs de imágenes adicionales del producto", example = "[\"https://firebasestorage.googleapis.com/.../imagen1.jpg\", \"https://firebasestorage.googleapis.com/.../imagen2.jpg\"]")
    private List<String> additionalImageUrls;

    @Schema(description = "Estado activo del producto", example = "true")
    private boolean active;

    @Schema(description = "Fecha de creación")
    private LocalDateTime createdAt;

    @Schema(description = "Fecha de última actualización")
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "DTO para dimensiones del producto")
    public static class DimensionsDto {
        @Schema(description = "Largo en centímetros", example = "120.0")
        private Double length;

        @Schema(description = "Ancho en centímetros", example = "90.0")
        private Double width;

        @Schema(description = "Alto en centímetros", example = "75.0")
        private Double height;

        @Schema(description = "Diámetro en centímetros (para mesas redondas)", example = "120.0")
        private Double diameter;

        @Schema(description = "Unidad de medida", example = "cm")
        private String unit;
    }
}
