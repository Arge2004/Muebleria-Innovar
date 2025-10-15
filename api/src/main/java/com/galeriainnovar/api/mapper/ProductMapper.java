package com.galeriainnovar.api.mapper;

import com.galeriainnovar.api.dto.ProductDto;
import com.galeriainnovar.api.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {

    ProductDto toDto(Product product);

    List<ProductDto> toDtoList(List<Product> products);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", constant = "true")
    @Mapping(target = "createdAt", source = "productDto", qualifiedByName = "getCurrentTime")
    @Mapping(target = "updatedAt", source = "productDto", qualifiedByName = "getCurrentTime")
    Product toEntity(ProductDto productDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", source = "productDto", qualifiedByName = "getCurrentTime")
    void updateEntityFromDto(ProductDto productDto, @MappingTarget Product product);

    @Named("getCurrentTime")
    default LocalDateTime getCurrentTime(ProductDto productDto) {
        return LocalDateTime.now();
    }
}
