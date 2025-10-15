package com.galeriainnovar.api.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "materials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Material {

    @Id
    private String id;

    @NotBlank(message = "El nombre del material es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Indexed(unique = true)
    private String name;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @NotBlank(message = "El tipo de material es obligatorio")
    private String type; // WOOD, METAL, FABRIC, GLASS, etc.

    private boolean active;

    public Material(String name, String description, String type) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.active = true;
    }
}
