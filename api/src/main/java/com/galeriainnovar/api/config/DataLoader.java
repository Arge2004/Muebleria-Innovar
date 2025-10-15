package com.galeriainnovar.api.config;

import com.galeriainnovar.api.entity.Category;
import com.galeriainnovar.api.entity.Material;
import com.galeriainnovar.api.entity.Product;
import com.galeriainnovar.api.entity.ProductVariant;
import com.galeriainnovar.api.repository.CategoryRepository;
import com.galeriainnovar.api.repository.MaterialRepository;
import com.galeriainnovar.api.repository.ProductRepository;
import com.galeriainnovar.api.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final MaterialRepository materialRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            log.info("Iniciando carga de datos iniciales...");
            loadInitialData();
            log.info("Carga de datos iniciales completada");
        } else {
            log.info("Los datos ya existen, omitiendo carga inicial");
        }
    }

    private void loadInitialData() {
        // Crear materiales
        List<Material> materials = createMaterials();
        materialRepository.saveAll(materials);

        // Crear categorías
        List<Category> categories = createCategories();
        categoryRepository.saveAll(categories);

        // Crear productos y variantes
        createProductsAndVariants(categories);
    }

    private List<Material> createMaterials() {
        return Arrays.asList(
                Material.builder().name("Roble").description("Madera de roble macizo de alta calidad").type("WOOD").active(true).build(),
                Material.builder().name("MDF").description("Tablero de fibra de densidad media").type("WOOD").active(true).build(),
                Material.builder().name("Vidrio Templado").description("Vidrio templado de 10mm").type("GLASS").active(true).build(),
                Material.builder().name("Pino Ciprés").description("Madera de pino ciprés para estructura").type("WOOD").active(true).build(),
                Material.builder().name("Espuma Penta").description("Espuma penta densidad 26").type("FOAM").active(true).build(),
                Material.builder().name("Rieles Metálicos").description("Rieles metálicos para cajones").type("METAL").active(true).build(),
                Material.builder().name("Tela").description("Tela para tapizado").type("FABRIC").active(true).build()
        );
    }

    private List<Category> createCategories() {
        return Arrays.asList(
                new Category("Comedores", "Muebles para comedor con garantía de 3 años en broma y desajuste"),
                new Category("Nocheros", "Mesas de noche con diferentes configuraciones"),
                new Category("Camas", "Camas talladas y de remarco con garantía de 3 años"),
                new Category("Camarotes", "Camarotes y tarimas con garantía de 3 años"),
                new Category("Salas", "Salas con estructura interna en pino ciprés y garantía de 3 años")
        );
    }

    private void createProductsAndVariants(List<Category> categories) {
        String comedoresId = categories.get(0).getId();
        String nocherosId = categories.get(1).getId();
        String camasId = categories.get(2).getId();
        String camarotesId = categories.get(3).getId();
        String salasId = categories.get(4).getId();

        // COMEDORES
        createComedores(comedoresId);

        // NOCHEROS
        createNocheros(nocherosId);

        // CAMAS
        createCamas(camasId);

        // CAMAROTES
        createCamarotes(camarotesId);

        // SALAS
        createSalas(salasId);
    }

    private void createComedores(String categoryId) {
        List<Product> comedores = Arrays.asList(
                Product.builder()
                        .name("Comedor roble 4 puestos")
                        .description("Comedor roble 4 puestos con vidrio 10 mm")
                        .basePrice(new BigDecimal("1500000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble", "Vidrio Templado"))
                        .dimensions(Product.Dimensions.builder()
                                .diameter(120.0)
                                .height(90.0)
                                .unit("cm")
                                .build())
                        .specifications(Arrays.asList("Vidrio 10mm", "4 puestos"))
                        .warranty("3 años en broma y desajuste")
                        .customizationOptions(Arrays.asList("Acabado", "Color de vidrio"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Product.builder()
                        .name("Comedor ahorrador de espacio")
                        .description("Comedor ahorrador de espacio con vidrio 10 mm")
                        .basePrice(new BigDecimal("1200000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble", "Vidrio Templado"))
                        .dimensions(Product.Dimensions.builder()
                                .diameter(100.0)
                                .unit("cm")
                                .build())
                        .specifications(Arrays.asList("Vidrio 10mm", "Diseño compacto"))
                        .warranty("3 años en broma y desajuste")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        productRepository.saveAll(comedores);
        createComedorVariants(comedores);
    }

    private void createComedorVariants(List<Product> comedores) {
        for (Product comedor : comedores) {
            List<ProductVariant> variants = Arrays.asList(
                    ProductVariant.builder()
                            .productId(comedor.getId())
                            .name(comedor.getName() + " - Acabado Natural")
                            .description("Variante con acabado natural")
                            .additionalPrice(BigDecimal.ZERO)
                            .attributes(Map.of("acabado", "Natural", "color", "Miel"))
                            .available(true)
                            .build(),

                    ProductVariant.builder()
                            .productId(comedor.getId())
                            .name(comedor.getName() + " - Acabado Envejecido")
                            .description("Variante con acabado envejecido")
                            .additionalPrice(new BigDecimal("200000"))
                            .attributes(Map.of("acabado", "Envejecido", "color", "Oscuro"))
                            .available(true)
                            .build()
            );
            productVariantRepository.saveAll(variants);
        }
    }

    private void createNocheros(String categoryId) {
        List<Product> nocheros = Arrays.asList(
                Product.builder()
                        .name("Nochero galería cajón revistero")
                        .description("Nochero con cajones y revistero")
                        .basePrice(new BigDecimal("450000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble", "MDF", "Rieles Metálicos"))
                        .specifications(Arrays.asList("Cajones con rieles metálicos", "Revistero integrado"))
                        .customizationOptions(Arrays.asList("Número de cajones"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Product.builder()
                        .name("Nochero roble 3 cajones")
                        .description("Nochero roble macizo con 3 cajones")
                        .basePrice(new BigDecimal("380000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble"))
                        .specifications(Arrays.asList("Estructura maciza", "3 cajones"))
                        .customizationOptions(Arrays.asList("Natural", "Miel", "Envejecido"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        productRepository.saveAll(nocheros);
    }

    private void createCamas(String categoryId) {
        List<Product> camas = Arrays.asList(
                Product.builder()
                        .name("Cama tallada roble macizo")
                        .description("Cama con detalles tallados en madera")
                        .basePrice(new BigDecimal("850000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble"))
                        .specifications(Arrays.asList("Detalles tallados", "Roble macizo"))
                        .warranty("3 años en broma y desajuste")
                        .customizationOptions(Arrays.asList("Natural", "Miel", "Envejecido"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Product.builder()
                        .name("Cama de remarco roble")
                        .description("Cama con tapizado en espaldar y piecera")
                        .basePrice(new BigDecimal("750000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble", "Tela"))
                        .specifications(Arrays.asList("Tapizado centro", "Espaldar y piecera"))
                        .warranty("3 años en broma y desajuste")
                        .customizationOptions(Arrays.asList("Tela", "Colores"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        productRepository.saveAll(camas);
    }

    private void createCamarotes(String categoryId) {
        List<Product> camarotes = Arrays.asList(
                Product.builder()
                        .name("Camarote roble pirámide")
                        .description("Camarote con diseño piramidal")
                        .basePrice(new BigDecimal("1100000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble"))
                        .dimensions(Product.Dimensions.builder()
                                .length(190.0)
                                .width(120.0)
                                .unit("cm")
                                .build())
                        .specifications(Arrays.asList("Cama arriba 1x1.90", "Cama abajo 1.20x1.90"))
                        .warranty("3 años en broma y desajuste")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Product.builder()
                        .name("Tarimas en roble")
                        .description("Tarimas con estructura roble macizo")
                        .basePrice(new BigDecimal("650000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble"))
                        .specifications(Arrays.asList("Estructura maciza", "Tendido de tablas", "Rodachines"))
                        .warranty("3 años en broma y desajuste")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        productRepository.saveAll(camarotes);
    }

    private void createSalas(String categoryId) {
        List<Product> salas = Arrays.asList(
                Product.builder()
                        .name("Sala Pandora")
                        .description("Sala en L con asiento en forma de nube")
                        .basePrice(new BigDecimal("2800000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Pino Ciprés", "Espuma Penta", "Tela"))
                        .dimensions(Product.Dimensions.builder()
                                .length(170.0)
                                .width(260.0)
                                .unit("cm")
                                .build())
                        .specifications(Arrays.asList("Asiento forma de nube", "Espuma penta densidad 26", "10 cm"))
                        .warranty("3 años en broma y desajuste")
                        .customizationOptions(Arrays.asList("Color", "Tela"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Product.builder()
                        .name("Sala Royal")
                        .description("Sala con sofá carrito expandible y baúl interno")
                        .basePrice(new BigDecimal("3200000"))
                        .categoryId(categoryId)
                        .materials(Arrays.asList("Roble", "Pino Ciprés", "Tela"))
                        .dimensions(Product.Dimensions.builder()
                                .length(220.0)
                                .width(150.0)
                                .unit("cm")
                                .build())
                        .specifications(Arrays.asList("Sofá carrito expandible", "Baúl interno", "Patas en roble"))
                        .warranty("3 años en broma y desajuste")
                        .customizationOptions(Arrays.asList("Color", "Tela"))
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        productRepository.saveAll(salas);
    }
}
