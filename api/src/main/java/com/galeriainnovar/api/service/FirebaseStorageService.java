package com.galeriainnovar.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FirebaseStorageService {

    /**
     * Sube una imagen a Firebase Storage
     * @param file El archivo de imagen a subir
     * @param folder La carpeta donde se guardará (products, variants, categories, etc.)
     * @param fileName Nombre del archivo (opcional, se genera automáticamente si es null)
     * @return URL pública de la imagen subida
     */
    String uploadImage(MultipartFile file, String folder, String fileName);

    /**
     * Sube múltiples imágenes a Firebase Storage
     * @param files Lista de archivos de imagen a subir
     * @param folder La carpeta donde se guardarán
     * @param prefix Prefijo para los nombres de archivo
     * @return Lista de URLs públicas de las imágenes subidas
     */
    List<String> uploadImages(List<MultipartFile> files, String folder, String prefix);

    /**
     * Elimina una imagen de Firebase Storage
     * @param imageUrl URL de la imagen a eliminar
     * @return true si se eliminó correctamente, false en caso contrario
     */
    boolean deleteImage(String imageUrl);

    /**
     * Elimina múltiples imágenes de Firebase Storage
     * @param imageUrls Lista de URLs de imágenes a eliminar
     * @return Número de imágenes eliminadas exitosamente
     */
    int deleteImages(List<String> imageUrls);

    /**
     * Valida si el archivo es una imagen válida
     * @param file El archivo a validar
     * @return true si es una imagen válida, false en caso contrario
     */
    boolean isValidImage(MultipartFile file);
}
