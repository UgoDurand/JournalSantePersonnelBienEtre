package fr.JSBE.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

/**
 * Contrôleur d'accueil pour les endpoints publics
 */
@RestController
public class HomeController {
    
    /**
     * Endpoint d'accueil public
     * @return message de bienvenue
     */
    @GetMapping("/")
    public ResponseEntity<?> home() {
        return ResponseEntity.ok().body("{\n" +
            "  \"message\": \"Bienvenue sur l'API Journal Santé Personnel\",\n" +
            "  \"status\": \"running\",\n" +
            "  \"authentication\": \"Microsoft OAuth2\",\n" +
            "  \"endpoints\": {\n" +
            "    \"info\": \"/auth/info\",\n" +
            "    \"login\": \"/oauth2/authorize/microsoft\"\n" +
            "  }\n" +
            "}");
    }
    
    /**
     * Endpoint de vérification de santé
     * @return statut de l'application
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok().body("{\n" +
            "  \"status\": \"UP\",\n" +
            "  \"timestamp\": \"" + java.time.Instant.now() + "\"\n" +
            "}");
    }
} 