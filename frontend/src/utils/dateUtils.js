/**
 * Utilitaires pour la gestion des dates
 * Evite les problèmes de timezone lors des conversions de dates
 */

/**
 * Formate une date au format YYYY-MM-DD pour l'API
 * Utilise l'heure locale pour éviter les décalages de timezone
 * @param {Date} date - Date à formater
 * @returns {string} Date au format YYYY-MM-DD
 */
export function formatDateForAPI(date) {
  if (!date || !(date instanceof Date)) {
    throw new Error('formatDateForAPI: un objet Date valide est requis')
  }
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Crée une date à partir d'une chaîne YYYY-MM-DD en évitant les problèmes de timezone
 * @param {string} dateString - Date au format YYYY-MM-DD
 * @returns {Date} Objet Date
 */
export function parseDateFromAPI(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    throw new Error('parseDateFromAPI: une chaîne de date valide est requise')
  }
  
  const [year, month, day] = dateString.split('-')
  if (!year || !month || !day) {
    throw new Error('parseDateFromAPI: format de date invalide (attendu: YYYY-MM-DD)')
  }
  
  return new Date(Number(year), Number(month) - 1, Number(day))
}

/**
 * Vérifie si deux dates correspondent au même jour
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date
 * @returns {boolean} True si les dates sont le même jour
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return formatDateForAPI(date1) === formatDateForAPI(date2)
}

/**
 * Obtient la date d'aujourd'hui
 * @returns {Date} Date d'aujourd'hui à minuit
 */
export function getToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Obtient la date d'hier
 * @returns {Date} Date d'hier à minuit
 */
export function getYesterday() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)
  return yesterday
}

/**
 * Calcule la différence en jours entre deux dates
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date
 * @returns {number} Nombre de jours de différence
 */
export function daysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000 // heures*minutes*secondes*millisecondes
  return Math.round((date1 - date2) / oneDay)
}

/**
 * Obtient le début de la semaine (lundi) pour une date donnée
 * @param {Date} date - Date de référence
 * @returns {Date} Date du début de la semaine
 */
export function getStartOfWeek(date) {
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Lundi comme premier jour
  startOfWeek.setDate(diff)
  startOfWeek.setHours(0, 0, 0, 0)
  return startOfWeek
}

/**
 * Obtient la fin de la semaine (dimanche) pour une date donnée
 * @param {Date} date - Date de référence
 * @returns {Date} Date de fin de la semaine
 */
export function getEndOfWeek(date) {
  const startOfWeek = getStartOfWeek(date)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  return endOfWeek
}
