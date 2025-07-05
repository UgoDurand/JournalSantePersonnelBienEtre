package fr.JSBE.backend.security;

import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.UserRepository;
import fr.JSBE.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

/**
 * Filtre JWT pour valider les tokens Bearer dans les requêtes API
 * S'exécute avant les autres filtres Spring Security
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                   @NonNull HttpServletResponse response, 
                                   @NonNull FilterChain filterChain) throws ServletException, IOException {
        
        try {
            String jwt = extractJwtFromRequest(request);
            
            if (jwt != null && jwtUtil.validateToken(jwt)) {
                Long userId = jwtUtil.getUserIdFromToken(jwt);
                
                // Récupérer l'utilisateur depuis la base de données
                Optional<User> userOptional = userRepository.findById(userId);
                
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    
                    // Créer l'authentification Spring Security
                    UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                            user, 
                            null, 
                            new ArrayList<>() // Pas de rôles pour l'instant
                        );
                    
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    
                    logger.debug("Authentification JWT réussie pour l'utilisateur: {}", user.getEmail());
                }
            }
            
        } catch (Exception e) {
            logger.error("Erreur lors de l'authentification JWT: {}", e.getMessage());
            // Ne pas interrompre la chaîne des filtres, laisser Spring Security gérer l'erreur
        }
        
        filterChain.doFilter(request, response);
    }
    
    /**
     * Extrait le token JWT du header Authorization
     * @param request la requête HTTP
     * @return le token JWT ou null si non trouvé
     */
    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        return null;
    }
    
    /**
     * Détermine si ce filtre doit être appliqué à cette requête
     * @param request la requête HTTP
     * @return true si le filtre doit s'appliquer
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        
        // Ne pas filtrer les endpoints publics
        return path.startsWith("/auth/") ||
               path.startsWith("/oauth2/") ||
               path.startsWith("/login/") ||
               path.equals("/") ||
               path.equals("/health") ||
               path.equals("/error") ||
               path.startsWith("/static/") ||
               path.startsWith("/public/");
    }
} 