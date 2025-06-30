package fr.JSBE.backend.service;

import fr.JSBE.backend.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

/**
 * Implémentation personnalisée d'OAuth2User qui encapsule notre entité User
 * Permet d'accéder aux informations OAuth2 et à notre entité User personnalisée
 */
public class CustomOAuth2User implements OAuth2User {
    
    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final User user;
    
    public CustomOAuth2User(Map<String, Object> attributes, String nameAttributeKey, User user) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.user = user;
    }
    
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Pour l'instant, tous les utilisateurs ont le même rôle
        // Vous pouvez étendre ceci pour gérer des rôles différents
        return Collections.emptyList();
    }
    
    @Override
    public String getName() {
        if (nameAttributeKey != null) {
            return String.valueOf(attributes.get(nameAttributeKey));
        }
        return user.getName();
    }
    
    /**
     * Retourne l'entité User personnalisée
     * @return l'utilisateur de notre système
     */
    public User getUser() {
        return user;
    }
    
    /**
     * Retourne l'ID de l'utilisateur
     * @return l'ID de l'utilisateur
     */
    public Long getUserId() {
        return user.getId();
    }
    
    /**
     * Retourne l'email de l'utilisateur
     * @return l'email de l'utilisateur
     */
    public String getEmail() {
        return user.getEmail();
    }
} 