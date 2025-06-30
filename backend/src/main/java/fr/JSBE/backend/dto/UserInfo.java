package fr.JSBE.backend.dto;

import fr.JSBE.backend.model.AuthProvider;

/**
 * DTO contenant les informations utilisateur Microsoft OAuth2 pour les réponses API
 */
public class UserInfo {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
    private Boolean emailVerified;
    private AuthProvider provider;
    
    public UserInfo(Long id, String name, String email, String imageUrl, Boolean emailVerified, AuthProvider provider) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.emailVerified = emailVerified;
        this.provider = provider;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }
    
    public AuthProvider getProvider() { return provider; }
    public void setProvider(AuthProvider provider) { this.provider = provider; }
} 