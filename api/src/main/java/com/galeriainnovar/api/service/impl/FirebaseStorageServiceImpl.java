package com.galeriainnovar.api.service.impl;

import com.galeriainnovar.api.service.FirebaseStorageService;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseStorageServiceImpl implements FirebaseStorageService {

    @Value("${firebase.storage.bucket:galeriainnovar-default-rtdb.appspot.com}")
    private String bucketName;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp");
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @Override
    public String uploadImage(MultipartFile file, String folder, String fileName) {
        try {
            if (!isValidImage(file)) {
                throw new RuntimeException("Archivo de imagen inválido");
            }

            String actualFileName = fileName != null ? fileName : generateFileName(file.getOriginalFilename());
            String fullPath = folder + "/" + actualFileName;

            Storage storage = StorageClient.getInstance().bucket().getStorage();

            BlobId blobId = BlobId.of(bucketName, fullPath);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(file.getContentType())
                    .build();

            Blob blob = storage.create(blobInfo, file.getBytes());

            // Generar URL pública
            String publicUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    bucketName, fullPath.replace("/", "%2F"));

            log.info("Imagen subida exitosamente: {}", publicUrl);
            return publicUrl;

        } catch (IOException e) {
            log.error("Error al subir imagen: {}", e.getMessage(), e);
            throw new RuntimeException("Error al subir la imagen", e);
        }
    }

    @Override
    public List<String> uploadImages(List<MultipartFile> files, String folder, String prefix) {
        List<String> uploadedUrls = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            try {
                String fileName = prefix + "_" + (i + 1) + "_" + UUID.randomUUID().toString().substring(0, 8) +
                                getFileExtension(files.get(i).getOriginalFilename());
                String url = uploadImage(files.get(i), folder, fileName);
                uploadedUrls.add(url);
            } catch (Exception e) {
                log.error("Error al subir imagen {}: {}", i, e.getMessage());
                // Continuar con las siguientes imágenes
            }
        }

        return uploadedUrls;
    }

    @Override
    public boolean deleteImage(String imageUrl) {
        try {
            String fileName = extractFileNameFromUrl(imageUrl);
            if (fileName == null) {
                log.warn("No se pudo extraer el nombre del archivo de la URL: {}", imageUrl);
                return false;
            }

            Storage storage = StorageClient.getInstance().bucket().getStorage();
            BlobId blobId = BlobId.of(bucketName, fileName);

            boolean deleted = storage.delete(blobId);
            if (deleted) {
                log.info("Imagen eliminada exitosamente: {}", imageUrl);
            } else {
                log.warn("No se pudo eliminar la imagen: {}", imageUrl);
            }

            return deleted;

        } catch (Exception e) {
            log.error("Error al eliminar imagen {}: {}", imageUrl, e.getMessage(), e);
            return false;
        }
    }

    @Override
    public int deleteImages(List<String> imageUrls) {
        int deletedCount = 0;

        for (String imageUrl : imageUrls) {
            if (deleteImage(imageUrl)) {
                deletedCount++;
            }
        }

        log.info("Eliminadas {} de {} imágenes", deletedCount, imageUrls.size());
        return deletedCount;
    }

    @Override
    public boolean isValidImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            log.warn("Archivo vacío o nulo");
            return false;
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            log.warn("Archivo demasiado grande: {} bytes. Máximo permitido: {} bytes",
                    file.getSize(), MAX_FILE_SIZE);
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            log.warn("Nombre de archivo nulo");
            return false;
        }

        String extension = getFileExtension(originalFilename).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            log.warn("Extensión de archivo no permitida: {}. Permitidas: {}", extension, ALLOWED_EXTENSIONS);
            return false;
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            log.warn("Tipo de contenido inválido: {}", contentType);
            return false;
        }

        return true;
    }

    private String generateFileName(String originalFilename) {
        String extension = getFileExtension(originalFilename);
        return UUID.randomUUID().toString() + "." + extension;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    private String extractFileNameFromUrl(String imageUrl) {
        try {
            // Extraer el nombre del archivo de la URL de Firebase Storage
            // Formato: https://firebasestorage.googleapis.com/v0/b/bucket/o/folder%2Ffilename?alt=media
            if (imageUrl.contains("/o/")) {
                String path = imageUrl.substring(imageUrl.indexOf("/o/") + 3);
                if (path.contains("?")) {
                    path = path.substring(0, path.indexOf("?"));
                }
                // Decodificar %2F a /
                return path.replace("%2F", "/");
            }
            return null;
        } catch (Exception e) {
            log.error("Error al extraer nombre de archivo de URL: {}", imageUrl, e);
            return null;
        }
    }
}
