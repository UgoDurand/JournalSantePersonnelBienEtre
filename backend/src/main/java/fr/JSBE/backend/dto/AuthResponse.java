package fr.JSBE.backend.dto;

/**
 * DTO pour les réponses d'authentification
 * Contient le token JWT et les informations utilisateur
 */
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserInfo userInfo;
    
    public AuthResponse(String accessToken, UserInfo userInfo) {
        this.accessToken = accessToken;
        this.userInfo = userInfo;
    }
    
    // Getters et Setters
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    
    public UserInfo getUserInfo() { return userInfo; }
    public void setUserInfo(UserInfo userInfo) { this.userInfo = userInfo; }
} 