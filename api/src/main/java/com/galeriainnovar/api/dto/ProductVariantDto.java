package com.galeriainnovar.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "DTO para la entidad ProductVariant")
public class ProductVariantDto {

    @Schema(description = "ID único de la variante", example = "64f8b9c8e4b0f123456789ae")
    private String id;

    @NotBlank(message = "El ID del producto es obligatorio")
    @Schema(description = "ID del producto padre", example = "64f8b9c8e4b0f123456789ac", required = true)
    private String productId;

    @NotBlank(message = "El nombre de la variante es obligatorio")
    @Size(min = 2, max = 200, message = "El nombre debe tener entre 2 y 200 caracteres")
    @Schema(description = "Nombre de la variante", example = "Comedor roble 4 puestos - Acabado Natural", required = true)
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    @Schema(description = "Descripción de la variante", example = "Variante con acabado natural y vidrio templado")
    private String description;

    @DecimalMin(value = "0.0", message = "El precio adicional no puede ser negativo")
    @Schema(description = "Precio adicional de la variante", example = "150000.00")
    private BigDecimal additionalPrice;

    @Schema(description = "Atributos específicos de la variante", example = "{\"color\": \"Natural\", \"acabado\": \"Mate\"}")
    private Map<String, String> attributes;

    @Schema(description = "Lista de especificaciones de la variante", example = "[\"Acabado natural\", \"Vidrio templado\"]")
    private List<String> specifications;

    @Schema(description = "Dimensiones específicas de la variante")
    private ProductDto.DimensionsDto dimensions;

    @Schema(description = "URL de la imagen principal de la variante", example = "https://firebasestorage.googleapis.com/.../variante-natural.jpg")
    private String mainImageUrl;

    @Schema(description = "Lista de URLs de imágenes adicionales de la variante", example = "[\"https://firebasestorage.googleapis.com/.../variante1.jpg\", \"https://firebasestorage.googleapis.com/.../variante2.jpg\"]")
    private List<String> additionalImageUrls;

    @Schema(description = "Disponibilidad de la variante", example = "true")
    private boolean available;
}
