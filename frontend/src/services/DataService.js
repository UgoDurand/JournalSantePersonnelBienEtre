import { sleepService } from './SleepService.js'
import { dietService } from './DietService.js'
import { activityService } from './ActivityService.js'
import { moodService } from './MoodService.js'
import { WeeklyStats } from '../models/index.js'

/**
 * Service principal qui coordonne tous les services de données
 * Fournit une interface unifiée pour les pages
 */
export class DataService {
  constructor() {
    this.sleepService = sleepService
    this.dietService = dietService
    this.activityService = activityService
    this.moodService = moodService
  }

  /**
   * ⚠️ REQUÊTES INDIVIDUELLES PAR DATE - À ÉVITER SI POSSIBLE
   * Utilisez plutôt getAllDataForDateRange() depuis Navbar pour éviter la duplication
   *
   * @param {string} date - Date au format YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getAllDataForDate(date) {
    console.warn('⚠️ [DataService] getAllDataForDate() - Requêtes individuelles pour la date:', date)
    console.warn('💡 Conseil: Utilisez les données déjà chargées par getAllDataForDateRange() si possible')
    try {
      const [sleepData, dietData, activityData, moodData] = await Promise.all([
        this.sleepService.getByDate(date),
        this.dietService.getByDate(date),
        this.activityService.getByDate(date),
        this.moodService.getByDate(date)
      ])
      return {
        date,
        sleep: sleepData,
        diet: dietData,
        activity: activityData,
        mood: moodData,
        hasData: !!(
          (sleepData && sleepData.hasRealData) ||
          (dietData && dietData.hasRealData) ||
          (activityData && activityData.length > 0 && activityData.some(a => a.hasRealData)) ||
          (moodData && moodData.hasRealData)
        )
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      throw error
    }
  }

  /**
   * Récupérer toutes les données pour une période
   * @param {string} startDate - Date de début YYYY-MM-DD
   * @param {string} endDate - Date de fin YYYY-MM-DD
   * @returns {Promise<WeeklyStats>}
   */
  async getAllDataForDateRange(startDate, endDate) {
    try {
      console.log('🚀 [DataService] getAllDataForDateRange appelé')
      console.log('📊 [DataService] Période demandée:', startDate, 'à', endDate)
      
      // Récupérer toutes les données en parallèle
      console.log('🔄 [DataService] Lancement des requêtes parallèles...')
      const [sleepData, dietData, activityData, moodData] = await Promise.all([
        this.sleepService.getByDateRange(startDate, endDate),
        this.dietService.getByDateRange(startDate, endDate),
        this.activityService.getByDateRange(startDate, endDate),
        this.moodService.getByDateRange(startDate, endDate)
      ])
      
      console.log('✅ [DataService] Toutes les requêtes terminées')
      console.log('😴 [DataService] Sleep data:', sleepData)
      console.log('🍎 [DataService] Diet data:', dietData)
      console.log('🏃 [DataService] Activity data:', activityData)
      console.log('😊 [DataService] Mood data:', moodData)

      return WeeklyStats.fromAPI({
        startDate,
        endDate,
        sleep: sleepData,
        diet: dietData,
        activity: activityData,
        mood: moodData
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des données de période:', error)
      throw error
    }
  }

  /**
   * Sauvegarder les données de sommeil
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} sleepData - Données de sommeil
   * @returns {Promise<Object>}
   */
  async saveSleepData(date, sleepData) {
    try {
      return await this.sleepService.createOrUpdate(date, sleepData)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du sommeil:', error)
      throw error
    }
  }

  /**
   * Sauvegarder les données d'alimentation
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} dietData - Données d'alimentation
   * @returns {Promise<Object>}
   */
  async saveDietData(date, dietData) {
    try {
      return await this.dietService.createOrUpdate(date, dietData)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'alimentation:', error)
      throw error
    }
  }

  /**
   * Sauvegarder les données d'activité
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} activityData - Données d'activité
   * @returns {Promise<Object>}
   */
  async saveActivityData(date, activityData) {
    try {
      const dataWithDate = { ...activityData, date }
      return await this.activityService.create(dataWithDate)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'activité:', error)
      throw error
    }
  }

  /**
   * Sauvegarder les données d'humeur
   * @param {string} date - Date YYYY-MM-DD
   * @param {Object} moodData - Données d'humeur
   * @returns {Promise<Object>}
   */
  async saveMoodData(date, moodData) {
    try {
      return await this.moodService.createOrUpdate(date, moodData)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'humeur:', error)
      throw error
    }
  }

  /**
   * Obtenir les statistiques générales
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Object>}
   */
  async getGeneralStats(period = 'week') {
    try {
      // Récupérer toutes les stats en parallèle
      const [sleepStats, dietStats, activityStats, moodStats] = await Promise.all([
        this.sleepService.getStats(period),
        this.dietService.getStats(period),
        this.activityService.getStats(period),
        this.moodService.getStats(period)
      ])

      return {
        period,
        sleep: sleepStats,
        diet: dietStats,
        activity: activityStats,
        mood: moodStats,
        generated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      throw error
    }
  }

  /**
   * Obtenir les tendances générales
   * @param {number} days - Nombre de jours à analyser
   * @returns {Promise<Object>}
   */
  async getGeneralTrends(days = 30) {
    try {
      // Récupérer toutes les tendances en parallèle
      const [sleepTrends, dietTrends, activityTrends, moodTrends] = await Promise.all([
        this.sleepService.getTrends(days),
        this.dietService.getTrends(days),
        this.activityService.getTrends(days),
        this.moodService.getTrends(days)
      ])

      return {
        days,
        sleep: sleepTrends,
        diet: dietTrends,
        activity: activityTrends,
        mood: moodTrends,
        generated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tendances:', error)
      throw error
    }
  }

  /**
   * Vérifier si des données existent pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @returns {Promise<boolean>}
   */
  async hasDataForDate(date) {
    try {
      const data = await this.getAllDataForDate(date)
      return data.hasData
    } catch (error) {
      console.error('Erreur lors de la vérification des données:', error)
      return false
    }
  }

  /**
   * Supprimer toutes les données pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @returns {Promise<void>}
   */
  async deleteAllDataForDate(date) {
    try {
      const data = await this.getAllDataForDate(date)
      
      const deletePromises = []
      
      if (data.sleep) {
        deletePromises.push(this.sleepService.delete(data.sleep.id))
      }
      
      if (data.diet) {
        deletePromises.push(this.dietService.delete(data.diet.id))
      }
      
      if (data.activity && data.activity.length > 0) {
        data.activity.forEach(activity => {
          deletePromises.push(this.activityService.delete(activity.id))
        })
      }
      
      if (data.mood) {
        deletePromises.push(this.moodService.delete(data.mood.id))
      }
      
      await Promise.all(deletePromises)
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error)
      throw error
    }
  }

  /**
   * Calculer le score de bien-être pour une date
   * @param {string} date - Date YYYY-MM-DD
   * @returns {Promise<number>}
   */
  async calculateWellnessScore(date) {
    try {
      const data = await this.getAllDataForDate(date)
      
      let score = 0
      let factors = 0
      
      // Score du sommeil (0-25 points)
      if (data.sleep) {
        const sleepScore = this.calculateSleepScore(data.sleep)
        score += sleepScore
        factors++
      }
      
      // Score de l'alimentation (0-25 points)
      if (data.diet) {
        const dietScore = this.calculateDietScore(data.diet)
        score += dietScore
        factors++
      }
      
      // Score de l'activité (0-25 points)
      if (data.activity && data.activity.length > 0) {
        const activityScore = this.calculateActivityScore(data.activity)
        score += activityScore
        factors++
      }
      
      // Score de l'humeur (0-25 points)
      if (data.mood) {
        const moodScore = this.calculateMoodScore(data.mood)
        score += moodScore
        factors++
      }
      
      return factors > 0 ? Math.round(score / factors) : 0
    } catch (error) {
      console.error('Erreur lors du calcul du score de bien-être:', error)
      return 0
    }
  }

  // Méthodes privées pour calculer les scores

  calculateSleepScore(sleep) {
    // Score basé sur la durée et la qualité
    const qualityScores = { 'poor': 5, 'fair': 10, 'good': 18, 'very_good': 22, 'excellent': 25 }
    return qualityScores[sleep.quality] || 15
  }

  calculateDietScore(diet) {
    // Score basé sur l'équilibre nutritionnel
    let score = 0
    
    // Points pour les calories (0-10)
    if (diet.calories >= 1200 && diet.calories <= 2800) score += 10
    else if (diet.calories >= 800 && diet.calories <= 3500) score += 5
    
    // Points pour l'équilibre macro (0-10)
    const macros = diet.macroPercentages
    if (macros.protein >= 15 && macros.protein <= 35) score += 3
    if (macros.carbs >= 30 && macros.carbs <= 65) score += 3
    if (macros.fats >= 20 && macros.fats <= 35) score += 4
    
    // Points pour l'hydratation (0-5)
    if (diet.water >= 1500) score += 5
    else if (diet.water >= 1000) score += 3
    
    return Math.min(score, 25)
  }

  calculateActivityScore(activities) {
    // Score basé sur la durée et l'intensité
    let totalScore = 0
    
    activities.forEach(activity => {
      let activityScore = 0
      
      // Points pour la durée
      if (activity.duration >= 30) activityScore += 15
      else if (activity.duration >= 15) activityScore += 10
      else if (activity.duration >= 5) activityScore += 5
      
      // Points pour l'intensité
      const intensityBonus = { 'low': 2, 'moderate': 5, 'high': 10 }
      activityScore += intensityBonus[activity.intensity] || 0
      
      totalScore += activityScore
    })
    
    return Math.min(totalScore, 25)
  }

  calculateMoodScore(mood) {
    // Score basé sur l'humeur et l'énergie
    const moodScore = mood.moodScore || 0
    const energyScore = mood.energyScore || 0
    
    return Math.round((moodScore + energyScore) / 2 * 2.5)
  }
}

// Instance singleton
export const dataService = new DataService() 