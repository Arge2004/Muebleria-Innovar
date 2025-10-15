package com.galeriainnovar.api.mapper;

import com.galeriainnovar.api.dto.ProductVariantDto;
import com.galeriainnovar.api.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductVariantMapper {

    ProductVariantDto toDto(ProductVariant productVariant);

    List<ProductVariantDto> toDtoList(List<ProductVariant> productVariants);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "available", constant = "true")
    ProductVariant toEntity(ProductVariantDto productVariantDto);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(ProductVariantDto productVariantDto, @MappingTarget ProductVariant productVariant);
}
