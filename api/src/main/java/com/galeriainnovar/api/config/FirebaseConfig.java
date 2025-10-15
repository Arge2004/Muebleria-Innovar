package com.galeriainnovar.api.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
@Slf4j
public class FirebaseConfig {

    @Value("${firebase.credentials.path:firebase-service-account.json}")
    private String firebaseConfigPath;

    @Value("${firebase.storage.bucket:galeriainnovar-dev.appspot.com}")
    private String storageBucket;

    @Value("${firebase.enabled:false}")
    private boolean firebaseEnabled;

    @PostConstruct
    public void initialize() {
        if (!firebaseEnabled) {
            log.warn("Firebase está deshabilitado. Para habilitarlo, establece firebase.enabled=true en la configuración.");
            return;
        }

        try {
            if (FirebaseApp.getApps().isEmpty()) {
                InputStream serviceAccount = null;

                try {
                    // Intentar cargar desde classpath
                    ClassPathResource resource = new ClassPathResource(firebaseConfigPath);
                    if (resource.exists()) {
                        serviceAccount = resource.getInputStream();
                        log.info("Archivo de credenciales Firebase encontrado: {}", firebaseConfigPath);
                    } else {
                        log.warn("Archivo de credenciales Firebase no encontrado: {}", firebaseConfigPath);
                    }
                } catch (Exception e) {
                    log.warn("Error al cargar archivo de credenciales Firebase: {}", e.getMessage());
                }

                if (serviceAccount != null) {
                    try {
                        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
                        FirebaseOptions options = FirebaseOptions.builder()
                                .setCredentials(credentials)
                                .setStorageBucket(storageBucket)
                                .build();

                        FirebaseApp.initializeApp(options);
                        log.info("Firebase inicializado correctamente con archivo de credenciales");
                        serviceAccount.close();
                    } catch (IOException e) {
                        log.error("Error al procesar credenciales de Firebase: {}", e.getMessage());
                        throw new RuntimeException("Error al procesar credenciales de Firebase", e);
                    }
                } else {
                    log.warn("Firebase no se pudo inicializar: No se encontraron credenciales válidas.");
                    log.warn("Para habilitar Firebase:");
                    log.warn("1. Crea un proyecto en Firebase Console");
                    log.warn("2. Descarga el archivo de credenciales de servicio");
                    log.warn("3. Colócalo en src/main/resources/{}", firebaseConfigPath);
                    log.warn("4. Establece firebase.enabled=true en la configuración");
                }
            }
        } catch (Exception e) {
            log.error("Error general al inicializar Firebase: {}", e.getMessage());
            // No lanzar excepción para permitir que la aplicación continue sin Firebase
            log.warn("La aplicación continuará funcionando sin Firebase");
        }
    }
}
