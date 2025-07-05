/**
 * Modèle de données pour le sommeil
 * Formate et valide les données de sommeil provenant de l'API
 */
export class SleepData {
  constructor(data = {}) {
    this.id = data.id || null
    this.date = data.date || new Date().toISOString().split('T')[0]
    this.bedtime = data.bedtime || '22:30'
    this.wakeup = data.wakeup || '06:45'
    this.quality = data.quality || 'good'
    this.duration = data.duration || this.calculateDuration()
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  /**
   * Calcule la durée de sommeil entre l'heure de coucher et de réveil
   * @returns {string} Durée formatée (ex: "8h15")
   */
  calculateDuration() {
    if (!this.bedtime || !this.wakeup) return '0h00'
    
    const bedTime = new Date(`2000-01-01 ${this.bedtime}`)
    let wakeTime = new Date(`2000-01-01 ${this.wakeup}`)
    
    // Si le réveil est avant le coucher, c'est le lendemain
    if (wakeTime < bedTime) {
      wakeTime.setDate(wakeTime.getDate() + 1)
    }
    
    const diffMs = wakeTime - bedTime
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHours}h${diffMinutes.toString().padStart(2, '0')}`
  }

  /**
   * Obtient la durée en minutes
   * @returns {number} Durée en minutes
   */
  get durationInMinutes() {
    if (!this.bedtime || !this.wakeup) return 0
    
    const bedTime = new Date(`2000-01-01 ${this.bedtime}`)
    let wakeTime = new Date(`2000-01-01 ${this.wakeup}`)
    
    if (wakeTime < bedTime) {
      wakeTime.setDate(wakeTime.getDate() + 1)
    }
    
    const diffMs = wakeTime - bedTime
    return Math.floor(diffMs / (1000 * 60))
  }

  /**
   * Obtient le score de qualité du sommeil
   * @returns {number} Score de 1 à 10
   */
  get qualityScore() {
    const scores = {
      'poor': 2,
      'fair': 4,
      'good': 6,
      'very_good': 8,
      'excellent': 10
    }
    return scores[this.quality] || 6
  }

  /**
   * Obtient l'emoji correspondant à la qualité
   * @returns {string} Emoji
   */
  get qualityEmoji() {
    const emojis = {
      'poor': '😴',
      'fair': '😐',
      'good': '🙂',
      'very_good': '😊',
      'excellent': '😁'
    }
    return emojis[this.quality] || '🙂'
  }

  /**
   * Vérifie si les données sont réellement renseignées
   * @returns {boolean} True si les données sont renseignées
   */
  get hasRealData() {
    // Si pas de données originales, utiliser les valeurs actuelles
    if (!this._originalApiData) {
      return !!(this.bedtime && this.wakeup)
    }
    
    // Vérifier les données originales de l'API
    const original = this._originalApiData
    return !!(original.bedtime && original.wakeup)
  }

  /**
   * Créer une instance depuis les données API
   * @param {Object} apiData - Données de l'API
   * @returns {SleepData} Instance de SleepData
   */
  static fromAPI(apiData) {
    const instance = new SleepData(apiData)
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
      bedtime: this.bedtime,
      wakeup: this.wakeup,
      quality: this.quality
    }
  }

  /**
   * Valider les données de sommeil
   * @returns {Array} Liste des erreurs de validation
   */
  validate() {
    const errors = []

    if (!this.date) {
      errors.push('La date est requise')
    }

    if (!this.bedtime) {
      errors.push('L\'heure de coucher est requise')
    }

    if (!this.wakeup) {
      errors.push('L\'heure de réveil est requise')
    }

    if (this.bedtime && this.wakeup) {
      const duration = this.durationInMinutes
      if (duration < 60) {
        errors.push('La durée de sommeil doit être d\'au moins 1 heure')
      }
      if (duration > 720) {
        errors.push('La durée de sommeil ne peut pas dépasser 12 heures')
      }
    }

    const validQualities = ['poor', 'fair', 'good', 'very_good', 'excellent']
    if (!validQualities.includes(this.quality)) {
      errors.push('La qualité du sommeil doit être l\'une des valeurs suivantes: ' + validQualities.join(', '))
    }

    return errors
  }
} 