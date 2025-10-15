package com.galeriainnovar.api.service.impl;

import com.galeriainnovar.api.dto.CategoryDto;
import com.galeriainnovar.api.entity.Category;
import com.galeriainnovar.api.mapper.CategoryMapper;
import com.galeriainnovar.api.repository.CategoryRepository;
import com.galeriainnovar.api.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        log.info("Creando nueva categoría: {}", categoryDto.getName());

        if (categoryRepository.existsByName(categoryDto.getName())) {
            throw new RuntimeException("Ya existe una categoría con el nombre: " + categoryDto.getName());
        }

        Category category = categoryMapper.toEntity(categoryDto);
        Category savedCategory = categoryRepository.save(category);

        log.info("Categoría creada exitosamente con ID: {}", savedCategory.getId());
        return categoryMapper.toDto(savedCategory);
    }

    @Override
    public CategoryDto getCategoryById(String id) {
        log.info("Buscando categoría con ID: {}", id);

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));

        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryDto getCategoryByName(String name) {
        log.info("Buscando categoría con nombre: {}", name);

        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con nombre: " + name));

        return categoryMapper.toDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        log.info("Obteniendo todas las categorías");

        List<Category> categories = categoryRepository.findAll();
        return categoryMapper.toDtoList(categories);
    }

    @Override
    public Page<CategoryDto> getAllCategories(Pageable pageable) {
        log.info("Obteniendo todas las categorías con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Category> categoriesPage = categoryRepository.findAll(pageable);
        return categoriesPage.map(categoryMapper::toDto);
    }

    @Override
    public List<CategoryDto> getAllActiveCategories() {
        log.info("Obteniendo todas las categorías activas");

        List<Category> categories = categoryRepository.findAllActive();
        return categoryMapper.toDtoList(categories);
    }

    @Override
    public Page<CategoryDto> getAllActiveCategories(Pageable pageable) {
        log.info("Obteniendo todas las categorías activas con paginación - página: {}, tamaño: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Category> categoriesPage = categoryRepository.findAllActivePageable(pageable);
        return categoriesPage.map(categoryMapper::toDto);
    }

    @Override
    public CategoryDto updateCategory(String id, CategoryDto categoryDto) {
        log.info("Actualizando categoría con ID: {}", id);

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));

        if (!existingCategory.getName().equals(categoryDto.getName()) &&
            categoryRepository.existsByName(categoryDto.getName())) {
            throw new RuntimeException("Ya existe una categoría con el nombre: " + categoryDto.getName());
        }

        categoryMapper.updateEntityFromDto(categoryDto, existingCategory);
        Category updatedCategory = categoryRepository.save(existingCategory);

        log.info("Categoría actualizada exitosamente");
        return categoryMapper.toDto(updatedCategory);
    }

    @Override
    public void deleteCategory(String id) {
        log.info("Eliminando categoría con ID: {}", id);

        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }

        categoryRepository.deleteById(id);
        log.info("Categoría eliminada exitosamente");
    }

    @Override
    public void deactivateCategory(String id) {
        log.info("Desactivando categoría con ID: {}", id);

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));

        category.setActive(false);
        categoryRepository.save(category);

        log.info("Categoría desactivada exitosamente");
    }

    @Override
    public void activateCategory(String id) {
        log.info("Activando categoría con ID: {}", id);

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));

        category.setActive(true);
        categoryRepository.save(category);

        log.info("Categoría activada exitosamente");
    }

    @Override
    public List<CategoryDto> searchCategoriesByName(String name) {
        log.info("Buscando categorías que contengan: {}", name);

        List<Category> categories = categoryRepository.findByNameContainingIgnoreCase(name);
        return categoryMapper.toDtoList(categories);
    }
}
