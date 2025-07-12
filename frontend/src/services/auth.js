import { API_CONFIG } from '@/config/api'

const API_BASE_URL = API_CONFIG.BASE_URL

class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')
    
    try {
      this.user = userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error('AuthService - Erreur parsing user:', error)
      this.user = null
      localStorage.removeItem('auth_user')
    }
    
    this.isLoading = false
    this.isInitialized = false
  }

  /**
   * Initialiser le service d'authentification avec validation automatique
   */
  async initialize() {
    try {
      if (this.token && this.user) {
        const isValid = await this.validateToken()
        if (isValid) {
          this.isInitialized = true
          return true
        } else {
          this.logout()
        }
      }
      
      this.isInitialized = true
      return false
      
    } catch (error) {
      console.error('AuthService - Erreur lors de l\'initialisation:', error)
      this.logout()
      this.isInitialized = true
      return false
    }
  }

  /**
   * Rediriger vers l'authentification Microsoft
   */
  async loginWithMicrosoft() {
    // Redirection directe vers Microsoft OAuth2
    window.location.href = `${API_BASE_URL}/oauth2/authorize/microsoft`
  }

  /**
   * Vérifier la santé du backend
   */
  async checkBackendHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Backend non accessible')
      }
    } catch (error) {
      throw new Error('Service d\'authentification indisponible')
    }
  }

  /**
   * Gérer le callback d'authentification avec le token JWT et l'email
   */
  async handleAuthCallback(token, email = null) {
    this.token = token
    localStorage.setItem('auth_token', token)
    
    if (email) {
      const userData = {
        email: email,
        name: email.split('@')[0],
        authenticated: true
      }
      
      this.user = userData
      localStorage.setItem('auth_user', JSON.stringify(userData))
    }
    
    try {
      await this.fetchUserInfo()
    } catch (error) {
      if (!email && !this.user) {
        this.logout()
        throw new Error('Impossible de récupérer les informations utilisateur')
      }
    }
  }

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  async fetchUserInfo() {
    try {
      const response = await this.apiCall('/auth/user')
      this.user = response
      localStorage.setItem('auth_user', JSON.stringify(response))
      return response
    } catch (error) {
      this.logout()
      throw new Error('Impossible de récupérer les informations utilisateur')
    }
  }

  /**
   * Valider le token JWT avec gestion d'erreurs améliorée
   */
  async validateToken() {
    if (!this.token) {
      return false
    }

    try {
      await this.apiCall('/auth/validate')
      return true
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('Session expirée')) {
        return false
      }
      
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return true
      }
      
      return false
    }
  }

  /**
   * Déconnexion
   */
  async logout() {
    try {
      if (this.token) {
        await this.apiCall('/auth/logout', { method: 'POST' })
      }
    } catch (error) {
      console.warn('Erreur lors de la déconnexion:', error)
    } finally {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  /**
   * Effectuer un appel API avec authentification
   */
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }
    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`
    }
    console.log('🌐 [AuthService] Appel API:', url, config)
    const response = await fetch(url, config)
    console.log('📡 [AuthService] Réponse statut:', response.status, response.statusText)
    if (!response.ok) {
      if (response.status === 401) {
        if (this.user && this.user.isDevMode) {
          console.warn('🚨 [DevMode] Erreur 401 ignorée en mode développement')
          throw new Error('Erreur 401 - Authentification requise (mode dev)')
        }
        this.logout()
        throw new Error('Session expirée, veuillez vous reconnecter')
      }
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur ${response.status}`)
    }
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    return await response.text()
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated() {
    return !!this.token && !!this.user
  }

  /**
   * Vérifier si le service est en cours de chargement
   */
  getIsLoading() {
    return this.isLoading
  }

  /**
   * Vérifier si le service est initialisé
   */
  getIsInitialized() {
    return this.isInitialized
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser() {
    return this.user
  }

  /**
   * Obtenir le token actuel
   */
  getToken() {
    return this.token
  }

  /**
   * Obtenir les informations d'authentification
   */
  async getAuthInfo() {
    return await this.apiCall('/auth/info')
  }

  /**
   * 🛠️ MODE DÉVELOPPEMENT UNIQUEMENT
   * Simuler une authentification pour tester les fonctionnalités
   */
  enableDevMode() {
    console.warn('🚨 MODE DÉVELOPPEMENT ACTIVÉ - Ne pas utiliser en production!')
    this.token = 'dev-token-' + Math.random().toString(36).substr(2, 9)
    this.user = {
      id: 1,
      email: 'dev@test.com',
      name: 'Développeur Test',
      authenticated: true,
      isDevMode: true
    }
    localStorage.setItem('auth_token', this.token)
    localStorage.setItem('auth_user', JSON.stringify(this.user))
    console.log('✅ Authentification de développement configurée')
    console.log('👤 Utilisateur:', this.user)
    return true
  }

  /**
   * Désactiver le mode développement
   */
  disableDevMode() {
    if (this.user && this.user.isDevMode) {
      this.logout()
      console.log('🔒 Mode développement désactivé')
    }
  }
}

export const authService = new AuthService()

// Plugin Vue pour injecter le service d'auth
export const AuthPlugin = {
  install(app) {
    app.config.globalProperties.$auth = authService
    app.provide('auth', authService)
  }
} 