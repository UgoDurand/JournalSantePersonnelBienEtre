package fr.JSBE.backend.service;

import java.util.Map;

/**
 * Classe abstraite pour extraire les informations utilisateur des fournisseurs OAuth2
 * Permet une interface commune pour Google, GitHub, etc.
 */
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;
    
    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    
    public abstract String getId();
    public abstract String getName();
    public abstract String getEmail();
    public abstract String getImageUrl();
} 