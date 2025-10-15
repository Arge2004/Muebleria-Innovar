package com.galeriainnovar.api.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Document(collection = "product_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant {

    @Id
    private String id;

    @NotBlank(message = "El ID del producto es obligatorio")
    @Indexed
    private String productId;

    @NotBlank(message = "El nombre de la variante es obligatorio")
    @Size(min = 2, max = 200, message = "El nombre debe tener entre 2 y 200 caracteres")
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @DecimalMin(value = "0.0", message = "El precio adicional no puede ser negativo")
    private BigDecimal additionalPrice;

    private Map<String, String> attributes; // color, finish, size, etc.

    private List<String> specifications;

    private Product.Dimensions dimensions; // dimensiones específicas de la variante

    private String mainImageUrl;

    private List<String> additionalImageUrls;

    private boolean available;

    public ProductVariant(String productId, String name, BigDecimal additionalPrice) {
        this.productId = productId;
        this.name = name;
        this.additionalPrice = additionalPrice != null ? additionalPrice : BigDecimal.ZERO;
        this.available = true;
    }
}
