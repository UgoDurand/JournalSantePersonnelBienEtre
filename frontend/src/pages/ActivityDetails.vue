<template>
  <main class="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
    <!-- Header héroïque -->
    <div class="bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-16 left-20 w-28 h-28 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-16 w-20 h-20 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-16 left-1/3 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse" style="animation-delay: 1.5s;"></div>
      </div>
      
      <div class="relative p-6 sm:p-8 lg:p-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-6 lg:mb-0">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold mb-2">Performance Sportive</h1>
                <p class="text-orange-100 text-lg">Votre activité physique aujourd'hui</p>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
              <p class="text-orange-100 text-sm mb-2">💪 Suivi d'activité</p>
              <p class="text-white text-xl font-semibold">Ajoutez et suivez vos séances pour progresser chaque jour !</p>
            </div>
          </div>
          <button @click="openActivityModal" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Ajouter une activité
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 lg:p-12 space-y-8">
      <!-- Focus du jour et nombre d'activités -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Focus du jour dynamique -->
        <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-lg border border-orange-200 flex flex-col justify-center min-h-[340px]">
          <div class="flex items-center justify-between mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
              <span v-if="validTodayActivities.length === 0">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span v-else-if="validTodayActivities.length < 3 && totalCalories < 400">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              <span v-else-if="validTodayActivities.length >= 3 && totalCalories >= 400">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span v-else>
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
                </svg>
              </span>
            </div>
            <span class="text-5xl">🎯</span>
          </div>
          <h3 class="text-3xl font-bold text-gray-800 mb-6 text-center">Focus du Jour</h3>
          <div class="flex-1 flex items-center justify-center">
            <div v-if="validTodayActivities.length === 0" class="w-full">
              <p class="text-gray-700 text-2xl text-center leading-relaxed font-medium">Aucune activité enregistrée aujourd'hui.<br>Commencez par ajouter une activité pour atteindre vos objectifs !</p>
            </div>
            <div v-else-if="validTodayActivities.length < 3 && totalCalories < 400" class="w-full">
              <p class="text-gray-700 text-2xl text-center leading-relaxed font-medium">Vous avez effectué {{ validTodayActivities.length }} activité{{ validTodayActivities.length > 1 ? 's' : '' }}.<br>Continuez pour atteindre l'objectif de <b>3 activités</b> et <b>400 kcal</b> !</p>
            </div>
            <div v-else-if="validTodayActivities.length >= 3 && totalCalories >= 400" class="w-full">
              <p class="text-green-700 text-2xl text-center leading-relaxed font-semibold">Bravo ! Objectifs du jour atteints 🎉<br>{{ validTodayActivities.length }} activités, {{ totalCalories }} kcal brûlées.</p>
            </div>
            <div v-else-if="validTodayActivities.length >= 3" class="w-full">
              <p class="text-orange-700 text-2xl text-center leading-relaxed font-medium">Nombre d'activités atteint ({{ validTodayActivities.length }}),<br>essayez d'atteindre aussi <b>400 kcal</b> !</p>
            </div>
            <div v-else class="w-full">
              <p class="text-orange-700 text-2xl text-center leading-relaxed font-medium">Objectif calories atteint ({{ totalCalories }} kcal),<br>essayez d'atteindre aussi <b>3 activités</b> !</p>
            </div>
          </div>
        </div>

        <!-- Nombre d'activités effectuées -->
        <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg border border-blue-200">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span class="text-4xl">📊</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">Activités du Jour</h3>
          
          <div class="text-center mb-6">
            <div class="text-6xl font-bold text-blue-600 mb-2">{{ validTodayActivities.length }}</div>
            <p class="text-gray-600 text-lg">activité{{ validTodayActivities.length > 1 ? 's' : '' }} effectuée{{ validTodayActivities.length > 1 ? 's' : '' }}</p>
          </div>

          <div class="space-y-4">
            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-blue-700">Durée Totale</span>
                <span class="text-lg font-bold text-blue-600">{{ totalDuration }} min</span>
              </div>
              <div class="w-full bg-blue-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: Math.min((totalDuration / 60) * 100, 100) + '%' }"></div>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-purple-700">Calories Brûlées</span>
                <span class="text-lg font-bold text-purple-600">{{ totalCalories !== null ? totalCalories : 0 }} kcal</span>
              </div>
              <div class="w-full bg-purple-200 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" :style="{ width: Math.min((totalCalories || 0) / 400 * 100, 100) + '%' }"></div>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-green-700">Intensité Max</span>
                <span class="text-lg font-bold text-green-600">{{ maxIntensity }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-green-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" :style="{ width: maxIntensity === 'Faible' ? '33%' : maxIntensity === 'Modérée' ? '66%' : '100%' }"></div>
                </div>
                <span class="text-xs text-gray-500">{{ maxIntensity === 'Faible' ? 'Faible' : maxIntensity === 'Modérée' ? 'Modérée' : 'Élevée' }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 text-center">
            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium">
              <span class="mr-2">🎯</span>
              Objectif : 3 activités/jour
            </div>
          </div>
        </div>
      </div>

      <!-- Activités détaillées -->
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Séances d'Aujourd'hui
            </h2>

            <div v-if="isLoading" class="flex justify-center items-center min-h-[100px]">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
            <div v-else>
              <!-- Liste des activités du jour -->
              <div v-if="validTodayActivities.length > 0" class="mt-6 space-y-4">
                <div v-for="activity in validTodayActivities" :key="activity.id" class="p-6 bg-blue-50 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-400">
                  <div class="flex-1 flex flex-col sm:flex-row sm:items-center">
                    <h3 class="font-bold text-blue-700 text-xl flex items-center mb-2 sm:mb-0">
                      <span class="text-2xl mr-2">🏃‍♂️</span>
                      {{ activity.activityType || 'Activité' }}
                    </h3>
                    <div class="flex flex-col sm:flex-row sm:items-center sm:ml-8 text-base text-blue-900 font-semibold">
                      <span class="mr-6"><b>Durée :</b> {{ activity.duration }} min</span>
                      <span class="mr-6"><b>Heure :</b> {{ activity.time ? activity.time : '--:--' }}</span>
                      <span><b>Intensité :</b> {{ activity.intensity }}</span>
                    </div>
                  </div>
                  <div class="mt-2 sm:mt-0 sm:ml-6 text-right">
                    <span class="text-blue-600 font-bold text-lg">{{ Number(activity.calories) || 0 }} kcal</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-500">Aucune activité enregistrée aujourd'hui.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques hebdomadaires -->
      <!-- Bloc supprimé comme demandé -->
    </div>

    <!-- Modal de modification d'activité -->
    <div v-if="showActivityModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeActivityModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">Modifier l'activité</h2>
                <p class="text-orange-100">Mettez à jour vos données</p>
              </div>
            </div>
            <button @click="closeActivityModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type d'activité</label>
            <input v-model="activityData.activityType" type="text" placeholder="Type d'activité..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Durée (minutes)</label>
              <input v-model="activityData.duration" type="number" min="1" placeholder="45" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure</label>
              <input v-model="activityData.time" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Intensité</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="intensity in activityIntensities"
                :key="intensity.value"
                @click="activityData.intensity = intensity.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  activityData.intensity === intensity.value 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ intensity.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ intensity.label }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Calories brûlées</label>
            <div class="relative">
              <input v-model="activityData.calories" type="number" min="0" :placeholder="estimatedCalories" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <span class="absolute right-3 top-3 text-sm text-gray-500">kcal</span>
            </div>
            <div v-if="estimatedCalories" class="text-xs text-gray-500 mt-1">
              Estimation automatique : {{ estimatedCalories }} kcal
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeActivityModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveActivityData" class="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700" :disabled="isSaving">
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { activityService } from '../services/index.js'
import { useToast } from 'vue-toastification'
import { formatDateForAPI } from '../utils/dateUtils.js'
// Supprimer : import { mapGetters } from 'vuex'
export default {
  name: 'ActivityDetails',
  props: {
    selectedDate: {
      type: Date,
      default() {
        return new Date();
      }
    }
  },
  data() {
    return {
      currentDate: new Date(), // Variable locale pour gérer la date
      showActivityModal: false,
      activityData: {
        activityType: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: 0
      },
      activityIntensities: [
        { value: 'low', emoji: '🚶', label: 'Faible' },
        { value: 'moderate', emoji: '🏃', label: 'Modérée' },
        { value: 'high', emoji: '💪', label: 'Élevée' }
      ],
      weeklyActivityData: [],
      todayActivities: [],
      isSaving: false,
      isLoading: true, // loader pour la liste
      isEditMode: false // Nouvelle propriété pour gérer le mode édition
    }
  },
  computed: {
    // Durée totale du jour
    totalDuration() {
      return this.todayActivities
        .filter(a => typeof a.activityType === 'string' && a.activityType.trim() && a.duration > 0)
        .reduce((sum, a) => sum + Number(a.duration || 0), 0);
    },
    // Calories totales du jour
    totalCalories() {
      const total = this.todayActivities
        .filter(a => typeof a.activityType === 'string' && a.activityType.trim() && a.duration > 0 && Number(a.calories) > 0)
        .reduce((sum, a) => sum + (Number(a.calories) || 0), 0);
      return total > 0 ? total : null;
    },
    // Intensité la plus élevée du jour
    maxIntensity() {
      const order = { low: 1, moderate: 2, high: 3 };
      const filtered = this.todayActivities.filter(a => typeof a.activityType === 'string' && a.activityType.trim() && a.duration > 0);
      if (filtered.length === 0) return '-';
      const max = filtered.reduce((prev, curr) => (order[curr.intensity] > order[prev.intensity] ? curr : prev), filtered[0]);
      return max.intensity ? (max.intensity === 'low' ? 'Faible' : max.intensity === 'moderate' ? 'Modérée' : 'Élevée') : '-';
    },
    // Distance totale du jour
    totalDistance() {
      return this.todayActivities
        .filter(a => typeof a.activityType === 'string' && a.activityType.trim() && a.duration > 0)
        .reduce((sum, a) => sum + Number(a.distance || 0), 0);
    },
    // Activités valides du jour
    validTodayActivities() {
      return this.todayActivities.filter(a => typeof a.activityType === 'string' && a.activityType.trim() && a.duration > 0);
    },
    estimatedCalories() {
      if (this.activityData.duration && this.activityData.intensity) {
        const duration = parseInt(this.activityData.duration);
        let caloriesPerMinute = 5; // Base pour intensité modérée
        switch (this.activityData.intensity) {
          case 'low': caloriesPerMinute = 3; break;
          case 'moderate': caloriesPerMinute = 5; break;
          case 'high': caloriesPerMinute = 8; break;
        }
        return Math.round(duration * caloriesPerMinute);
      }
      return null;
    }
  },
  watch: {
    // Surveiller les changements de prop selectedDate
    selectedDate: {
      handler(newDate) {
        if (newDate) {
          this.currentDate = newDate;
          this.loadTodayActivities();
        }
      },
      immediate: false
    },
    // Surveiller les changements de route (query parameters)
    '$route.query.date': {
      handler(newDateStr) {
        if (newDateStr) {
          const d = new Date(newDateStr + 'T00:00:00');
          if (!isNaN(d.getTime())) {
            this.currentDate = d;
            this.loadTodayActivities();
          }
        }
      },
      immediate: false
    }
  },
  async mounted() {
    this.isLoading = true;
    
    // Initialiser la date courante avec la prop ou la date par défaut
    this.currentDate = this.selectedDate || new Date();
    
    // Gérer la date depuis les query parameters
    const dateStr = this.$route?.query?.date;
    if (dateStr) {
      const d = new Date(dateStr + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        this.currentDate = d;
      }
    }
    
    await this.loadTodayActivities();
    this.isLoading = false;
    document.addEventListener('keydown', this.handleEscapeKey);
  },
  methods: {
    openActivityModal() {
      this.activityData = {
        activityType: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: 0
      };
      this.isEditMode = false;
      this.showActivityModal = true;
    },
    closeActivityModal() {
      this.showActivityModal = false;
    },
    async loadTodayActivities() {
      // Utilisation de la date sélectionnée ou aujourd'hui en évitant les problèmes de timezone
      const targetDate = this.currentDate;
      const today = formatDateForAPI(targetDate);
      
      try {
        const result = await activityService.getByDate(today);
        console.log('[DEBUG] Résultat brut de activityService.getByDate :', result);
        this.todayActivities = result;
        console.log('[DEBUG] todayActivities après assignation :', this.todayActivities);
      } catch (e) {
        this.todayActivities = [];
      }
    },
    async refreshTodayActivities() {
      await this.loadTodayActivities();
    },
    async saveActivityData() {
      const toast = useToast();
      
      if (!this.activityData.activityType || !this.activityData.duration) {
        toast.error('Veuillez remplir le type d\'activité et la durée');
        return;
      }
      
      this.isSaving = true;
      try {
        // Correction du problème de décalage de date
        const targetDate = this.currentDate;
        const dateKey = formatDateForAPI(targetDate);
        
        const finalData = {
          ...this.activityData,
          calories: this.activityData.calories || this.estimatedCalories,
          date: dateKey
        };
        
        const result = await activityService.create(finalData);
        
        // Sécuriser l'accès à calories
        const mappedResult = result && result.calories !== undefined ? result : (result ? ActivityData.fromAPI(result) : {});
        
        this.showActivityModal = false;
        toast.success('Activité enregistrée avec succès !');
        this.activityData = { activityType: '', duration: '', time: '', intensity: 'moderate', calories: 0 };
        
        await this.refreshTodayActivities();
        this.$emit('data-updated');
      } catch (error) {
        toast.error('Erreur lors de l\'enregistrement : ' + (error.message || error));
      } finally {
        this.isSaving = false;
      }
    },
    formatDateForAPI(date) {
      // Formater la date pour éviter les problèmes de timezone
      // Note: Cette méthode est dépréciée, utilisez l'import depuis dateUtils à la place
      return formatDateForAPI(date);
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.showActivityModal) {
        this.closeActivityModal();
      }
    },
    editActivity(activity) {
      this.activityData = { ...activity, calories: activity.calories || 0 };
      this.isEditMode = true;
      this.showActivityModal = true;
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }
}
</script>

<style scoped>
/* Backdrop blur pour la modal */
.modal-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* Style pour les boutons d'option */
.option-button {
  transition: all 0.2s ease;
}

.option-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
