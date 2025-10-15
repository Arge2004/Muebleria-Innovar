package com.galeriainnovar.api.mapper;

import com.galeriainnovar.api.dto.MaterialDto;
import com.galeriainnovar.api.entity.Material;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MaterialMapper {

    MaterialDto toDto(Material material);

    List<MaterialDto> toDtoList(List<Material> materials);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", constant = "true")
    Material toEntity(MaterialDto materialDto);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(MaterialDto materialDto, @MappingTarget Material material);
}
