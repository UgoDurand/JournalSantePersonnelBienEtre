# Corrections des problèmes de dates et requêtes - Frontend

## Problèmes identifiés et corrigés

### 1. Problème de décalage de date (timezone)

**Problème :** 
- L'utilisation de `date.toISOString().split('T')[0]` pouvait causer un décalage d'un jour selon le timezone
- Quand un utilisateur sélectionnait une date, la requête API pouvait être faite pour le jour précédent

**Solution :**
- Création d'un utilitaire `formatDateForAPI()` dans `/utils/dateUtils.js`
- Utilise `date.getFullYear()`, `date.getMonth()`, `date.getDate()` pour éviter les conversions UTC
- Remplacement de toutes les utilisations de `toISOString().split('T')[0]` dans les fichiers suivants :
  - `Mood.vue`
  - `ActivityDetails.vue`
  - `HomePage.vue`
  - `Navbar.vue` (partiellement)

### 2. Amélioration de la gestion des dates

**Nouveaux utilitaires dans `/utils/dateUtils.js` :**
- `formatDateForAPI(date)` - Formate une date pour l'API en local
- `parseDateFromAPI(dateString)` - Parse une date API en évitant les problèmes timezone
- `isSameDay(date1, date2)` - Compare deux dates
- `getToday()`, `getYesterday()` - Dates utilitaires
- `getStartOfWeek()`, `getEndOfWeek()` - Gestion des semaines

### 3. Correction dans les pages

#### Mood.vue
- `loadCurrentMoodData()` : Utilise la date sélectionnée correctement
- `saveMoodData()` : Correction du calcul de la date
- Import et utilisation de `formatDateForAPI`

#### ActivityDetails.vue
- `loadTodayActivities()` : Utilise la date sélectionnée correctement
- `saveActivityData()` : Correction du calcul de la date
- Import et utilisation de `formatDateForAPI`

#### HomePage.vue
- `loadDataForModals()` : Correction du calcul de la date
- `openActivityModal()`, `openMoodModal()` : Correction des liens avec dates
- `saveSleepData()`, `saveDietData()`, `saveActivityData()`, `saveMoodData()` : Corrections des calculs de dates
- Import et utilisation de `formatDateForAPI`

#### Navbar.vue
- `formatDateForInput()` : Nouvelle méthode pour les inputs de date
- Correction des inputs de type date

## Impact

### Avant les corrections :
- Risque de décalage d'un jour selon le timezone de l'utilisateur
- Requêtes API potentiellement incorrectes
- Données sauvegardées/récupérées pour le mauvais jour

### Après les corrections :
- Dates cohérentes en local, pas d'effet timezone
- Requêtes API correctes
- Données sauvegardées/récupérées pour le bon jour
- Code plus maintenable avec utilitaires centralisés

## Tests recommandés

1. **Test de création d'humeur :**
   - Sélectionner une date spécifique
   - Créer une humeur
   - Vérifier qu'elle apparaît bien pour la date sélectionnée

2. **Test de modification d'humeur :**
   - Modifier une humeur existante
   - Vérifier que les modifications sont bien sauvegardées

3. **Test multi-timezone :**
   - Tester depuis différents timezones
   - Vérifier que les dates restent cohérentes

4. **Test de navigation :**
   - Naviguer entre différentes dates
   - Vérifier que les données correspondent aux bonnes dates

## Fichiers modifiés

- ✅ `/frontend/src/utils/dateUtils.js` (nouveau)
- ✅ `/frontend/src/pages/Mood.vue`
- ✅ `/frontend/src/pages/ActivityDetails.vue`
- ✅ `/frontend/src/pages/HomePage.vue`
- ✅ `/frontend/src/components/Navbar.vue`

## Migration

Les anciennes méthodes `formatDateForAPI` locales sont conservées mais marquées comme dépréciées.
Elles redirigent vers l'utilitaire centralisé pour assurer la compatibilité.

## Note

Les problèmes de "mauvaises requêtes" mentionnés par votre collègue étaient principalement liés à ces décalages de dates qui causaient des requêtes sur les mauvais jours.
