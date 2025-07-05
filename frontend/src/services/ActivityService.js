import { BaseService } from './BaseService.js'
import { ActivityData, DataValidator } from '../models/index.js'

/**
 * Service pour la gestion des données d'activité
 */
export class ActivityService extends BaseService {
  
  /**
   * Récupérer les données d'activité pour une date donnée
   * @param {string} date - Date au format YYYY-MM-DD
   * @returns {Promise<ActivityData[]>}
   */
  async getByDate(date) {
    try {
      const response = await this.get('/activity', { date })
      
      if (!response || !response.data) {
        return []
      }
      
      // S'assurer que response.data est un tableau
      const activityData = Array.isArray(response.data) ? response.data : [response.data]
      
      return activityData.map(item => ActivityData.fromAPI(item))
    } catch (error) {
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Récupérer les données d'activité pour une période
   * @param {string} startDate - Date de début YYYY-MM-DD
   * @param {string} endDate - Date de fin YYYY-MM-DD
   * @returns {Promise<ActivityData[]>}
   */
  async getByDateRange(startDate, endDate) {
    try {
      console.log('🏃 [ActivityService] getByDateRange appelé avec:', { startDate, endDate })
      
      const response = await this.get('/activity/range', {
        startDate,
        endDate
      })
      
      console.log('🏃 [ActivityService] Réponse reçue:', response)
      
      // response est directement les données (tableau), pas un objet avec .data
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.log('🏃 [ActivityService] Aucune donnée dans la réponse ou tableau vide')
        return []
      }
      
      const processedData = response.map(item => ActivityData.fromAPI(item))
      console.log('🏃 [ActivityService] Données traitées:', processedData)
      
      return processedData
    } catch (error) {
      console.error('🏃 [ActivityService] Erreur:', error)
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Créer une nouvelle entrée d'activité
   * @param {Object} activityData - Données d'activité
   * @returns {Promise<ActivityData>}
   */
  async create(activityData) {
    // Validation des données
    const errors = DataValidator.validateActivity(activityData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const activityModel = new ActivityData(activityData)
    
    const response = await this.post('/activity', activityModel.toAPI())
    return ActivityData.fromAPI(response.data)
  }

  /**
   * Mettre à jour une entrée d'activité
   * @param {string} id - ID de l'entrée
   * @param {Object} activityData - Nouvelles données
   * @returns {Promise<ActivityData>}
   */
  async update(id, activityData) {
    // Validation des données
    const errors = DataValidator.validateActivity(activityData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const activityModel = new ActivityData(activityData)
    
    try {
      const response = await this.put(`/activity/${id}`, activityModel.toAPI())
      return ActivityData.fromAPI(response.data)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Supprimer une entrée d'activité
   * @param {string} id - ID de l'entrée
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await this.delete(`/activity/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Obtenir les statistiques d'activité
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Object>}
   */
  async getStats(period = 'week') {
    try {
      const response = await this.get('/activity/stats', { period })
      return response.data
    } catch (error) {
      if (error.message.includes('404')) {
        return {
          totalActivities: 0,
          totalDuration: 0,
          totalCalories: 0,
          averageDuration: 0,
          mostFrequentActivity: null,
          intensityBreakdown: {
            low: 0,
            moderate: 0,
            high: 0
          }
        }
      }
      throw error
    }
  }

  /**
   * Obtenir les tendances d'activité
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Array>}
   */
  async getTrends(days = 30) {
    try {
      const response = await this.get('/activity/trends', { days })
      return response.data || []
    } catch (error) {
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Calculer les calories brûlées selon l'activité
   * @param {Object} activityParams - Paramètres de l'activité
   * @returns {Promise<number>}
   */
  async calculateCalories(activityParams) {
    try {
      const response = await this.post('/activity/calculate-calories', activityParams)
      return response.data.calories
    } catch (error) {
      // Calcul approximatif en cas d'erreur
      const { duration, intensity } = activityParams
      const intensityMultiplier = {
        low: 3,
        moderate: 5,
        high: 8
      }
      
      return Math.round(duration * (intensityMultiplier[intensity] || 5))
    }
  }

  /**
   * Obtenir les recommandations d'activité
   * @param {Object} userProfile - Profil utilisateur
   * @returns {Promise<Object>}
   */
  async getRecommendations(userProfile) {
    try {
      const response = await this.post('/activity/recommendations', userProfile)
      return response.data
    } catch (error) {
      // Recommandations par défaut
      return {
        weeklyMinutes: 150,
        sessionsPerWeek: 3,
        recommendedActivities: [
          'Marche',
          'Natation',
          'Vélo',
          'Cardio'
        ]
      }
    }
  }
}

// Instance singleton
export const activityService = new ActivityService() 