/**
 * Modèle de données pour les statistiques hebdomadaires
 * Agrège et analyse les données de santé sur une période donnée
 */
import { SleepData } from './SleepData.js'
import { DietData } from './DietData.js'
import { ActivityData } from './ActivityData.js'
import { MoodData } from './MoodData.js'

export class WeeklyStats {
  constructor(data = {}) {
    this.startDate = data.startDate || ''
    this.endDate = data.endDate || ''
    this.sleep = data.sleep || []
    this.diet = data.diet || []
    this.activity = data.activity || []
    this.mood = data.mood || []
  }

  /**
   * Obtient les statistiques de sommeil
   * @returns {Object} Statistiques de sommeil
   */
  get sleepStats() {
    if (this.sleep.length === 0) {
      return {
        averageDuration: 0,
        averageQuality: 0,
        totalNights: 0,
        bestNight: null,
        worstNight: null,
        sleepDebt: 0
      }
    }

    const durations = this.sleep.map(s => s.durationInMinutes)
    const qualities = this.sleep.map(s => s.qualityScore)
    
    const averageDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length
    const averageQuality = qualities.reduce((sum, q) => sum + q, 0) / qualities.length
    
    const bestNight = this.sleep.reduce((best, current) => 
      current.qualityScore > best.qualityScore ? current : best
    )
    
    const worstNight = this.sleep.reduce((worst, current) => 
      current.qualityScore < worst.qualityScore ? current : worst
    )

    // Calcul de la dette de sommeil (basé sur 8h recommandées)
    const recommendedMinutes = 8 * 60
    const sleepDebt = Math.max(0, (recommendedMinutes * this.sleep.length) - durations.reduce((sum, d) => sum + d, 0))

    return {
      averageDuration: Math.round(averageDuration),
      averageQuality: Math.round(averageQuality * 10) / 10,
      totalNights: this.sleep.length,
      bestNight,
      worstNight,
      sleepDebt: Math.round(sleepDebt)
    }
  }

  /**
   * Obtient les statistiques d'alimentation
   * @returns {Object} Statistiques d'alimentation
   */
  get dietStats() {
    if (this.diet.length === 0) {
      return {
        averageCalories: 0,
        averageWater: 0,
        nutritionScore: 0,
        bestDay: null,
        macroBalance: { protein: 0, carbs: 0, fats: 0 },
        hydrationDays: 0
      }
    }

    const calories = this.diet.map(d => d.calories)
    const water = this.diet.map(d => d.water)
    const nutritionScores = this.diet.map(d => d.nutritionScore)
    
    const averageCalories = calories.reduce((sum, c) => sum + c, 0) / calories.length
    const averageWater = water.reduce((sum, w) => sum + w, 0) / water.length
    const nutritionScore = nutritionScores.reduce((sum, s) => sum + s, 0) / nutritionScores.length
    
    const bestDay = this.diet.reduce((best, current) => 
      current.nutritionScore > best.nutritionScore ? current : best
    )

    // Calcul de l'équilibre moyen des macros
    const macroBalance = this.diet.reduce((acc, d) => {
      const macros = d.macroPercentages
      acc.protein += macros.protein
      acc.carbs += macros.carbs
      acc.fats += macros.fats
      return acc
    }, { protein: 0, carbs: 0, fats: 0 })

    Object.keys(macroBalance).forEach(key => {
      macroBalance[key] = Math.round(macroBalance[key] / this.diet.length)
    })

    const hydrationDays = this.diet.filter(d => d.isHydrationAdequate).length

    return {
      averageCalories: Math.round(averageCalories),
      averageWater: Math.round(averageWater),
      nutritionScore: Math.round(nutritionScore * 10) / 10,
      bestDay,
      macroBalance,
      hydrationDays
    }
  }

  /**
   * Obtient les statistiques d'activité
   * @returns {Object} Statistiques d'activité
   */
  get activityStats() {
    if (this.activity.length === 0) {
      return {
        totalActivities: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageDuration: 0,
        mostFrequentActivity: null,
        intensityBreakdown: { low: 0, moderate: 0, high: 0 },
        activeDays: 0
      }
    }

    const totalDuration = this.activity.reduce((sum, a) => sum + a.duration, 0)
    const totalCalories = this.activity.reduce((sum, a) => sum + a.estimatedCalories, 0)
    const averageDuration = totalDuration / this.activity.length

    // Activité la plus fréquente
    const activityCounts = this.activity.reduce((acc, a) => {
      acc[a.name] = (acc[a.name] || 0) + 1
      return acc
    }, {})
    
    const mostFrequentActivity = Object.entries(activityCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || null

    // Répartition des intensités
    const intensityBreakdown = this.activity.reduce((acc, a) => {
      acc[a.intensity] = (acc[a.intensity] || 0) + 1
      return acc
    }, { low: 0, moderate: 0, high: 0 })

    // Jours actifs (dates uniques)
    const activeDays = new Set(this.activity.map(a => a.date)).size

    return {
      totalActivities: this.activity.length,
      totalDuration: Math.round(totalDuration),
      totalCalories: Math.round(totalCalories),
      averageDuration: Math.round(averageDuration),
      mostFrequentActivity,
      intensityBreakdown,
      activeDays
    }
  }

  /**
   * Obtient les statistiques d'humeur
   * @returns {Object} Statistiques d'humeur
   */
  get moodStats() {
    if (this.mood.length === 0) {
      return {
        averageMood: 0,
        averageEnergy: 0,
        wellBeingScore: 0,
        bestDay: null,
        worstDay: null,
        worryingDays: 0,
        moodTrend: 'stable'
      }
    }

    const moodScores = this.mood.map(m => m.moodScore)
    const energyScores = this.mood.map(m => m.energyScore)
    const wellBeingScores = this.mood.map(m => m.wellBeingScore)
    
    const averageMood = moodScores.reduce((sum, s) => sum + s, 0) / moodScores.length
    const averageEnergy = energyScores.reduce((sum, s) => sum + s, 0) / energyScores.length
    const wellBeingScore = wellBeingScores.reduce((sum, s) => sum + s, 0) / wellBeingScores.length
    
    const bestDay = this.mood.reduce((best, current) => 
      current.wellBeingScore > best.wellBeingScore ? current : best
    )
    
    const worstDay = this.mood.reduce((worst, current) => 
      current.wellBeingScore < worst.wellBeingScore ? current : worst
    )

    const worryingDays = this.mood.filter(m => m.isWorrying).length

    // Calcul de la tendance
    let moodTrend = 'stable'
    if (this.mood.length >= 3) {
      const firstHalf = this.mood.slice(0, Math.floor(this.mood.length / 2))
      const secondHalf = this.mood.slice(Math.floor(this.mood.length / 2))
      
      const firstAvg = firstHalf.reduce((sum, m) => sum + m.wellBeingScore, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((sum, m) => sum + m.wellBeingScore, 0) / secondHalf.length
      
      const diff = secondAvg - firstAvg
      if (diff > 0.5) moodTrend = 'improving'
      else if (diff < -0.5) moodTrend = 'declining'
    }

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      averageEnergy: Math.round(averageEnergy * 10) / 10,
      wellBeingScore: Math.round(wellBeingScore * 10) / 10,
      bestDay,
      worstDay,
      worryingDays,
      moodTrend
    }
  }

  /**
   * Obtient le score de santé global
   * @returns {number} Score de 1 à 10
   */
  get overallHealthScore() {
    const sleepScore = this.sleepStats.averageQuality
    const dietScore = this.dietStats.nutritionScore
    const activityScore = this.activity.length > 0 ? 
      this.activity.reduce((sum, a) => sum + a.activityScore, 0) / this.activity.length : 0
    const moodScore = this.moodStats.wellBeingScore

    const scores = [sleepScore, dietScore, activityScore, moodScore].filter(s => s > 0)
    return scores.length > 0 ? Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10 : 0
  }

  /**
   * Obtient des insights basés sur les données
   * @returns {Array} Liste d'insights
   */
  get insights() {
    const insights = []
    
    const sleepStats = this.sleepStats
    const dietStats = this.dietStats
    const activityStats = this.activityStats
    const moodStats = this.moodStats

    // Insights sommeil
    if (sleepStats.averageDuration < 420) { // moins de 7h
      insights.push({
        type: 'warning',
        category: 'sleep',
        message: 'Votre temps de sommeil moyen est insuffisant. Visez 7-9h par nuit.'
      })
    }

    if (sleepStats.sleepDebt > 120) { // plus de 2h de dette
      insights.push({
        type: 'warning',
        category: 'sleep',
        message: `Vous avez une dette de sommeil de ${Math.round(sleepStats.sleepDebt / 60)}h. Rattrapez-vous !`
      })
    }

    // Insights alimentation
    if (dietStats.hydrationDays < this.diet.length * 0.7) {
      insights.push({
        type: 'warning',
        category: 'diet',
        message: 'Vous ne buvez pas assez d\'eau. Visez au moins 1,5L par jour.'
      })
    }

    // Insights activité
    if (activityStats.totalDuration < 150) { // moins de 150min par semaine
      insights.push({
        type: 'warning',
        category: 'activity',
        message: 'Vous n\'atteignez pas les 150min d\'activité hebdomadaire recommandées.'
      })
    }

    // Insights humeur
    if (moodStats.worryingDays > 2) {
      insights.push({
        type: 'warning',
        category: 'mood',
        message: 'Votre bien-être semble préoccupant plusieurs jours. Consultez un professionnel si nécessaire.'
      })
    }

    // Insights positifs
    if (moodStats.moodTrend === 'improving') {
      insights.push({
        type: 'positive',
        category: 'mood',
        message: 'Votre humeur s\'améliore ! Continuez sur cette voie.'
      })
    }

    if (activityStats.activeDays >= 5) {
      insights.push({
        type: 'positive',
        category: 'activity',
        message: 'Excellent ! Vous êtes actif presque tous les jours.'
      })
    }

    return insights
  }

  /**
   * Créer une instance depuis les données API
   * @param {Object} apiData - Données de l'API
   * @returns {WeeklyStats} Instance de WeeklyStats
   */
  static fromAPI(apiData) {
    return new WeeklyStats({
      ...apiData,
      sleep: apiData.sleep?.map(item => SleepData.fromAPI(item)) || [],
      diet: apiData.diet?.map(item => DietData.fromAPI(item)) || [],
      activity: apiData.activity?.map(item => ActivityData.fromAPI(item)) || [],
      mood: apiData.mood?.map(item => MoodData.fromAPI(item)) || []
    })
  }

  /**
   * Convertir vers le format API
   * @returns {Object} Données au format API
   */
  toAPI() {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      sleep: this.sleep.map(item => item.toAPI()),
      diet: this.diet.map(item => item.toAPI()),
      activity: this.activity.map(item => item.toAPI()),
      mood: this.mood.map(item => item.toAPI())
    }
  }
} 