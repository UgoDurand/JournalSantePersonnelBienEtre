<!-- src/pages/Mood.vue -->
<template>
  <main class="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen">
    <!-- Header héroïque -->
    <div class="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-12 left-24 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div class="absolute top-36 right-12 w-16 h-16 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-12 left-1/4 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
      </div>
      
      <div class="relative p-6 sm:p-8 lg:p-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-6 lg:mb-0">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold mb-2">Bien-être Mental</h1>
                <p class="text-pink-100 text-lg">Votre état d'esprit et votre énergie</p>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
              <p class="text-pink-100 text-sm mb-2">😊 État actuel</p>
              <p class="text-white text-xl font-semibold">Humeur positive • Énergie élevée</p>
            </div>
          </div>
          <button @click="openMoodModal" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier mon humeur
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 lg:p-12 space-y-8">
      <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
      <div v-else>
        <!-- État actuel -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800">Humeur</h2>
                <p class="text-gray-600">État émotionnel actuel</p>
              </div>
            </div>
            
            <div class="text-center">
              <div class="text-8xl mb-4 animate-pulse">{{ getMoodEmoji(selectedMood) }}</div>
              <div class="text-3xl font-bold text-pink-600 mb-2">{{ selectedMood }}</div>
              <div class="text-sm text-gray-500">Évaluée il y a 2 heures</div>
              <div class="mt-4 bg-pink-50 rounded-2xl p-4">
                <div class="text-sm text-pink-800">
                  <span class="font-semibold">Score : {{ getMoodScore(selectedMood) }}/10</span> • {{ getMoodDescription(selectedMood) }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800">Énergie</h2>
                <p class="text-gray-600">Niveau de vitalité</p>
              </div>
            </div>
            
            <div class="text-center">
              <div class="text-8xl mb-4 animate-bounce">{{ getEnergyEmoji(selectedEnergy) }}</div>
              <div class="text-3xl font-bold text-orange-600 mb-2">{{ selectedEnergy }}</div>
              <div class="text-sm text-gray-500">Évaluée il y a 2 heures</div>
              <div class="mt-4 bg-orange-50 rounded-2xl p-4">
                <div class="text-sm text-orange-800">
                  <span class="font-semibold">Score : {{ getEnergyScore(selectedEnergy) }}/10</span> • {{ getEnergyDescription(selectedEnergy) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tendances de la semaine -->
        <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Évolution des 7 Derniers Jours
          </h2>

          <div class="grid grid-cols-7 gap-4 mb-6">
            <div v-for="day in weeklyMoods" :key="day.day" class="text-center">
              <div class="text-sm font-medium text-gray-600 mb-2">{{ day.day }}</div>
              <div class="bg-gradient-to-t from-pink-200 to-purple-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div class="text-4xl mb-2">{{ day.emoji }}</div>
                <div class="text-xs text-gray-700 font-medium">{{ day.mood }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ day.energy }}/10</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-pink-50 rounded-2xl p-6 text-center">
              <div class="text-3xl font-bold text-pink-600 mb-1">-</div>
              <div class="text-sm text-gray-600">Humeur moyenne</div>
            </div>
            <div class="bg-orange-50 rounded-2xl p-6 text-center">
              <div class="text-3xl font-bold text-orange-600 mb-1">-</div>
              <div class="text-sm text-gray-600">Énergie moyenne</div>
            </div>
            <div class="bg-green-50 rounded-2xl p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-1">86%</div>
              <div class="text-sm text-gray-600">Jours positifs</div>
            </div>
          </div>
        </div>

        <!-- Facteurs d'influence -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Facteurs Positifs
            </h2>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-green-800">Excellent sommeil</div>
                    <div class="text-sm text-green-600">8h15 de repos réparateur</div>
                  </div>
                </div>
                <div class="text-green-600 font-bold">+2</div>
              </div>

              <div class="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-blue-800">Activité physique</div>
                    <div class="text-sm text-blue-600">Aucune activité renseignée</div>
                  </div>
                </div>
                <div class="text-blue-600 font-bold">+3</div>
              </div>

              <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border-l-4 border-yellow-400">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-yellow-800">Beau temps</div>
                    <div class="text-sm text-yellow-600">Journée ensoleillée</div>
                  </div>
                </div>
                <div class="text-yellow-600 font-bold">+1</div>
              </div>

              <div class="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-400">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-purple-800">Moments sociaux</div>
                    <div class="text-sm text-purple-600">Temps avec les proches</div>
                  </div>
                </div>
                <div class="text-purple-600 font-bold">+2</div>
              </div>
            </div>
          </div>

          <!-- Conseils bien-être -->
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Conseils Bien-être
            </h2>

            <div class="space-y-4">
              <div class="p-4 bg-indigo-50 rounded-2xl">
                <h3 class="font-semibold text-indigo-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">🧘‍♀️</span>
                  Méditation quotidienne
                </h3>
                <p class="text-indigo-700 text-sm">5 minutes de méditation matinale peuvent améliorer votre humeur de 15%.</p>
              </div>

              <div class="p-4 bg-teal-50 rounded-2xl">
                <h3 class="font-semibold text-teal-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">🌱</span>
                  Gratitude
                </h3>
                <p class="text-teal-700 text-sm">Notez 3 choses pour lesquelles vous êtes reconnaissant(e) chaque soir.</p>
              </div>

              <div class="p-4 bg-rose-50 rounded-2xl">
                <h3 class="font-semibold text-rose-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">🎨</span>
                  Activité créative
                </h3>
                <p class="text-rose-700 text-sm">Consacrez du temps à une passion créative pour stimuler votre bien-être.</p>
              </div>

              <div class="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">💡</span>
                  Conseil du jour
                </h3>
                <p class="text-gray-600 text-sm">Votre énergie est élevée ! Profitez-en pour tacler les tâches importantes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de modification d'humeur -->
    <div v-if="showMoodModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeMoodModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">Modifier l'humeur</h2>
                <p class="text-pink-100">Mettez à jour vos données</p>
              </div>
            </div>
            <button @click="closeMoodModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Comment vous sentez-vous ?</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="mood in moodOptions"
                :key="mood.value"
                @click="moodData.mood = mood.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.mood && moodData.mood.toLowerCase() === mood.value.toLowerCase() 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ mood.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ mood.value }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quel est votre niveau d'énergie ?</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="energy in energyOptions"
                :key="energy.value"
                @click="moodData.energy = energy.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.energy && moodData.energy.toLowerCase() === energy.value.toLowerCase() 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ energy.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ energy.value }}</div>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeMoodModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveMoodData" class="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700" :disabled="isSaving">
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { moodService } from '../services/index.js'
import { MoodData } from '../models/MoodData.js'
import { useToast } from 'vue-toastification'
import { formatDateForAPI } from '../utils/dateUtils.js'
export default {
  name: 'MoodPage',
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
      showMoodModal: false,
      moodData: {
        mood: 'Good',
        energy: 'Fit'
      },
      currentMoodData: null,
      isLoading: true, // Ajouté pour le loader
      moodOptions: [
        { value: 'Awful',   emoji: '😢' },
        { value: 'Bad',     emoji: '😞' },
        { value: 'Neutral', emoji: '😐' },
        { value: 'Good',    emoji: '🙂' },
        { value: 'Great',   emoji: '😃' }
      ],
      energyOptions: [
        { value: 'Sick',      emoji: '🤒' },
        { value: 'Tired',     emoji: '😴' },
        { value: 'Neutral',   emoji: '😐' },
        { value: 'Fit',       emoji: '💪' },
        { value: 'Energetic', emoji: '⚡️' }
      ],
      selectedMood:   'Good',
      selectedEnergy: 'Fit',
      weeklyMoods: [],
      isSaving: false
    }
  },
  methods: {
    async loadCurrentMoodData() {
      // Charge l'humeur du jour depuis le backend
      // Utilisation de la date sélectionnée ou aujourd'hui en évitant les problèmes de timezone
      const targetDate = this.currentDate;
      const today = formatDateForAPI(targetDate);
      try {
        const mood = await moodService.getByDate(today);
        if (mood) {
          this.currentMoodData = mood;
          // Met à jour les sélections affichées
          this.selectedMood = mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1);
          this.selectedEnergy = mood.energy.charAt(0).toUpperCase() + mood.energy.slice(1);
        } else {
          this.currentMoodData = null;
        }
      } catch (e) {
        this.currentMoodData = null;
      }
    },
    openMoodModal() {
      // Pré-remplit moodData avec toutes les données de l'humeur du jour (y compris l'id)
      if (this.currentMoodData) {
        this.moodData = { ...this.currentMoodData };
      } else {
        this.moodData = {
          mood: this.selectedMood,
          energy: this.selectedEnergy,
          stress: 'neutral',
          anxiety: 'neutral',
          notes: '',
          triggers: [],
          id: undefined
        };
      }
      this.showMoodModal = true;
    },
    closeMoodModal() {
      this.showMoodModal = false;
    },
    async saveMoodData() {
      const toast = useToast();
      this.selectedMood = this.moodData.mood;
      this.selectedEnergy = this.moodData.energy;
      this.isSaving = true;
      try {
        // Correction du problème de décalage de date
        const targetDate = this.currentDate;
        const dateKey = formatDateForAPI(targetDate);
        // On complète l'objet avec tous les champs attendus, y compris l'id
        const moodDataRaw = {
          id: this.moodData.id, // <-- Ajoute l'id ici si présent
          mood: this.moodData.mood || 'neutral',
          energy: this.moodData.energy || 'neutral',
          stress: this.moodData.stress || 'neutral',
          anxiety: this.moodData.anxiety || 'neutral',
          notes: this.moodData.notes || '',
          triggers: this.moodData.triggers || [],
          date: dateKey
        };
        const moodDataToSave = new MoodData(moodDataRaw);

        let result;
        if (moodDataToSave.id) {
          // Update
          result = await moodService.update(moodDataToSave.id, moodDataToSave);
        } else {
          // Create
          result = await moodService.create(moodDataToSave);
        }

        if (!result || typeof result !== 'object' || !('id' in result)) {
          throw new Error('La réponse du backend est invalide ou vide.');
        }
        this.showMoodModal = false;
        toast.success('Données d\'humeur enregistrées ou modifiées avec succès !');
        await this.refreshAllData?.();
        this.$emit('data-updated');
      } catch (error) {
        console.error('[saveMoodData] Erreur lors de l\'enregistrement mood:', error);
        toast.error('Erreur lors de l\'enregistrement : ' + (error.message || error));
      } finally {
        this.isSaving = false;
      }
    },
    async refreshAllData() {
      // Recharge toutes les données (à adapter selon ta logique)
      await this.loadAllData?.();
    },
    formatDateForAPI(date) {
      // Formater la date pour éviter les problèmes de timezone
      // Note: Cette méthode et dépréciée, utilisez l'import depuis dateUtils à la place
      return formatDateForAPI(date);
    },
    getMoodEmoji(mood) {
      const moodOption = this.moodOptions.find(option => option.value === mood);
      return moodOption ? moodOption.emoji : '😐';
    },
    getEnergyEmoji(energy) {
      const energyOption = this.energyOptions.find(option => option.value === energy);
      return energyOption ? energyOption.emoji : '😐';
    },
    getMoodScore(mood) {
      const scores = { 'Awful': 2, 'Bad': 4, 'Neutral': 6, 'Good': 8, 'Great': 10 };
      return scores[mood] || 6;
    },
    getEnergyScore(energy) {
      const scores = { 'Sick': 1, 'Tired': 3, 'Neutral': 5, 'Fit': 8, 'Energetic': 10 };
      return scores[energy] || 5;
    },
    getMoodDescription(mood) {
      const descriptions = {
        'Awful': 'Journée difficile',
        'Bad': 'Moral en baisse',
        'Neutral': 'Journée équilibrée',
        'Good': 'Journée positive et équilibrée',
        'Great': 'Excellent moral et motivation'
      };
      return descriptions[mood] || 'État stable';
    },
    getEnergyDescription(energy) {
      const descriptions = {
        'Sick': 'Besoin de repos',
        'Tired': 'Fatigue présente',
        'Neutral': 'Énergie modérée',
        'Fit': 'Pleine forme et motivation',
        'Energetic': 'Débordant d\'énergie'
      };
      return descriptions[energy] || 'Niveau normal';
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.showMoodModal) {
        this.closeMoodModal();
      }
    },
    onSave() {
      console.log(
          'Mood:', this.selectedMood,
          'Energy Level:', this.selectedEnergy
      )
      this.$router.back()
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.handleEscapeKey);
    
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
    
    this.isLoading = true;
    await this.loadCurrentMoodData();
    this.isLoading = false;
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
