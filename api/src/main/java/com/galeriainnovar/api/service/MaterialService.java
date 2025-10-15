package com.galeriainnovar.api.service;

import com.galeriainnovar.api.dto.MaterialDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MaterialService {

    MaterialDto createMaterial(MaterialDto materialDto);

    MaterialDto getMaterialById(String id);

    MaterialDto getMaterialByName(String name);

    List<MaterialDto> getAllMaterials();

    Page<MaterialDto> getAllMaterials(Pageable pageable);

    List<MaterialDto> getAllActiveMaterials();

    Page<MaterialDto> getAllActiveMaterials(Pageable pageable);

    List<MaterialDto> getMaterialsByType(String type);

    List<MaterialDto> getActiveMaterialsByType(String type);

    MaterialDto updateMaterial(String id, MaterialDto materialDto);

    void deleteMaterial(String id);

    void deactivateMaterial(String id);

    void activateMaterial(String id);

    List<MaterialDto> searchMaterialsByName(String name);
}
