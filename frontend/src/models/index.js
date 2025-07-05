/**
 * Point d'entrée centralisé pour tous les modèles
 * Exporte tous les modèles depuis leurs fichiers respectifs
 */

// Modèles principaux
export { SleepData } from './SleepData.js'
export { DietData } from './DietData.js'
export { ActivityData } from './ActivityData.js'
export { MoodData } from './MoodData.js'

// Modèles de statistiques
export { WeeklyStats } from './WeeklyStats.js'

// Utilitaires
export { DataValidator } from './DataValidator.js'

// Fonctions utilitaires pour la gestion des erreurs
export function getErrorType(error) {
  if (error.message.includes('404')) return 'NOT_FOUND'
  if (error.message.includes('401')) return 'UNAUTHORIZED'
  if (error.message.includes('403')) return 'FORBIDDEN'
  if (error.message.includes('500')) return 'SERVER_ERROR'
  if (error.message.includes('Network')) return 'NETWORK_ERROR'
  return 'UNKNOWN_ERROR'
}

export function formatErrorMessage(error) {
  const errorType = getErrorType(error)
  
  const messages = {
    'NOT_FOUND': 'Données non trouvées',
    'UNAUTHORIZED': 'Accès non autorisé',
    'FORBIDDEN': 'Opération interdite',
    'SERVER_ERROR': 'Erreur serveur',
    'NETWORK_ERROR': 'Erreur de connexion',
    'UNKNOWN_ERROR': 'Erreur inconnue'
  }
  
  return messages[errorType] || error.message
}

// Constantes utiles
export const SLEEP_QUALITIES = [
  { value: 'poor', emoji: '😴', label: 'Mauvais' },
  { value: 'fair', emoji: '😐', label: 'Correct' },
  { value: 'good', emoji: '🙂', label: 'Bon' },
  { value: 'very_good', emoji: '😊', label: 'Très bon' },
  { value: 'excellent', emoji: '😁', label: 'Excellent' }
]

export const ACTIVITY_INTENSITIES = [
  { value: 'low', emoji: '🚶', label: 'Faible' },
  { value: 'moderate', emoji: '🏃', label: 'Modérée' },
  { value: 'high', emoji: '💪', label: 'Élevée' }
]

export const MOOD_OPTIONS = [
  { value: 'awful', emoji: '😢', label: 'Horrible' },
  { value: 'bad', emoji: '😞', label: 'Mauvais' },
  { value: 'neutral', emoji: '😐', label: 'Neutre' },
  { value: 'good', emoji: '🙂', label: 'Bien' },
  { value: 'great', emoji: '😃', label: 'Excellent' }
]

export const ENERGY_OPTIONS = [
  { value: 'sick', emoji: '🤒', label: 'Malade' },
  { value: 'tired', emoji: '😴', label: 'Fatigué' },
  { value: 'neutral', emoji: '😐', label: 'Neutre' },
  { value: 'fit', emoji: '💪', label: 'En forme' },
  { value: 'energetic', emoji: '⚡', label: 'Énergique' }
] 