import { authService } from './auth.js'

/**
 * Service de base pour tous les appels API
 * Gère l'authentification, les erreurs et les formats de réponse
 */
export class BaseService {
  constructor() {
    this.auth = authService
  }

  /**
   * Effectuer un appel API authentifié
   * @param {string} endpoint - L'endpoint API (ex: '/sleep/data')
   * @param {Object} options - Options de la requête (method, body, etc.)
   * @returns {Promise} - Réponse de l'API
   */
  async apiCall(endpoint, options = {}) {
    try {
      return await this.auth.apiCall(endpoint, options)
    } catch (error) {
      // Log pour debugging
      console.error(`API Error on ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const queryString = Object.keys(params).length > 0 
      ? '?' + new URLSearchParams(params).toString()
      : ''
    
    const fullEndpoint = `${endpoint}${queryString}`
    console.log('🌐 [BaseService] GET request vers:', fullEndpoint)
    console.log('📝 [BaseService] Paramètres:', params)
    
    const response = await this.apiCall(fullEndpoint, {
      method: 'GET'
    })
    
    console.log('📥 [BaseService] Réponse reçue pour', fullEndpoint, ':', response)
    
    return response
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    console.log('🚀 [BaseService] POST request vers:', endpoint)
    console.log('📦 [BaseService] Données à envoyer:', data)
    
    try {
      const response = await this.apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      
      console.log('✅ [BaseService] Réponse POST reçue pour', endpoint, ':', response)
      return response
      
    } catch (error) {
      console.error('❌ [BaseService] Erreur POST sur', endpoint, ':', error)
      throw error
    }
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return await this.apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return await this.apiCall(endpoint, {
      method: 'DELETE'
    })
  }

  /**
   * Gestion des erreurs avec retry automatique
   */
  async withRetry(apiCall, maxRetries = 2) {
    let lastError = null
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await apiCall()
      } catch (error) {
        lastError = error
        
        // Ne pas retry sur les erreurs d'authentification
        if (error.message.includes('401') || error.message.includes('Session expirée')) {
          throw error
        }
        
        // Attendre avant le retry
        if (i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
        }
      }
    }
    
    throw lastError
  }
} 