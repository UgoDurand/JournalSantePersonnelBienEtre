// Services principaux
export { BaseService } from './BaseService.js'
export { DataService, dataService } from './DataService.js'

// Services spécialisés
export { SleepService, sleepService } from './SleepService.js'
export { DietService, dietService } from './DietService.js'
export { ActivityService, activityService } from './ActivityService.js'
export { MoodService, moodService } from './MoodService.js'

// Service d'authentification
export { authService } from './auth.js'

// Utilitaires pour les erreurs
export const ErrorTypes = {
  NETWORK: 'network',
  AUTH: 'auth',
  VALIDATION: 'validation',
  GENERAL: 'general'
}

export const LoadingTypes = {
  SPINNER: 'spinner',
  DOTS: 'dots',
  SKELETON: 'skeleton',
  PULSE: 'pulse',
  PROGRESS: 'progress',
  ICON: 'icon'
}

/**
 * Fonction utilitaire pour déterminer le type d'erreur
 * @param {Error} error - L'erreur à analyser
 * @returns {string} - Le type d'erreur
 */
export function getErrorType(error) {
  if (!error) return ErrorTypes.GENERAL
  
  const message = error.message?.toLowerCase() || ''
  
  if (message.includes('session expirée') || message.includes('401')) {
    return ErrorTypes.AUTH
  }
  
  if (message.includes('network') || message.includes('fetch') || message.includes('connexion')) {
    return ErrorTypes.NETWORK
  }
  
  if (message.includes('données invalides') || message.includes('validation')) {
    return ErrorTypes.VALIDATION
  }
  
  return ErrorTypes.GENERAL
}

/**
 * Fonction utilitaire pour formater les messages d'erreur
 * @param {Error} error - L'erreur à formater
 * @returns {string} - Le message formaté
 */
export function formatErrorMessage(error) {
  if (!error) return 'Une erreur inattendue est survenue'
  
  // Messages d'erreur personnalisés
  const message = error.message || ''
  
  if (message.includes('Session expirée')) {
    return 'Votre session a expiré. Veuillez vous reconnecter.'
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.'
  }
  
  if (message.includes('404')) {
    return 'Les données demandées n\'ont pas été trouvées.'
  }
  
  if (message.includes('500')) {
    return 'Erreur du serveur. Veuillez réessayer plus tard.'
  }
  
  return message || 'Une erreur inattendue est survenue'
} 