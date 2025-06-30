package fr.JSBE.backend.security;

import fr.JSBE.backend.service.CustomOAuth2User;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

/**
 * Gestionnaire de succès d'authentification OAuth2
 */
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Value("${app.oauth2.authorized-redirect-uris}")
    private String authorizedRedirectUris;
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        
        String targetUrl = determineTargetUrl(request, response, authentication);
        
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        
        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
    
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        
        String targetUrl = authorizedRedirectUris;
        
        try {
            Object principal = authentication.getPrincipal();
            User user = null;
            
            if (principal instanceof CustomOAuth2User) {
                CustomOAuth2User oauth2User = (CustomOAuth2User) principal;
                user = oauth2User.getUser();
            }
            
            if (user == null) {
                logger.error("Impossible de récupérer les informations utilisateur");
                return UriComponentsBuilder.fromUriString(targetUrl)
                        .queryParam("error", "user_info_error")
                        .build().toUriString();
            }
            
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());
            
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("token", token)
                    .queryParam("email", user.getEmail())
                    .build().toUriString();
                    
        } catch (Exception e) {
            logger.error("Erreur lors de l'authentification OAuth2", e);
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "authentication_failed")
                    .build().toUriString();
        }
    }
    
    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);
        URI authorizedUri = URI.create(authorizedRedirectUris);
        
        return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                && authorizedUri.getPort() == clientRedirectUri.getPort();
    }
} 