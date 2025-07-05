/**
 * Utilitaire de validation des données
 * Centralise toutes les règles de validation pour les différents types de données
 */

export class DataValidator {
  /**
   * Valide les données de sommeil
   * @param {Object} data - Données de sommeil
   * @returns {Array} Liste des erreurs de validation
   */
  static validateSleep(data) {
    const errors = []

    if (!data.date) {
      errors.push('La date est requise')
    } else if (!this.isValidDate(data.date)) {
      errors.push('La date doit être au format YYYY-MM-DD')
    }

    if (!data.bedtime) {
      errors.push('L\'heure de coucher est requise')
    } else if (!this.isValidTime(data.bedtime)) {
      errors.push('L\'heure de coucher doit être au format HH:MM')
    }

    if (!data.wakeup) {
      errors.push('L\'heure de réveil est requise')
    } else if (!this.isValidTime(data.wakeup)) {
      errors.push('L\'heure de réveil doit être au format HH:MM')
    }

    if (data.bedtime && data.wakeup) {
      const duration = this.calculateSleepDuration(data.bedtime, data.wakeup)
      if (duration < 60) {
        errors.push('La durée de sommeil doit être d\'au moins 1 heure')
      }
      if (duration > 720) {
        errors.push('La durée de sommeil ne peut pas dépasser 12 heures')
      }
    }

    const validQualities = ['poor', 'fair', 'good', 'very_good', 'excellent']
    if (!validQualities.includes(data.quality)) {
      errors.push('La qualité du sommeil doit être l\'une des valeurs suivantes: ' + validQualities.join(', '))
    }

    return errors
  }

  /**
   * Valide les données d'alimentation
   * @param {Object} data - Données d'alimentation
   * @returns {Array} Liste des erreurs de validation
   */
  static validateDiet(data) {
    const errors = []

    if (!data.date) {
      errors.push('La date est requise')
    } else if (!this.isValidDate(data.date)) {
      errors.push('La date doit être au format YYYY-MM-DD')
    }

    if (data.calories !== undefined && data.calories !== null) {
      if (data.calories < 0) {
        errors.push('Les calories ne peuvent pas être négatives')
      }
      if (data.calories > 5000) {
        errors.push('Les calories semblent trop élevées (max 5000)')
      }
    }

    const macroFields = ['protein', 'carbs', 'fats']
    macroFields.forEach(field => {
      if (data[field] !== undefined && data[field] < 0) {
        errors.push(`Les ${field} ne peuvent pas être négatifs`)
      }
    })

    if (data.water !== undefined && data.water !== null) {
      if (data.water < 0) {
        errors.push('La quantité d\'eau ne peut pas être négative')
      }
      if (data.water > 5000) {
        errors.push('La quantité d\'eau semble trop élevée (max 5L)')
      }
    }

    // Vérifier la cohérence des macros avec les calories
    if (data.protein > 0 && data.carbs > 0 && data.fats > 0 && data.calories > 0) {
      const estimatedCalories = (data.protein * 4) + (data.carbs * 4) + (data.fats * 9)
      const difference = Math.abs(data.calories - estimatedCalories)
      if (difference > data.calories * 0.3) {
        errors.push('Les macronutriments ne correspondent pas aux calories déclarées')
      }
    }

    return errors
  }

  /**
   * Valide les données d'activité
   * @param {Object} data - Données d'activité
   * @returns {Array} Liste des erreurs de validation
   */
  static validateActivity(data) {
    const errors = []

    if (!data.date) {
      errors.push('La date est requise')
    } else if (!this.isValidDate(data.date)) {
      errors.push('La date doit être au format YYYY-MM-DD')
    }

    if (!data.name || data.name.trim() === '') {
      errors.push('Le nom de l\'activité est requis')
    }

    if (!data.duration || data.duration <= 0) {
      errors.push('La durée doit être supérieure à 0')
    }

    if (data.duration > 720) {
      errors.push('La durée ne peut pas dépasser 12 heures')
    }

    const validIntensities = ['low', 'moderate', 'high']
    if (!validIntensities.includes(data.intensity)) {
      errors.push('L\'intensité doit être l\'une des valeurs suivantes: ' + validIntensities.join(', '))
    }

    if (data.calories !== undefined && data.calories < 0) {
      errors.push('Les calories ne peuvent pas être négatives')
    }

    if (data.distance !== undefined && data.distance < 0) {
      errors.push('La distance ne peut pas être négative')
    }

    if (data.heartRate !== undefined && data.heartRate !== null) {
      if (data.heartRate < 30 || data.heartRate > 220) {
        errors.push('La fréquence cardiaque doit être entre 30 et 220 bpm')
      }
    }

    if (data.time && !this.isValidTime(data.time)) {
      errors.push('L\'heure doit être au format HH:MM')
    }

    return errors
  }

  /**
   * Valide les données d'humeur
   * @param {Object} data - Données d'humeur
   * @returns {Array} Liste des erreurs de validation
   */
  static validateMood(data) {
    const errors = []

    if (!data.date) {
      errors.push('La date est requise')
    } else if (!this.isValidDate(data.date)) {
      errors.push('La date doit être au format YYYY-MM-DD')
    }

    const validMoods = ['awful', 'bad', 'neutral', 'good', 'great']
    if (!validMoods.includes(data.mood)) {
      errors.push('L\'humeur doit être l\'une des valeurs suivantes: ' + validMoods.join(', '))
    }

    const validEnergyLevels = ['sick', 'tired', 'neutral', 'fit', 'energetic']
    if (!validEnergyLevels.includes(data.energy)) {
      errors.push('Le niveau d\'énergie doit être l\'une des valeurs suivantes: ' + validEnergyLevels.join(', '))
    }

    const validStressLevels = ['very_high', 'high', 'neutral', 'low', 'very_low']
    if (data.stress && !validStressLevels.includes(data.stress)) {
      errors.push('Le niveau de stress doit être l\'une des valeurs suivantes: ' + validStressLevels.join(', '))
    }

    const validAnxietyLevels = ['very_high', 'high', 'neutral', 'low', 'very_low']
    if (data.anxiety && !validAnxietyLevels.includes(data.anxiety)) {
      errors.push('Le niveau d\'anxiété doit être l\'une des valeurs suivantes: ' + validAnxietyLevels.join(', '))
    }

    if (data.notes && data.notes.length > 500) {
      errors.push('Les notes ne peuvent pas dépasser 500 caractères')
    }

    return errors
  }

  /**
   * Valide une date au format YYYY-MM-DD
   * @param {string} date - Date à valider
   * @returns {boolean} True si valide
   */
  static isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) return false
    
    const parsedDate = new Date(date)
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
  }

  /**
   * Valide une heure au format HH:MM
   * @param {string} time - Heure à valider
   * @returns {boolean} True si valide
   */
  static isValidTime(time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

  /**
   * Valide une adresse email
   * @param {string} email - Email à valider
   * @returns {boolean} True si valide
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Calcule la durée de sommeil en minutes
   * @param {string} bedtime - Heure de coucher
   * @param {string} wakeup - Heure de réveil
   * @returns {number} Durée en minutes
   */
  static calculateSleepDuration(bedtime, wakeup) {
    const bedTime = new Date(`2000-01-01 ${bedtime}`)
    let wakeTime = new Date(`2000-01-01 ${wakeup}`)
    
    // Si le réveil est avant le coucher, c'est le lendemain
    if (wakeTime < bedTime) {
      wakeTime.setDate(wakeTime.getDate() + 1)
    }
    
    const diffMs = wakeTime - bedTime
    return Math.floor(diffMs / (1000 * 60))
  }

  /**
   * Valide un objet de données complet
   * @param {Object} data - Données à valider
   * @param {string} type - Type de données ('sleep', 'diet', 'activity', 'mood')
   * @returns {Object} Résultat de validation
   */
  static validateData(data, type) {
    let errors = []

    switch (type) {
      case 'sleep':
        errors = this.validateSleep(data)
        break
      case 'diet':
        errors = this.validateDiet(data)
        break
      case 'activity':
        errors = this.validateActivity(data)
        break
      case 'mood':
        errors = this.validateMood(data)
        break
      default:
        errors = ['Type de données non supporté']
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    }
  }

  /**
   * Valide plusieurs objets de données
   * @param {Array} dataArray - Tableau de données à valider
   * @param {string} type - Type de données
   * @returns {Array} Résultats de validation
   */
  static validateMultipleData(dataArray, type) {
    return dataArray.map((data, index) => ({
      index: index,
      data: data,
      validation: this.validateData(data, type)
    }))
  }

  /**
   * Nettoie et normalise les données
   * @param {Object} data - Données à nettoyer
   * @param {string} type - Type de données
   * @returns {Object} Données nettoyées
   */
  static sanitizeData(data, type) {
    const cleaned = { ...data }

    // Nettoyage commun
    if (cleaned.date) {
      cleaned.date = cleaned.date.trim()
    }

    // Nettoyage spécifique selon le type
    switch (type) {
      case 'sleep':
        if (cleaned.bedtime) cleaned.bedtime = cleaned.bedtime.trim()
        if (cleaned.wakeup) cleaned.wakeup = cleaned.wakeup.trim()
        break
      
      case 'diet': {
        const mealFields = ['breakfast', 'lunch', 'dinner', 'snacks']
        mealFields.forEach(field => {
          if (cleaned[field]) cleaned[field] = cleaned[field].trim()
        })
        break
      }
      
      case 'activity':
        if (cleaned.name) cleaned.name = cleaned.name.trim()
        if (cleaned.time) cleaned.time = cleaned.time.trim()
        if (cleaned.notes) cleaned.notes = cleaned.notes.trim()
        break
      
      case 'mood':
        if (cleaned.notes) cleaned.notes = cleaned.notes.trim()
        break
    }

    return cleaned
  }
} 