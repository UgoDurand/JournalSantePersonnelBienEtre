package fr.JSBE.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

/**
 * Configuration pour charger les variables d'environnement depuis le fichier .env
 */
@Configuration
public class DotenvConfig {
    
    @PostConstruct
    public void loadEnv() {
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            
            // Charger les variables dans les propriétés système
            dotenv.entries().forEach(entry -> {
                if (System.getProperty(entry.getKey()) == null) {
                    System.setProperty(entry.getKey(), entry.getValue());
                }
            });
            
        } catch (Exception e) {
            System.out.println("Aucun fichier .env trouvé, utilisation des valeurs par défaut");
        }
    }
} 