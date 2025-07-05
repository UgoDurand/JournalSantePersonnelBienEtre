package fr.JSBE.backend.controller;

import fr.JSBE.backend.dto.AuthResponse;
import fr.JSBE.backend.dto.UserInfo;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.UserRepository;
import fr.JSBE.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Contrôleur pour la gestion de l'authentification Microsoft OAuth2
 * Fournit les endpoints pour l'authentification et la gestion des utilisateurs
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Endpoint pour récupérer les informations de l'utilisateur actuel
     * @param authorization le header Authorization contenant le token JWT
     * @return les informations de l'utilisateur ou une erreur 401
     */
    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authorization) {
        try {
            // Extraire le token du header Authorization
            String token = authorization.replace("Bearer ", "");
            
            // Valider le token
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Token invalide");
            }
            
            // Extraire l'ID utilisateur du token
            Long userId = jwtUtil.getUserIdFromToken(token);
            
            // Récupérer l'utilisateur depuis la base de données
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("Utilisateur non trouvé");
            }
            
            User user = userOptional.get();
            UserInfo userInfo = new UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImageUrl(),
                user.getEmailVerified(),
                user.getProvider()
            );
            
            return ResponseEntity.ok(userInfo);
            
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Erreur lors de la récupération de l'utilisateur: " + e.getMessage());
        }
    }
    
    /**
     * Endpoint pour vérifier la validité d'un token
     * @param authorization le header Authorization contenant le token JWT
     * @return la validité du token
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.replace("Bearer ", "");
            boolean isValid = jwtUtil.validateToken(token);
            
            if (isValid) {
                return ResponseEntity.ok().body("{\"valid\": true}");
            } else {
                return ResponseEntity.status(401).body("{\"valid\": false}");
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(401).body("{\"valid\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Endpoint pour la déconnexion (côté client, suppression du token)
     * @return message de confirmation
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Avec JWT, la déconnexion se fait côté client en supprimant le token
        // Ici on peut juste confirmer la déconnexion
        return ResponseEntity.ok().body("{\"message\": \"Déconnexion réussie\"}");
    }
    
    /**
     * Endpoint d'information générale sur l'API d'authentification
     * @return informations sur le fournisseur OAuth2 supporté
     */
    @GetMapping("/info")
    public ResponseEntity<?> getAuthInfo() {
        return ResponseEntity.ok().body("{\n" +
            "  \"authType\": \"oauth2\",\n" +
            "  \"provider\": \"microsoft\",\n" +
            "  \"loginUrl\": \"/oauth2/authorize/microsoft\",\n" +
            "  \"status\": \"active\"\n" +
            "}");
    }
} 