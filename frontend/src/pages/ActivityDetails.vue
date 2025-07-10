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
              <p class="text-orange-100 text-sm mb-2">💪 Séance d'aujourd'hui</p>
              <p class="text-white text-xl font-semibold">Activité du jour</p>
            </div>
          </div>
          <button @click="openActivityModal" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier mes activités
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 lg:p-12 space-y-8">
      <!-- Métriques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-2xl">⏱️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Durée</h3>
          <p class="text-3xl font-bold text-orange-600 mb-1">65 min</p>
          <p class="text-sm text-gray-500">+10min vs hier</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-2xl">🔥</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Calories</h3>
          <p class="text-3xl font-bold text-red-600 mb-1">-</p>
          <p class="text-sm text-gray-500">Objectif : 400 kcal</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Intensité</h3>
          <p class="text-3xl font-bold text-green-600 mb-1">Élevée</p>
          <p class="text-sm text-gray-500">Zone cardio optimale</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="text-2xl">🏃</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Distance</h3>
          <p class="text-3xl font-bold text-blue-600 mb-1">-</p>
          <p class="text-sm text-gray-500">Vitesse moy. : - km/h</p>
        </div>
      </div>

      <!-- Activités détaillées -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Séances d'aujourd'hui -->
        <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
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
            <div v-if="todayActivities.length === 0" class="text-center text-gray-500">Aucune activité enregistrée aujourd'hui.</div>
            <div v-for="activity in todayActivities" :key="activity.id" class="p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400 mb-2">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-blue-800 flex items-center">
                  <span class="text-xl mr-2">🏃‍♂️</span>
                  {{ activity.name || 'Activité' }}
                </h3>
                <span class="text-blue-600 font-bold text-sm">{{ activity.calories || '-' }} kcal</span>
              </div>
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div class="text-center">
                  <div class="font-semibold text-blue-700">{{ activity.duration }} min</div>
                  <div class="text-blue-600">Durée</div>
                </div>
                <div class="text-center">
                  <div class="font-semibold text-blue-700">{{ activity.intensity }}</div>
                  <div class="text-blue-600">Intensité</div>
                </div>
                <div class="text-center">
                  <div class="font-semibold text-blue-700">{{ activity.time || '-' }}</div>
                  <div class="text-blue-600">Heure</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analyse des performances -->
        <div class="space-y-6">
          <!-- Progression cardio -->
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>
              Cardio
            </h2>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <span class="text-gray-700">Rythme cardiaque moyen</span>
                <span class="font-bold text-red-600">145 bpm</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                <span class="text-gray-700">Rythme cardiaque max</span>
                <span class="font-bold text-orange-600">168 bpm</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span class="text-gray-700">Zone d'entraînement</span>
                <span class="font-bold text-green-600">Aérobie</span>
              </div>
            </div>

            <!-- Graphique des zones cardio -->
            <div class="mt-6 h-12 bg-gradient-to-r from-blue-200 via-green-300 via-yellow-300 via-orange-400 to-red-500 rounded-2xl relative">
              <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div class="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-green-500" style="margin-left: 55%;"></div>
              </div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>Repos</span>
              <span>Graisse</span>
              <span>Aérobie</span>
              <span>Anaérobie</span>
              <span>Max</span>
            </div>
          </div>

          <!-- Conseils et motivation -->
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Insights
            </h2>

      <div class="space-y-4">
              <div class="p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
                <div class="flex items-start">
                  <span class="text-2xl mr-3">🔥</span>
                  <div>
                    <h3 class="font-semibold text-green-800 mb-1">Excellent rythme</h3>
                    <p class="text-green-700 text-sm">Aucune donnée disponible.</p>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                <div class="flex items-start">
                  <span class="text-2xl mr-3">📈</span>
                  <div>
                    <h3 class="font-semibold text-blue-800 mb-1">Progression constante</h3>
                    <p class="text-blue-700 text-sm">Votre vitesse s'améliore de 2% chaque semaine depuis un mois.</p>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">🎯</span>
                  Objectif de demain
                </h3>
                <p class="text-gray-600 text-sm">Aucune recommandation disponible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques hebdomadaires -->
      <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Activité des 7 Derniers Jours
        </h2>

        <div class="grid grid-cols-7 gap-4">
          <div v-for="(day, index) in weeklyActivityData" :key="index" class="text-center">
            <div class="text-sm font-medium text-gray-600 mb-2">{{ day.day }}</div>
            <div class="bg-gradient-to-t from-orange-400 to-red-400 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-white font-bold text-lg mb-1">{{ day.duration }}</div>
              <div class="text-white text-xs mb-2">{{ day.type }}</div>
              <div class="text-white/80 text-xs">{{ day.calories }} kcal</div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center space-x-8">
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">315 min</div>
            <div class="text-sm text-gray-600">Temps total</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">2,180</div>
            <div class="text-sm text-gray-600">Calories brûlées</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">5/7</div>
            <div class="text-sm text-gray-600">Jours actifs</div>
          </div>
        </div>
      </div>
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
            <input v-model="activityData.name" type="text" placeholder="Type d'activité..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
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
export default {
  name: 'ActivityDetails',
  props: {
    selectedDate: {
      type: Date,
      default() {
        const dateStr = this?.$route?.query?.date;
        if (dateStr) {
          const d = new Date(dateStr + 'T00:00:00');
          if (!isNaN(d.getTime())) return d;
        }
        return new Date();
      }
    }
  },
  data() {
    return {
      showActivityModal: false,
      activityData: {
        name: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: ''
      },
      activityIntensities: [
        { value: 'low', emoji: '🚶', label: 'Faible' },
        { value: 'moderate', emoji: '🏃', label: 'Modérée' },
        { value: 'high', emoji: '💪', label: 'Élevée' }
      ],
      weeklyActivityData: [],
      todayActivities: [],
      isSaving: false,
      isLoading: true // loader pour la liste
    }
  },
  computed: {
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
  async mounted() {
    this.isLoading = true;
    await this.loadTodayActivities();
    this.isLoading = false;
    document.addEventListener('keydown', this.handleEscapeKey);
  },
  methods: {
    openActivityModal() {
      this.showActivityModal = true;
    },
    closeActivityModal() {
      this.showActivityModal = false;
    },
    async loadTodayActivities() {
      const today = new Date().toISOString().split('T')[0];
      try {
        this.todayActivities = await activityService.getByDate(today);
      } catch (e) {
        this.todayActivities = [];
      }
    },
    async refreshTodayActivities() {
      await this.loadTodayActivities();
    },
    async saveActivityData() {
      const toast = useToast();
      if (!this.activityData.name || !this.activityData.duration) {
        toast.error('Veuillez remplir le type d\'activité et la durée');
        return;
      }
      this.isSaving = true;
      try {
        const dateKey = this.selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0];
        const finalData = {
          ...this.activityData,
          calories: this.activityData.calories || this.estimatedCalories,
          date: dateKey
        };
        await activityService.create(finalData);
        this.showActivityModal = false;
        toast.success('Activité enregistrée avec succès !');
        this.activityData = { name: '', duration: '', time: '', intensity: 'moderate', calories: '' };
        await this.refreshTodayActivities();
      } catch (error) {
        toast.error('Erreur lors de l\'enregistrement : ' + (error.message || error));
      } finally {
        this.isSaving = false;
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.showActivityModal) {
        this.closeActivityModal();
      }
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
