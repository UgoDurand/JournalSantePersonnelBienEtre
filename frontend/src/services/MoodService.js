import { BaseService } from './BaseService.js'
import { MoodData, DataValidator } from '../models/index.js'

/**
 * Service pour la gestion des données d'humeur
 */
export class MoodService extends BaseService {
  
  /**
   * Récupérer les données d'humeur pour une date donnée
   * @param {string} date - Date au format YYYY-MM-DD
   * @returns {Promise<MoodData|null>}
   */
  async getByDate(date) {
    try {
      const response = await this.get('/mood', { date })
      
      if (!response) {
        return null
      }
      
      // Si l'API retourne un tableau, prendre le premier élément
      const moodData = Array.isArray(response) ? response[0] : response
      
      if (!moodData) {
        return null
      }
      
      return MoodData.fromAPI(moodData)
    } catch (error) {
      if (error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  /**
   * Récupérer les données d'humeur pour une période
   * @param {string} startDate - Date de début YYYY-MM-DD
   * @param {string} endDate - Date de fin YYYY-MM-DD
   * @returns {Promise<MoodData[]>}
   */
  async getByDateRange(startDate, endDate) {
    try {
      console.log('😊 [MoodService] getByDateRange appelé avec:', { startDate, endDate })
      
      const response = await this.get('/mood/range', {
        startDate,
        endDate
      })
      
      console.log('😊 [MoodService] Réponse reçue:', response)
      
      // response est directement les données (tableau), pas un objet avec .data
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.log('😊 [MoodService] Aucune donnée dans la réponse ou tableau vide')
        return []
      }
      
      const processedData = response.map(item => MoodData.fromAPI(item))
      console.log('😊 [MoodService] Données traitées:', processedData)
      
      return processedData
    } catch (error) {
      console.error('😊 [MoodService] Erreur:', error)
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Créer une nouvelle entrée d'humeur
   * @param {Object} moodData - Données d'humeur
   * @returns {Promise<MoodData>}
   */
  async create(moodData) {
    console.log('[DEBUG] Appel de MoodService.create avec:', moodData);
    // Validation des données
    const errors = DataValidator.validateMood(moodData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const moodModel = new MoodData(moodData)
    
    try {
      const response = await this.post('/mood', moodModel.toAPI())
      console.log('😊 [MoodService] Réponse POST create:', response)
      // Ajout du log debug pour voir la réponse brute
      console.log('[DEBUG] Réponse backend mood:', response, response.data);
      // Vérifier si response a .data ou est directement les données
      console.log('[DEBUG] Réponse brute backend:', response, response.data);
      const responseData = response.data || response
      return MoodData.fromAPI(responseData)
    } catch (error) {
      if (error.message.includes('409')) {
        throw new Error('Des données existent déjà pour cette date')
      }
      throw error
    }
  }

  /**
   * Mettre à jour une entrée d'humeur
   * @param {string} id - ID de l'entrée
   * @param {Object} moodData - Nouvelles données
   * @returns {Promise<MoodData>}
   */
  async update(id, moodData) {
    console.log('[DEBUG] Appel de MoodService.update avec:', id, moodData);
    // Validation des données
    const errors = DataValidator.validateMood(moodData)
    if (errors.length > 0) {
      throw new Error(`Données invalides: ${errors.join(', ')}`)
    }

    const moodModel = new MoodData(moodData)
    try {
      const response = await this.put(`/mood/${id}`, moodModel.toAPI())
      // Ajout du log debug pour voir la réponse brute lors de l'update
      console.log('[DEBUG] Réponse brute backend (update):', response, response.data);
      const responseData = response.data || response;
      if (!responseData) {
        console.error('[MoodService] Réponse vide ou undefined lors de l\'update:', response);
        throw new Error("Aucune donnée d'humeur reçue du backend (update vide)");
      }
      return MoodData.fromAPI(responseData)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Créer ou mettre à jour une entrée d'humeur pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} moodData - Données d'humeur
   * @returns {Promise<MoodData>}
   */
  async createOrUpdate(date, moodData) {
    const existingData = await this.getByDate(date)
    
    const dataWithDate = {
      ...moodData,
      date
    }
    
    if (existingData) {
      return await this.update(existingData.id, dataWithDate)
    } else {
      return await this.create(dataWithDate)
    }
  }

  /**
   * Supprimer une entrée d'humeur
   * @param {string} id - ID de l'entrée
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await this.delete(`/mood/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Entrée non trouvée')
      }
      throw error
    }
  }

  /**
   * Obtenir les statistiques d'humeur
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Object>}
   */
  async getStats(period = 'week') {
    try {
      const response = await this.get('/mood/stats', { period })
      return response.data
    } catch (error) {
      if (error.message.includes('404')) {
        return {
          averageMood: 0,
          averageEnergy: 0,
          totalEntries: 0,
          moodDistribution: {
            awful: 0,
            bad: 0,
            neutral: 0,
            good: 0,
            great: 0
          },
          energyDistribution: {
            sick: 0,
            tired: 0,
            neutral: 0,
            fit: 0,
            energetic: 0
          },
          bestDay: null,
          worstDay: null
        }
      }
      throw error
    }
  }

  /**
   * Obtenir les tendances d'humeur
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Array>}
   */
  async getTrends(days = 30) {
    try {
      const response = await this.get('/mood/trends', { days })
      return response.data || []
    } catch (error) {
      if (error.message.includes('404')) {
        return []
      }
      throw error
    }
  }

  /**
   * Analyser les corrélations entre humeur et autres données
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Object>}
   */
  async getCorrelations(days = 30) {
    try {
      const response = await this.get('/mood/correlations', { days })
      return response.data
    } catch (error) {
      if (error.message.includes('404')) {
        return {
          sleepCorrelation: 0,
          activityCorrelation: 0,
          nutritionCorrelation: 0,
          insights: []
        }
      }
      throw error
    }
  }

  /**
   * Obtenir des recommandations basées sur l'humeur
   * @param {Object} currentMood - Humeur actuelle
   * @returns {Promise<Object>}
   */
  async getRecommendations(currentMood) {
    try {
      const response = await this.post('/mood/recommendations', currentMood)
      return response.data
    } catch (error) {
      // Recommandations par défaut basées sur l'humeur
      const { mood, energy } = currentMood
      
      let recommendations = []
      
      if (mood === 'awful' || mood === 'bad') {
        recommendations.push('Prendre du temps pour soi')
        recommendations.push('Faire une activité relaxante')
        recommendations.push('Parler à un proche')
      }
      
      if (energy === 'sick' || energy === 'tired') {
        recommendations.push('Se reposer davantage')
        recommendations.push('Boire plus d\'eau')
        recommendations.push('Faire une sieste si possible')
      }
      
      if (mood === 'great' && energy === 'energetic') {
        recommendations.push('Profiter de cette énergie positive')
        recommendations.push('Faire une activité physique')
        recommendations.push('Accomplir des tâches importantes')
      }
      
      return {
        recommendations,
        tips: [
          'Tenir un journal de gratitude',
          'Pratiquer la méditation',
          'Faire de l\'exercice régulièrement'
        ]
      }
    }
  }
}

// Instance singleton
export const moodService = new MoodService() 