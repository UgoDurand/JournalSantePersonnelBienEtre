<template>
  <main class="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
    <!-- Header héroïque -->
    <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div class="absolute top-32 right-20 w-24 h-24 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-20 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
      </div>
      
      <div class="relative p-6 sm:p-8 lg:p-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-6 lg:mb-0">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold mb-2">Analyse du Sommeil</h1>
                <p class="text-indigo-100 text-lg">Votre repos nocturne décodé</p>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
              <p class="text-indigo-100 text-sm mb-2">💤 Dernière nuit</p>
              <p class="text-white text-xl font-semibold">22h30 → 06h45 • 8h15 de sommeil</p>
            </div>
          </div>
          <button @click="openSleepModal" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier mes données
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 lg:p-12 space-y-8">
      <!-- Métriques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-indigo-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="text-2xl">🌙</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Coucher</h3>
          <p class="text-3xl font-bold text-indigo-600 mb-1">22h30</p>
          <p class="text-sm text-gray-500">Régulier (-5min vs hier)</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-yellow-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="text-2xl">☀️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Réveil</h3>
          <p class="text-3xl font-bold text-yellow-600 mb-1">06h45</p>
          <p class="text-sm text-gray-500">Naturel sans réveil</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-2xl">⏱️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Durée</h3>
          <p class="text-3xl font-bold text-green-600 mb-1">8h15</p>
          <p class="text-sm text-gray-500">+15min vs objectif</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span class="text-2xl">✨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Qualité</h3>
          <p class="text-3xl font-bold text-purple-600 mb-1">Bonne</p>
                      <p class="text-sm text-gray-500">Score : -/10</p>
        </div>
      </div>

      <!-- Analyse détaillée -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Phases de sommeil -->
        <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Phases de Sommeil
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-indigo-400 rounded-full mr-3"></div>
                <span class="font-medium text-gray-800">Sommeil léger</span>
              </div>
              <span class="text-indigo-600 font-bold">3h25 (42%)</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                <span class="font-medium text-gray-800">Sommeil profond</span>
              </div>
              <span class="text-purple-600 font-bold">3h15 (39%)</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <span class="font-medium text-gray-800">Sommeil REM</span>
              </div>
              <span class="text-blue-600 font-bold">1h35 (19%)</span>
            </div>
          </div>

          <!-- Graphique simplifié -->
          <div class="mt-6 h-20 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 rounded-2xl relative overflow-hidden">
            <div class="absolute inset-0 flex items-end">
              <div class="w-1/3 bg-indigo-400 rounded-tl-2xl" style="height: 60%;"></div>
              <div class="w-1/3 bg-purple-500" style="height: 85%;"></div>
              <div class="w-1/3 bg-blue-500 rounded-tr-2xl" style="height: 40%;"></div>
            </div>
          </div>
        </div>

        <!-- Conseils et insights -->
        <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </span>
            Insights & Conseils
          </h2>

          <div class="space-y-4">
            <div class="p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
              <div class="flex items-start">
                <span class="text-2xl mr-3">🎯</span>
                <div>
                  <h3 class="font-semibold text-green-800 mb-1">Excellent timing</h3>
                  <p class="text-green-700 text-sm">Votre heure de coucher est parfaitement alignée avec votre chronotype.</p>
                </div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
              <div class="flex items-start">
                <span class="text-2xl mr-3">💡</span>
                <div>
                  <h3 class="font-semibold text-blue-800 mb-1">Régularité excellente</h3>
                  <p class="text-blue-700 text-sm">Vous vous couchez régulièrement à la même heure depuis 5 jours.</p>
                </div>
              </div>
            </div>

            <div class="p-4 bg-amber-50 rounded-2xl border-l-4 border-amber-400">
              <div class="flex items-start">
                <span class="text-2xl mr-3">⚡</span>
                <div>
                  <h3 class="font-semibold text-amber-800 mb-1">Récupération optimale</h3>
                  <p class="text-amber-700 text-sm">Votre sommeil profond représente 39% du total, c'est parfait pour la récupération.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
            <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
              <span class="text-lg mr-2">🌟</span>
              Objectif de demain
            </h3>
            <p class="text-gray-600 text-sm">Maintenez cette routine ! Essayez de vous coucher 5 minutes plus tôt pour atteindre vos 8h30 idéales.</p>
          </div>
        </div>
      </div>

      <!-- Tendances de la semaine -->
      <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Tendances des 7 Derniers Jours
        </h2>

        <div class="grid grid-cols-7 gap-4">
          <div v-for="(day, index) in weeklyData" :key="index" class="text-center">
            <div class="text-sm font-medium text-gray-600 mb-2">{{ day.day }}</div>
            <div class="bg-gradient-to-t from-indigo-400 to-indigo-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-white font-bold text-lg mb-1">{{ day.duration }}</div>
              <div class="w-full bg-white/30 rounded-full h-2 mb-2">
                <div class="bg-white rounded-full h-2" :style="`width: ${day.quality * 10}%`"></div>
              </div>
              <div class="text-white/80 text-xs">{{ day.quality }}/10</div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center space-x-8">
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">7h52</div>
            <div class="text-sm text-gray-600">Moyenne durée</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">8.1</div>
            <div class="text-sm text-gray-600">Score qualité</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">95%</div>
            <div class="text-sm text-gray-600">Régularité</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de modification du sommeil -->
    <div v-if="showSleepModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeSleepModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">Modifier le sommeil</h2>
                <p class="text-indigo-100">Mettez à jour vos données</p>
              </div>
            </div>
            <button @click="closeSleepModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure de coucher</label>
              <input v-model="sleepData.bedtime" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure de réveil</label>
              <input v-model="sleepData.wakeup" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
          </div>
          
          <div class="text-center text-sm text-gray-500">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            La durée sera calculée automatiquement
          </div>

          <!-- Durée calculée automatiquement -->
          <div v-if="sleepDuration" class="bg-indigo-50 p-4 rounded-lg text-center">
            <h4 class="font-semibold text-indigo-800 mb-2">Durée du sommeil</h4>
            <div class="text-2xl font-bold text-indigo-600">{{ sleepDuration }}</div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Qualité du sommeil</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="quality in sleepQualities"
                :key="quality.value"
                @click="sleepData.quality = quality.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  sleepData.quality === quality.value 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ quality.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ quality.label }}</div>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeSleepModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveSleepData" class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700" :disabled="isSaving">
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { sleepService } from '../services/index.js'
import { formatDateForAPI } from '../utils/dateUtils.js'
import { useToast } from 'vue-toastification'

export default {
  name: 'SleepDetails',
  data() {
    return {
      showSleepModal: false,
      sleepData: {
        bedtime: '',
        wakeup: '',
        quality: 'good'
      },
      sleepQualities: [
        { value: 'poor', emoji: '😴', label: 'Mauvais' },
        { value: 'fair', emoji: '😐', label: 'Correct' },
        { value: 'good', emoji: '🙂', label: 'Bon' },
        { value: 'very_good', emoji: '😊', label: 'Très bon' },
        { value: 'excellent', emoji: '😁', label: 'Excellent' }
      ],
      weeklyData: [],
      history: [],
      isSaving: false
    }
  },
  computed: {
    sleepDuration() {
      if (this.sleepData.bedtime && this.sleepData.wakeup) {
        const bedTime = new Date(`1970-01-01T${this.sleepData.bedtime}`);
        let wakeUp = new Date(`1970-01-01T${this.sleepData.wakeup}`);
        if (wakeUp < bedTime) {
          wakeUp = new Date(`1970-01-02T${this.sleepData.wakeup}`);
        }
        const durationMs = wakeUp - bedTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      }
      return null;
    }
  },
  methods: {
    openSleepModal() {
      this.showSleepModal = true;
    },
    closeSleepModal() {
      this.showSleepModal = false;
    },
    async saveSleepData() {
      const toast = useToast();
      if (!this.sleepData.bedtime || !this.sleepData.wakeup) {
        alert('Veuillez remplir les heures de coucher et de réveil');
        return;
      }
      this.isSaving = true;
      try {
        const today = formatDateForAPI(new Date());
        await sleepService.createOrUpdate(today, {
          ...this.sleepData,
          duration: this.sleepDuration
        });
        this.showSleepModal = false;
        toast.success("Données de sommeil enregistrées ou modifiées avec succès !");
      } catch (error) {
        alert('Erreur lors de l\'enregistrement : ' + (error.message || error));
      } finally {
        this.isSaving = false;
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.showSleepModal) {
        this.closeSleepModal();
      }
    }
  },
  mounted() {
    // Gestion de la touche Escape pour fermer la modal
    document.addEventListener('keydown', this.handleEscapeKey);
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