package fr.JSBE.backend.service;

import fr.JSBE.backend.model.AuthProvider;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * Service personnalisé pour gérer l'authentification OAuth2 Microsoft
 */
@Service
public class OAuth2UserService extends DefaultOAuth2UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(OAuth2UserService.class);
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Charge l'utilisateur OAuth2 et le sauvegarde/met à jour en base de données
     * @param userRequest la requête OAuth2 contenant les informations du fournisseur
     * @return l'utilisateur OAuth2 avec les informations mises à jour
     * @throws OAuth2AuthenticationException en cas d'erreur d'authentification
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        try {
            OAuth2User oauth2User = super.loadUser(userRequest);
            return processOAuth2User(userRequest, oauth2User);
            
        } catch (OAuth2AuthenticationException e) {
            logger.error("Erreur d'authentification OAuth2: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Erreur lors du chargement de l'utilisateur OAuth2", e);
            String errorMessage = e.getMessage() != null ? e.getMessage() : "Erreur inconnue lors du chargement de l'utilisateur";
            throw new OAuth2AuthenticationException("Erreur lors du chargement de l'utilisateur: " + errorMessage);
        }
    }
    
    /**
     * Traite l'utilisateur OAuth2 et le sauvegarde en base de données
     * @param userRequest la requête OAuth2
     * @param oauth2User l'utilisateur OAuth2 récupéré
     * @return l'utilisateur OAuth2 personnalisé
     */
    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        AuthProvider provider = AuthProvider.valueOf(registrationId.toUpperCase());
        
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oauth2User.getAttributes());
        
        if (userInfo.getEmail() == null || userInfo.getEmail().isEmpty()) {
            throw new OAuth2AuthenticationException("Email non trouvé dans les informations OAuth2");
        }
        
        User user = processUser(userInfo, provider);
        return new CustomOAuth2User(oauth2User.getAttributes(), "id", user);
    }
    
    /**
     * Traite et sauvegarde l'utilisateur en base de données
     * @param userInfo les informations utilisateur
     * @param provider le fournisseur d'authentification
     * @return l'utilisateur traité
     */
    private User processUser(OAuth2UserInfo userInfo, AuthProvider provider) {
        User user = userRepository.findByEmail(userInfo.getEmail()).orElse(null);
        
        if (user != null) {
            // Utilisateur existant - vérifier le fournisseur
            if (!user.getProvider().equals(provider)) {
                throw new OAuth2AuthenticationException(
                    "Vous êtes déjà inscrit avec " + user.getProvider() + 
                    ". Veuillez utiliser votre compte " + user.getProvider() + " pour vous connecter."
                );
            }
            user = updateExistingUser(user, userInfo);
        } else {
            // Nouvel utilisateur
            user = createNewUser(userInfo, provider);
        }
        
        return user;
    }
    
    /**
     * Crée un nouvel utilisateur à partir des informations OAuth2
     * @param userInfo les informations utilisateur OAuth2
     * @param provider le fournisseur d'authentification
     * @return l'utilisateur créé
     */
    private User createNewUser(OAuth2UserInfo userInfo, AuthProvider provider) {
        User user = new User(
            userInfo.getName(),
            userInfo.getEmail(),
            userInfo.getImageUrl(),
            provider,
            userInfo.getId()
        );
        
        return userRepository.save(user);
    }
    
    /**
     * Met à jour un utilisateur existant avec les nouvelles informations OAuth2
     * @param existingUser l'utilisateur existant
     * @param userInfo les nouvelles informations utilisateur
     * @return l'utilisateur mis à jour
     */
    private User updateExistingUser(User existingUser, OAuth2UserInfo userInfo) {
        existingUser.setName(userInfo.getName());
        existingUser.setImageUrl(userInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
} 