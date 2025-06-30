package fr.JSBE.backend.service;

import java.util.Map;

/**
 * Implémentation pour les informations utilisateur Microsoft OAuth2
 * Utilise Microsoft Graph API pour récupérer les informations utilisateur
 */
public class MicrosoftOAuth2UserInfo extends OAuth2UserInfo {
    
    public MicrosoftOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }
    
    @Override
    public String getId() {
        return (String) attributes.get("id");
    }
    
    @Override
    public String getName() {
        // Microsoft Graph utilise "displayName"
        String displayName = (String) attributes.get("displayName");
        if (displayName != null && !displayName.isEmpty()) {
            return displayName;
        }
        
        // Fallback vers d'autres attributs
        String givenName = (String) attributes.get("givenName");
        String surname = (String) attributes.get("surname");
        if (givenName != null && surname != null) {
            return givenName + " " + surname;
        }
        
        return (String) attributes.get("userPrincipalName");
    }
    
    @Override
    public String getEmail() {
        // Microsoft Graph utilise "mail" pour l'email principal
        String email = (String) attributes.get("mail");
        if (email != null && !email.isEmpty()) {
            return email;
        }
        
        // Fallback vers userPrincipalName qui est souvent un email
        email = (String) attributes.get("userPrincipalName");
        if (email != null && !email.isEmpty() && email.contains("@")) {
            return email;
        }
        
        return null;
    }
    
    @Override
    public String getImageUrl() {
        // Microsoft Graph ne fournit pas d'URL d'image directement dans /me
        // Il faudrait faire un appel séparé à /me/photo/$value
        return null;
    }
} 