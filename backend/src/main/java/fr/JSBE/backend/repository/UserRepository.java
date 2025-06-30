package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.User;
import fr.JSBE.backend.model.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour la gestion des utilisateurs Microsoft OAuth2
 * Fournit les méthodes de base pour les opérations CRUD et les requêtes personnalisées
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Trouve un utilisateur par son email
     * @param email l'email de l'utilisateur
     * @return Optional contenant l'utilisateur s'il existe
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Trouve un utilisateur par son fournisseur OAuth et son ID de fournisseur
     * @param provider le fournisseur d'authentification
     * @param providerId l'ID fourni par le fournisseur
     * @return Optional contenant l'utilisateur s'il existe
     */
    Optional<User> findByProviderAndProviderId(AuthProvider provider, String providerId);
    
    /**
     * Vérifie si un utilisateur existe avec cet email
     * @param email l'email à vérifier
     * @return true si l'utilisateur existe, false sinon
     */
    Boolean existsByEmail(String email);
} 