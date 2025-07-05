/**
 * Modèle de données pour les activités physiques
 * Formate et valide les données d'activité provenant de l'API
 */
export class ActivityData {
  constructor(data = {}) {
    this.id = data.id || null
    this.date = data.date || new Date().toISOString().split('T')[0]
    this.name = data.name || ''
    this.duration = data.duration || 0
    this.time = data.time || '08:00'
    this.intensity = data.intensity || 'moderate'
    this.calories = data.calories || 0
    this.distance = data.distance || 0
    this.heartRate = data.heartRate || null
    this.notes = data.notes || ''
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  /**
   * Obtient le libellé de l'intensité
   * @returns {string} Libellé de l'intensité
   */
  get intensityLabel() {
    const labels = {
      low: 'Faible',
      moderate: 'Modérée',
      high: 'Élevée'
    }
    return labels[this.intensity] || 'Modérée'
  }

  /**
   * Obtient l'emoji correspondant à l'intensité
   * @returns {string} Emoji
   */
  get intensityEmoji() {
    const emojis = {
      low: '🚶',
      moderate: '🏃',
      high: '💪'
    }
    return emojis[this.intensity] || '🏃'
  }

  /**
   * Obtient la durée formatée
   * @returns {string} Durée formatée (ex: "1h30min")
   */
  get durationFormatted() {
    if (this.duration < 60) {
      return `${this.duration}min`
    }
    const hours = Math.floor(this.duration / 60)
    const minutes = this.duration % 60
    return minutes > 0 ? `${hours}h${minutes}min` : `${hours}h`
  }

  /**
   * Obtient la vitesse moyenne si distance renseignée
   * @returns {number|null} Vitesse en km/h
   */
  get averageSpeed() {
    if (!this.distance || !this.duration) return null
    return Math.round((this.distance / (this.duration / 60)) * 100) / 100
  }

  /**
   * Obtient le rythme moyen (min/km) si distance renseignée
   * @returns {string|null} Rythme formaté
   */
  get averagePace() {
    if (!this.distance || !this.duration) return null
    const paceMinutes = this.duration / this.distance
    const minutes = Math.floor(paceMinutes)
    const seconds = Math.round((paceMinutes - minutes) * 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`
  }

  /**
   * Estime les calories brûlées si non renseignées
   * @returns {number} Calories estimées
   */
  get estimatedCalories() {
    if (this.calories > 0) return this.calories
    
    const intensityMultiplier = {
      low: 3,
      moderate: 5,
      high: 8
    }
    
    return Math.round(this.duration * (intensityMultiplier[this.intensity] || 5))
  }

  /**
   * Obtient le score d'activité
   * @returns {number} Score de 1 à 10
   */
  get activityScore() {
    let score = 0
    
    // Points pour la durée
    if (this.duration >= 30) score += 4
    else if (this.duration >= 15) score += 2
    else if (this.duration >= 5) score += 1
    
    // Points pour l'intensité
    if (this.intensity === 'high') score += 4
    else if (this.intensity === 'moderate') score += 3
    else score += 2
    
    // Points pour la régularité (si fréquence cardiaque)
    if (this.heartRate) score += 2
    
    return Math.min(score, 10)
  }

  /**
   * Détermine la zone de fréquence cardiaque
   * @param {number} age - Âge de l'utilisateur
   * @returns {string|null} Zone de FC
   */
  getHeartRateZone(age = 30) {
    if (!this.heartRate) return null
    
    const maxHR = 220 - age
    const percentage = (this.heartRate / maxHR) * 100
    
    if (percentage < 50) return 'Zone de récupération'
    if (percentage < 60) return 'Zone de base'
    if (percentage < 70) return 'Zone aérobie'
    if (percentage < 80) return 'Zone seuil'
    if (percentage < 90) return 'Zone VO2 max'
    return 'Zone neuromusculaire'
  }

  /**
   * Vérifie si les données sont réellement renseignées
   * @returns {boolean} True si les données sont renseignées
   */
  get hasRealData() {
    // Si pas de données originales, utiliser les valeurs actuelles
    if (!this._originalApiData) {
      return !!(this.name && this.name.trim() && this.duration > 0)
    }
    
    // Vérifier les données originales de l'API
    const original = this._originalApiData
    return !!(original.name && original.name.trim() && original.duration > 0)
  }

  /**
   * Créer une instance depuis les données API
   * @param {Object} apiData - Données de l'API
   * @returns {ActivityData} Instance de ActivityData
   */
  static fromAPI(apiData) {
    const instance = new ActivityData(apiData)
    // Stocker les données originales pour vérifier si elles sont réellement renseignées
    instance._originalApiData = apiData
    return instance
  }

  /**
   * Convertir vers le format API
   * @returns {Object} Données au format API
   */
  toAPI() {
    return {
      date: this.date,
      name: this.name,
      duration: this.duration,
      time: this.time,
      intensity: this.intensity,
      calories: this.calories,
      distance: this.distance,
      heartRate: this.heartRate,
      notes: this.notes
    }
  }

  /**
   * Valider les données d'activité
   * @returns {Array} Liste des erreurs de validation
   */
  validate() {
    const errors = []

    if (!this.date) {
      errors.push('La date est requise')
    }

    if (!this.name || this.name.trim() === '') {
      errors.push('Le nom de l\'activité est requis')
    }

    if (!this.duration || this.duration <= 0) {
      errors.push('La durée doit être supérieure à 0')
    }

    if (this.duration > 720) {
      errors.push('La durée ne peut pas dépasser 12 heures')
    }

    const validIntensities = ['low', 'moderate', 'high']
    if (!validIntensities.includes(this.intensity)) {
      errors.push('L\'intensité doit être l\'une des valeurs suivantes: ' + validIntensities.join(', '))
    }

    if (this.calories < 0) {
      errors.push('Les calories ne peuvent pas être négatives')
    }

    if (this.distance < 0) {
      errors.push('La distance ne peut pas être négative')
    }

    if (this.heartRate && (this.heartRate < 30 || this.heartRate > 220)) {
      errors.push('La fréquence cardiaque doit être entre 30 et 220 bpm')
    }

    // Validation de l'heure
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(this.time)) {
      errors.push('L\'heure doit être au format HH:MM')
    }

    return errors
  }
} 