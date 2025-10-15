package com.galeriainnovar.api.service.impl;

import com.galeriainnovar.api.dto.MaterialDto;
import com.galeriainnovar.api.entity.Material;
import com.galeriainnovar.api.mapper.MaterialMapper;
import com.galeriainnovar.api.repository.MaterialRepository;
import com.galeriainnovar.api.service.MaterialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final MaterialMapper materialMapper;

    @Override
    public MaterialDto createMaterial(MaterialDto materialDto) {
        log.info("Creando nuevo material: {}", materialDto.getName());

        if (materialRepository.existsByName(materialDto.getName())) {
            throw new RuntimeException("Ya existe un material con el nombre: " + materialDto.getName());
        }

        Material material = materialMapper.toEntity(materialDto);
        Material savedMaterial = materialRepository.save(material);

        log.info("Material creado exitosamente con ID: {}", savedMaterial.getId());
        return materialMapper.toDto(savedMaterial);
    }

    @Override
    public MaterialDto getMaterialById(String id) {
        log.info("Buscando material con ID: {}", id);

        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado con ID: " + id));

        return materialMapper.toDto(material);
    }

    @Override
    public MaterialDto getMaterialByName(String name) {
        log.info("Buscando material con nombre: {}", name);

        Material material = materialRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Material no encontrado con nombre: " + name));

        return materialMapper.toDto(material);
    }

    @Override
    public List<MaterialDto> getAllMaterials() {
        log.info("Obteniendo todos los materiales");

        List<Material> materials = materialRepository.findAll();
        return materialMapper.toDtoList(materials);
    }

    @Override
    public Page<MaterialDto> getAllMaterials(Pageable pageable) {
        log.info("Obteniendo todos los materiales con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Material> materialsPage = materialRepository.findAll(pageable);
        return materialsPage.map(materialMapper::toDto);
    }

    @Override
    public List<MaterialDto> getAllActiveMaterials() {
        log.info("Obteniendo todos los materiales activos");

        List<Material> materials = materialRepository.findAllActive();
        return materialMapper.toDtoList(materials);
    }

    @Override
    public Page<MaterialDto> getAllActiveMaterials(Pageable pageable) {
        log.info("Obteniendo todos los materiales activos con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Material> materialsPage = materialRepository.findAllActivePageable(pageable);
        return materialsPage.map(materialMapper::toDto);
    }

    @Override
    public List<MaterialDto> getMaterialsByType(String type) {
        log.info("Obteniendo materiales por tipo: {}", type);

        List<Material> materials = materialRepository.findByType(type);
        return materialMapper.toDtoList(materials);
    }

    @Override
    public List<MaterialDto> getActiveMaterialsByType(String type) {
        log.info("Obteniendo materiales activos por tipo: {}", type);

        List<Material> materials = materialRepository.findActiveByType(type);
        return materialMapper.toDtoList(materials);
    }

    @Override
    public MaterialDto updateMaterial(String id, MaterialDto materialDto) {
        log.info("Actualizando material con ID: {}", id);

        Material existingMaterial = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado con ID: " + id));

        if (!existingMaterial.getName().equals(materialDto.getName()) &&
            materialRepository.existsByName(materialDto.getName())) {
            throw new RuntimeException("Ya existe un material con el nombre: " + materialDto.getName());
        }

        materialMapper.updateEntityFromDto(materialDto, existingMaterial);
        Material updatedMaterial = materialRepository.save(existingMaterial);

        log.info("Material actualizado exitosamente");
        return materialMapper.toDto(updatedMaterial);
    }

    @Override
    public void deleteMaterial(String id) {
        log.info("Eliminando material con ID: {}", id);

        if (!materialRepository.existsById(id)) {
            throw new RuntimeException("Material no encontrado con ID: " + id);
        }

        materialRepository.deleteById(id);
        log.info("Material eliminado exitosamente");
    }

    @Override
    public void deactivateMaterial(String id) {
        log.info("Desactivando material con ID: {}", id);

        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado con ID: " + id));

        material.setActive(false);
        materialRepository.save(material);

        log.info("Material desactivado exitosamente");
    }

    @Override
    public void activateMaterial(String id) {
        log.info("Activando material con ID: {}", id);

        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado con ID: " + id));

        material.setActive(true);
        materialRepository.save(material);

        log.info("Material activado exitosamente");
    }

    @Override
    public List<MaterialDto> searchMaterialsByName(String name) {
        log.info("Buscando materiales que contengan: {}", name);

        List<Material> materials = materialRepository.findByNameContainingIgnoreCase(name);
        return materialMapper.toDtoList(materials);
    }
}
