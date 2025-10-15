package com.galeriainnovar.api.mapper;

import com.galeriainnovar.api.dto.CategoryDto;
import com.galeriainnovar.api.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CategoryMapper {

    CategoryDto toDto(Category category);

    List<CategoryDto> toDtoList(List<Category> categories);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", constant = "true")
    Category toEntity(CategoryDto categoryDto);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(CategoryDto categoryDto, @MappingTarget Category category);
}
