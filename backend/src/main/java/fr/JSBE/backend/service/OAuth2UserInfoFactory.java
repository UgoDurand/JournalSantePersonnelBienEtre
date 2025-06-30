package fr.JSBE.backend.service;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import java.util.Map;

/**
 * Factory pour créer les instances appropriées d'OAuth2UserInfo selon le fournisseur
 */
public class OAuth2UserInfoFactory {
    
    /**
     * Crée une instance d'OAuth2UserInfo selon le fournisseur
     * @param registrationId l'ID d'enregistrement du fournisseur OAuth2
     * @param attributes les attributs utilisateur du fournisseur
     * @return l'instance appropriée d'OAuth2UserInfo
     * @throws OAuth2AuthenticationException si le fournisseur n'est pas supporté
     */
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if ("microsoft".equalsIgnoreCase(registrationId)) {
            return new MicrosoftOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationException("Fournisseur OAuth2 non supporté: " + registrationId + ". Seul Microsoft est supporté.");
        }
    }
} 