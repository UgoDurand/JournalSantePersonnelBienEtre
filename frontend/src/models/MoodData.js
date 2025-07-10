/**
 * Modèle de données pour l'humeur
 * Formate et valide les données d'humeur provenant de l'API
 */
export class MoodData {
  constructor(data = {}) {
    this.id = data.id;
    this.date = data.date;
    this.mood = (data.mood || 'neutral').toLowerCase();
    this.energy = (data.energy || 'neutral').toLowerCase();
    this.stress = (data.stress || 'neutral').toLowerCase();
    this.anxiety = (data.anxiety || 'neutral').toLowerCase();
    this.notes = data.notes || '';
    this.triggers = data.triggers || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Obtient le score de l'humeur
   * @returns {number} Score de 1 à 10
   */
  get moodScore() {
    const scores = { 
      'awful': 2, 
      'bad': 4, 
      'neutral': 6, 
      'good': 8, 
      'great': 10 
    }
    return scores[this.mood.toLowerCase()] || 6
  }

  /**
   * Obtient le score d'énergie
   * @returns {number} Score de 1 à 10
   */
  get energyScore() {
    const scores = { 
      'sick': 1, 
      'tired': 3, 
      'neutral': 5, 
      'fit': 8, 
      'energetic': 10 
    }
    return scores[this.energy.toLowerCase()] || 5
  }

  /**
   * Obtient le score de stress
   * @returns {number} Score de 1 à 10 (1 = très stressé, 10 = détendu)
   */
  get stressScore() {
    const scores = { 
      'very_high': 1, 
      'high': 3, 
      'neutral': 5, 
      'low': 8, 
      'very_low': 10 
    }
    return scores[this.stress.toLowerCase()] || 5
  }

  /**
   * Obtient le score d'anxiété
   * @returns {number} Score de 1 à 10 (1 = très anxieux, 10 = calme)
   */
  get anxietyScore() {
    const scores = { 
      'very_high': 1, 
      'high': 3, 
      'neutral': 5, 
      'low': 8, 
      'very_low': 10 
    }
    return scores[this.anxiety.toLowerCase()] || 5
  }

  /**
   * Obtient l'emoji correspondant à l'humeur
   * @returns {string} Emoji
   */
  get moodEmoji() {
    const emojis = {
      'awful': '😢',
      'bad': '😞',
      'neutral': '😐',
      'good': '🙂',
      'great': '😃'
    }
    return emojis[this.mood.toLowerCase()] || '😐'
  }

  /**
   * Obtient l'emoji correspondant à l'énergie
   * @returns {string} Emoji
   */
  get energyEmoji() {
    const emojis = {
      'sick': '🤒',
      'tired': '😴',
      'neutral': '😐',
      'fit': '💪',
      'energetic': '⚡️'
    }
    return emojis[this.energy.toLowerCase()] || '😐'
  }

  /**
   * Obtient l'emoji correspondant au stress
   * @returns {string} Emoji
   */
  get stressEmoji() {
    const emojis = {
      'very_high': '😰',
      'high': '😟',
      'neutral': '😐',
      'low': '😌',
      'very_low': '😊'
    }
    return emojis[this.stress.toLowerCase()] || '😐'
  }

  /**
   * Obtient l'emoji correspondant à l'anxiété
   * @returns {string} Emoji
   */
  get anxietyEmoji() {
    const emojis = {
      'very_high': '😱',
      'high': '😨',
      'neutral': '😐',
      'low': '😌',
      'very_low': '😇'
    }
    return emojis[this.anxiety.toLowerCase()] || '��'
  }

  /**
   * Obtient le libellé de l'humeur
   * @returns {string} Libellé
   */
  get moodLabel() {
    const labels = {
      'awful': 'Horrible',
      'bad': 'Mauvais',
      'neutral': 'Neutre',
      'good': 'Bien',
      'great': 'Excellent'
    }
    return labels[this.mood.toLowerCase()] || 'Neutre'
  }

  /**
   * Obtient le libellé d'énergie
   * @returns {string} Libellé
   */
  get energyLabel() {
    const labels = {
      'sick': 'Malade',
      'tired': 'Fatigué',
      'neutral': 'Neutre',
      'fit': 'En forme',
      'energetic': 'Énergique'
    }
    return labels[this.energy.toLowerCase()] || 'Neutre'
  }

  /**
   * Obtient le score de bien-être global
   * @returns {number} Score de 1 à 10
   */
  get wellBeingScore() {
    return Math.round((this.moodScore + this.energyScore + this.stressScore + this.anxietyScore) / 4)
  }

  /**
   * Détermine si l'état est préoccupant
   * @returns {boolean} True si préoccupant
   */
  get isWorrying() {
    return this.moodScore <= 4 || this.energyScore <= 3 || this.stressScore <= 3 || this.anxietyScore <= 3
  }

  /**
   * Vérifie si les données sont réellement renseignées (pas seulement les valeurs par défaut)
   * @returns {boolean} True si les données sont renseignées
   */
  get hasRealData() {
    // Si pas de données originales, utiliser les valeurs actuelles
    if (!this._originalApiData) {
      return !!(this.notes && this.notes.trim().length > 0)
    }
    
    // Vérifier les données originales de l'API
    const original = this._originalApiData
    return !!(
      original.moodRating ||
      original.energyLevel ||
      original.stressLevel ||
      original.anxiety ||
      (original.notes && original.notes.trim().length > 0) ||
      (original.triggers && original.triggers.length > 0)
    )
  }

  /**
   * Obtient des recommandations basées sur l'état
   * @returns {Array} Liste de recommandations
   */
  get recommendations() {
    const recommendations = []

    if (this.moodScore <= 4) {
      recommendations.push('Essayez une activité qui vous fait plaisir')
      recommendations.push('Contactez un proche pour parler')
    }

    if (this.energyScore <= 3) {
      recommendations.push('Assurez-vous d\'avoir suffisamment dormi')
      recommendations.push('Faites une courte sieste si possible')
    }

    if (this.stressScore <= 3) {
      recommendations.push('Pratiquez des exercices de respiration')
      recommendations.push('Essayez la méditation ou le yoga')
    }

    if (this.anxietyScore <= 3) {
      recommendations.push('Identifiez les sources d\'anxiété')
      recommendations.push('Pratiquez la relaxation progressive')
    }

    if (recommendations.length === 0) {
      recommendations.push('Continuez ainsi, vous êtes sur la bonne voie !')
    }

    return recommendations
  }

  /**
   * Créer une instance depuis les données API
   * @param {Object} apiData - Données de l'API
   * @returns {MoodData} Instance de MoodData
   */
  static fromAPI(apiData) {
    console.log('[DEBUG][fromAPI] apiData reçu:', apiData);
    if (!apiData) {
      throw new Error("Aucune donnée d'humeur reçue du backend (apiData est vide ou undefined)");
    }
    const moodMap = { 1: 'awful', 2: 'bad', 3: 'neutral', 4: 'good', 5: 'great' };
    const energyMap = { 1: 'sick', 2: 'tired', 3: 'neutral', 4: 'fit', 5: 'energetic' };
    const stressMap = { 1: 'very_high', 2: 'high', 3: 'neutral', 4: 'low', 5: 'very_low' };
    const anxietyMap = { 1: 'very_high', 2: 'high', 3: 'neutral', 4: 'low', 5: 'very_low' };

    const mappedData = {
      id: apiData.id,
      date: apiData.date,
      mood: moodMap[apiData.moodRating ?? 3] || 'neutral',
      energy: energyMap[apiData.energyLevel ?? 3] || 'neutral',
      stress: stressMap[apiData.stressLevel ?? 3] || 'neutral',
      anxiety: anxietyMap[apiData.anxiety ?? 3] || 'neutral',
      notes: apiData.notes ?? '',
      triggers: apiData.triggers ?? [],
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt
    };
    const instance = new MoodData(mappedData);
    instance._originalApiData = apiData;
    return instance;
  }

  /**
   * Convertir vers le format API
   * @returns {Object} Données au format API
   */
  toAPI() {
    const moodMap = { 'awful': 1, 'bad': 2, 'neutral': 3, 'good': 4, 'great': 5 };
    const energyMap = { 'sick': 1, 'tired': 2, 'neutral': 3, 'fit': 4, 'energetic': 5 };
    const stressMap = { 'very_high': 1, 'high': 2, 'neutral': 3, 'low': 4, 'very_low': 5 };
    const anxietyMap = { 'very_high': 1, 'high': 2, 'neutral': 3, 'low': 4, 'very_low': 5 };

    // On force la casse en minuscules pour le mapping
    const mood = (this.mood || '').toLowerCase();
    const energy = (this.energy || '').toLowerCase();
    const stress = (this.stress || '').toLowerCase();
    const anxiety = (this.anxiety || '').toLowerCase();

    return {
      date: this.date,
      moodRating: moodMap[mood] || 3,
      energyLevel: energyMap[energy] || 3,
      stressLevel: stressMap[stress] || 3,
      anxiety: anxietyMap[anxiety] || 3,
      notes: this.notes,
      triggers: this.triggers
    }
  }

  /**
   * Valider les données d'humeur
   * @returns {Array} Liste des erreurs de validation
   */
  validate() {
    const errors = []

    if (!this.date) {
      errors.push('La date est requise')
    }

    const validMoods = ['awful', 'bad', 'neutral', 'good', 'great']
    if (!validMoods.includes(this.mood.toLowerCase())) {
      errors.push('L\'humeur doit être l\'une des valeurs suivantes: ' + validMoods.join(', '))
    }

    const validEnergyLevels = ['sick', 'tired', 'neutral', 'fit', 'energetic']
    if (!validEnergyLevels.includes(this.energy.toLowerCase())) {
      errors.push('Le niveau d\'énergie doit être l\'une des valeurs suivantes: ' + validEnergyLevels.join(', '))
    }

    const validStressLevels = ['very_high', 'high', 'neutral', 'low', 'very_low']
    if (this.stress && !validStressLevels.includes(this.stress.toLowerCase())) {
      errors.push('Le niveau de stress doit être l\'une des valeurs suivantes: ' + validStressLevels.join(', '))
    }

    const validAnxietyLevels = ['very_high', 'high', 'neutral', 'low', 'very_low']
    if (this.anxiety && !validAnxietyLevels.includes(this.anxiety.toLowerCase())) {
      errors.push('Le niveau d\'anxiété doit être l\'une des valeurs suivantes: ' + validAnxietyLevels.join(', '))
    }

    if (this.notes && this.notes.length > 500) {
      errors.push('Les notes ne peuvent pas dépasser 500 caractères')
    }

    return errors
  }
} 