package fr.JSBE.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

/**
 * Utilitaire pour la gestion des tokens JWT
 * Fournit les méthodes pour générer, valider et extraire des informations des tokens
 */
@Component
public class JwtUtil {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    
    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;
    
    /**
     * Génère un token JWT pour un utilisateur
     * @param userId l'ID de l'utilisateur
     * @param email l'email de l'utilisateur
     * @param additionalClaims claims supplémentaires à inclure
     * @return le token JWT généré
     */
    public String generateToken(Long userId, String email, Map<String, Object> additionalClaims) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        
        JwtBuilder builder = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("email", email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey());
        
        // Ajouter les claims supplémentaires s'ils existent
        if (additionalClaims != null && !additionalClaims.isEmpty()) {
            additionalClaims.forEach(builder::claim);
        }
        
        return builder.compact();
    }
    
    /**
     * Génère un token JWT simple avec juste l'ID utilisateur et l'email
     * @param userId l'ID de l'utilisateur
     * @param email l'email de l'utilisateur
     * @return le token JWT généré
     */
    public String generateToken(Long userId, String email) {
        return generateToken(userId, email, null);
    }
    
    /**
     * Extrait l'ID utilisateur du token JWT
     * @param token le token JWT
     * @return l'ID de l'utilisateur
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }
    
    /**
     * Extrait l'email du token JWT
     * @param token le token JWT
     * @return l'email de l'utilisateur
     */
    public String getEmailFromToken(String token) {
        Claims claims = getClaims(token);
        return claims.get("email", String.class);
    }
    
    /**
     * Vérifie si un token JWT est valide
     * @param token le token JWT à valider
     * @return true si le token est valide, false sinon
     */
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (MalformedJwtException ex) {
            logger.debug("Token JWT malformé: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.debug("Token JWT expiré: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.debug("Token JWT non supporté: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.debug("Token JWT vide: {}", ex.getMessage());
        }
        return false;
    }
    
    /**
     * Extrait les claims du token JWT
     * @param token le token JWT
     * @return les claims du token
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Génère la clé de signature pour les tokens JWT
     * @return la clé de signature
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
} 