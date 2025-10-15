package com.galeriainnovar.api.service;

import com.galeriainnovar.api.dto.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto getCategoryById(String id);

    CategoryDto getCategoryByName(String name);

    List<CategoryDto> getAllCategories();

    Page<CategoryDto> getAllCategories(Pageable pageable);

    List<CategoryDto> getAllActiveCategories();

    Page<CategoryDto> getAllActiveCategories(Pageable pageable);

    CategoryDto updateCategory(String id, CategoryDto categoryDto);

    void deleteCategory(String id);

    void deactivateCategory(String id);

    void activateCategory(String id);

    List<CategoryDto> searchCategoriesByName(String name);
}
