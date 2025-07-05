import { BaseService } from './BaseService.js'
import { DietData, DataValidator } from '../models/index.js'

/**
 * Service pour la gestion des données d'alimentation
 */
export class DietService extends BaseService {
  
  /**
   * Récupérer les données d'alimentation pour une date donnée
   * @param {string} date - Date au format YYYY-MM-DD
   * @returns {Promise<DietData|null>}
   */
  async getByDate(date) {
    try {
      const response = await this.get('/diet', { date })
      
      if (!response || !response.data) {
        return null
      }
      
      // Si l'API retourne un tableau, prendre le premier élément
      const dietData = Array.isArray(response.data) ? response.data[0] : response.data
      
      if (!dietData) {
        return null
      }
      
      return DietData.fromAPI(dietData)
    } catch (error) {
      if (error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  /**
   * Récupérer les données d'alimentation pour une période
   * @param {string} startDate - Date de début YYYY-MM-DD
   * @param {string} endDate - Date de fin YYYY-MM-DD
   * @returns {Promise<DietData[]>}
   */
  async getByDateRange(startDate, endDate) {
    try {
      console.log('🍎 [DietService] getByDateRange appelé avec:', { startDate, endDate })
      
      const response = await this.get('/diet/range', {
        startDate,
        endDate
      })
      
      console.log('🍎 [DietService] Réponse reçue:', response)
      
      // response est directement les données (tableau), pas un objet avec .data
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.log('🍎 [DietService] Aucune donnée dans la réponse ou tableau vide')
        return []
      }
      
      const processedData = response.map(item => DietData.fromAPI(item))
      console.log('🍎 [DietService] Données traitées:', processedData)
      
      return processedData
    } catch (error) {
      console.error('🍎 [DietService] Erreur:', error)
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Créer une nouvelle entrée d'alimentation
   * @param {Object} dietData - Données d'alimentation
   * @returns {Promise<DietData>}
   */
  async create(dietData) {
    // Validation des données
    const errors = DataValidator.validateDiet(dietData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const dietModel = new DietData(dietData)
    
    try {
      const response = await this.post('/diet', dietModel.toAPI())
      return DietData.fromAPI(response.data)
    } catch (error) {
      if (error.message.includes('409')) {
        throw new Error('Des données existent déjà pour cette date')
      }
      throw error
    }
  }

  /**
   * Mettre à jour une entrée d'alimentation
   * @param {string} id - ID de l'entrée
   * @param {Object} dietData - Nouvelles données
   * @returns {Promise<DietData>}
   */
  async update(id, dietData) {
    // Validation des données
    const errors = DataValidator.validateDiet(dietData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const dietModel = new DietData(dietData)
    
    try {
      const response = await this.put(`/diet/${id}`, dietModel.toAPI())
      return DietData.fromAPI(response.data)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Créer ou mettre à jour une entrée d'alimentation pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} dietData - Données d'alimentation
   * @returns {Promise<DietData>}
   */
  async createOrUpdate(date, dietData) {
    const existingData = await this.getByDate(date)
    
    const dataWithDate = {
      ...dietData,
      date
    }
    
    if (existingData) {
      return await this.update(existingData.id, dataWithDate)
    } else {
      return await this.create(dataWithDate)
    }
  }

  /**
   * Supprimer une entrée d'alimentation
   * @param {string} id - ID de l'entrée
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await this.delete(`/diet/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Obtenir les statistiques d'alimentation
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Object>}
   */
  async getStats(period = 'week') {
    try {
      const response = await this.get('/diet/stats', { period })
      return response.data
    } catch (error) {
      if (error.message.includes('404')) {
        return {
          averageCalories: 0,
          averageProtein: 0,
          averageCarbs: 0,
          averageFats: 0,
          averageWater: 0,
          totalEntries: 0,
          bestDay: null,
          nutritionalBalance: {
            protein: 0,
            carbs: 0,
            fats: 0
          }
        }
      }
      throw error
    }
  }

  /**
   * Obtenir les tendances nutritionnelles
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Array>}
   */
  async getTrends(days = 30) {
    try {
      const response = await this.get('/diet/trends', { days })
      return response.data || []
    } catch (error) {
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Calculer les calories recommandées pour un utilisateur
   * @param {Object} userProfile - Profil utilisateur (age, weight, height, activity_level)
   * @returns {Promise<Object>}
   */
  async getRecommendations(userProfile) {
    try {
      const response = await this.post('/diet/recommendations', userProfile)
      return response.data
    } catch (error) {
      // Valeurs par défaut si le service n'est pas disponible
      return {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 67,
        water: 2000
      }
    }
  }
}

// Instance singleton
export const dietService = new DietService() 