/**
 * Modèle de données pour l'alimentation
 * Formate et valide les données d'alimentation provenant de l'API
 */
export class DietData {
  constructor(data = {}) {
    this.id = data.id || null
    this.date = data.date || new Date().toISOString().split('T')[0]
    this.breakfast = data.breakfast || ''
    this.lunch = data.lunch || ''
    this.dinner = data.dinner || ''
    this.snacks = data.snacks || ''
    this.calories = data.calories || 0
    this.protein = data.protein || 0
    this.carbs = data.carbs || 0
    this.fats = data.fats || 0
    this.water = data.water || 0
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  /**
   * Obtient le total des macronutriments
   * @returns {number} Total en grammes
   */
  get totalMacros() {
    return this.protein + this.carbs + this.fats
  }

  /**
   * Obtient les pourcentages des macronutriments
   * @returns {Object} Pourcentages des macros
   */
  get macroPercentages() {
    const total = this.totalMacros
    if (total === 0) return { protein: 0, carbs: 0, fats: 0 }
    
    return {
      protein: Math.round((this.protein / total) * 100),
      carbs: Math.round((this.carbs / total) * 100),
      fats: Math.round((this.fats / total) * 100)
    }
  }

  /**
   * Obtient le nombre de verres d'eau
   * @returns {number} Nombre de verres (250ml chacun)
   */
  get waterGlasses() {
    return Math.floor(this.water / 250)
  }

  /**
   * Obtient le nombre de calories par repas
   * @returns {Object} Répartition des calories
   */
  get caloriesByMeal() {
    // Estimation basée sur les repas renseignés
    const meals = [this.breakfast, this.lunch, this.dinner, this.snacks].filter(meal => meal.trim())
    const caloriesPerMeal = meals.length > 0 ? Math.round(this.calories / meals.length) : 0
    
    return {
      breakfast: this.breakfast ? caloriesPerMeal : 0,
      lunch: this.lunch ? caloriesPerMeal : 0,
      dinner: this.dinner ? caloriesPerMeal : 0,
      snacks: this.snacks ? caloriesPerMeal : 0
    }
  }

  /**
   * Vérifie si l'hydratation est suffisante
   * @returns {boolean} True si hydratation suffisante
   */
  get isHydrationAdequate() {
    return this.water >= 1500 // 1.5L minimum recommandé
  }

  /**
   * Obtient le score nutritionnel global
   * @returns {number} Score de 1 à 10
   */
  get nutritionScore() {
    let score = 0
    
    // Points pour les repas équilibrés
    if (this.breakfast) score += 2
    if (this.lunch) score += 2
    if (this.dinner) score += 2
    
    // Points pour l'hydratation
    if (this.isHydrationAdequate) score += 2
    
    // Points pour les macros équilibrés
    const macros = this.macroPercentages
    if (macros.protein >= 15 && macros.protein <= 35) score += 1
    if (macros.carbs >= 45 && macros.carbs <= 65) score += 1
    
    return Math.min(score, 10)
  }

  /**
   * Vérifie si les données sont réellement renseignées
   * @returns {boolean} True si les données sont renseignées
   */
  get hasRealData() {
    // Si pas de données originales, utiliser les valeurs actuelles
    if (!this._originalApiData) {
      return !!(
        (this.breakfast && this.breakfast.trim()) ||
        (this.lunch && this.lunch.trim()) ||
        (this.dinner && this.dinner.trim()) ||
        (this.snacks && this.snacks.trim()) ||
        this.calories > 0 ||
        this.water > 0
      )
    }
    
    // Vérifier les données originales de l'API
    const original = this._originalApiData
    const waterValue = original.waterIntake || original.water || 0
    return !!(
      (original.breakfast && original.breakfast.trim()) ||
      (original.lunch && original.lunch.trim()) ||
      (original.dinner && original.dinner.trim()) ||
      (original.snacks && original.snacks.trim()) ||
      original.calories > 0 ||
      waterValue > 0
    )
  }

  /**
   * Créer une instance depuis les données API
   * @param {Object} apiData - Données de l'API
   * @returns {DietData} Instance de DietData
   */
  static fromAPI(apiData) {
    // Mapper waterIntake vers water si nécessaire
    const normalizedData = {
      ...apiData,
      water: apiData.waterIntake || apiData.water || 0
    }
    
    const instance = new DietData(normalizedData)
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
      breakfast: this.breakfast,
      lunch: this.lunch,
      dinner: this.dinner,
      snacks: this.snacks,
      calories: this.calories,
      protein: this.protein,
      carbs: this.carbs,
      fats: this.fats,
      waterIntake: this.water  // Mapping vers waterIntake pour l'API
    }
  }

  /**
   * Valider les données d'alimentation
   * @returns {Array} Liste des erreurs de validation
   */
  validate() {
    const errors = []

    if (!this.date) {
      errors.push('La date est requise')
    }

    if (this.calories < 0) {
      errors.push('Les calories ne peuvent pas être négatives')
    }

    if (this.calories > 5000) {
      errors.push('Les calories semblent trop élevées (max 5000)')
    }

    if (this.protein < 0 || this.carbs < 0 || this.fats < 0) {
      errors.push('Les macronutriments ne peuvent pas être négatifs')
    }

    if (this.water < 0) {
      errors.push('La quantité d\'eau ne peut pas être négative')
    }

    if (this.water > 5000) {
      errors.push('La quantité d\'eau semble trop élevée (max 5L)')
    }

    // Vérifier la cohérence des macros avec les calories
    if (this.totalMacros > 0 && this.calories > 0) {
      const estimatedCalories = (this.protein * 4) + (this.carbs * 4) + (this.fats * 9)
      const difference = Math.abs(this.calories - estimatedCalories)
      if (difference > this.calories * 0.3) {
        errors.push('Les macronutriments ne correspondent pas aux calories déclarées')
      }
    }

    return errors
  }
} 