import { BaseService } from './BaseService.js'
import { SleepData, DataValidator } from '../models/index.js'

/**
 * Service pour la gestion des données de sommeil
 */
export class SleepService extends BaseService {
  
  /**
   * Récupérer les données de sommeil pour une date donnée
   * @param {string} date - Date au format YYYY-MM-DD
   * @returns {Promise<SleepData|null>}
   */
  async getByDate(date) {
    try {
      const response = await this.get('/sleep', { date })
      
      if (!response || !response.data) {
        return null
      }
      
      // Si l'API retourne un tableau, prendre le premier élément
      const sleepData = Array.isArray(response.data) ? response.data[0] : response.data

      if (!sleepData) {
        return null
      }
      
      return SleepData.fromAPI(sleepData)
    } catch (error) {
      // Si 404, pas de données pour cette date
      if (error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  /**
   * Récupérer les données de sommeil pour une période
   * @param {string} startDate - Date de début YYYY-MM-DD
   * @param {string} endDate - Date de fin YYYY-MM-DD
   * @returns {Promise<SleepData[]>}
   */
  async getByDateRange(startDate, endDate) {
    try {
      console.log('💤 [SleepService] getByDateRange appelé avec:', { startDate, endDate })
      
      const response = await this.get('/sleep/range', {
        startDate,
        endDate
      })
      
      console.log('💤 [SleepService] Réponse reçue:', response)
      
      // response est directement les données (tableau), pas un objet avec .data
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.log('💤 [SleepService] Aucune donnée dans la réponse ou tableau vide')
        return []
      }
      
      const processedData = response.map(item => SleepData.fromAPI(item))
      console.log('💤 [SleepService] Données traitées:', processedData)
      
      return processedData
    } catch (error) {
      console.error('💤 [SleepService] Erreur:', error)
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Créer une nouvelle entrée de sommeil
   * @param {Object} sleepData - Données de sommeil
   * @returns {Promise<SleepData>}
   */
  async create(sleepData) {
    // Validation des données
    const errors = DataValidator.validateSleep(sleepData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const sleepModel = new SleepData(sleepData)
    
    try {
      const response = await this.post('/sleep', sleepModel.toAPI())
      return SleepData.fromAPI(response.data)
    } catch (error) {
      if (error.message.includes('409')) {
        throw new Error('Des données existent déjà pour cette date')
      }
      throw error
    }
  }

  /**
   * Mettre à jour une entrée de sommeil
   * @param {string} id - ID de l'entrée
   * @param {Object} sleepData - Nouvelles données
   * @returns {Promise<SleepData>}
   */
  async update(id, sleepData) {
    // Validation des données
    const errors = DataValidator.validateSleep(sleepData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const sleepModel = new SleepData(sleepData)
    
    try {
      const response = await this.put(`/sleep/${id}`, sleepModel.toAPI())
      return SleepData.fromAPI(response.data)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Créer ou mettre à jour une entrée de sommeil pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} sleepData - Données de sommeil
   * @returns {Promise<SleepData>}
   */
  async createOrUpdate(date, sleepData) {
    const existingData = await this.getByDate(date)
    
    const dataWithDate = {
      ...sleepData,
      date
    }
    
    if (existingData) {
      return await this.update(existingData.id, dataWithDate)
    } else {
      return await this.create(dataWithDate)
    }
  }

  /**
   * Supprimer une entrée de sommeil
   * @param {string} id - ID de l'entrée
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await this.delete(`/sleep/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Obtenir les statistiques de sommeil
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Object>}
   */
  async getStats(period = 'week') {
    try {
      const response = await this.get('/sleep/stats', { period })
      return response.data
    } catch (error) {
      if (error.message.includes('404')) {
        return {
          averageDuration: 0,
          averageQuality: 0,
          totalEntries: 0,
          bestNight: null,
          worstNight: null
        }
      }
      throw error
    }
  }

  /**
   * Obtenir les tendances de sommeil
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Array>}
   */
  async getTrends(days = 30) {
    try {
      const response = await this.get('/sleep/trends', { days })
      return response.data || []
    } catch (error) {
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }
}

// Instance singleton
export const sleepService = new SleepService() 