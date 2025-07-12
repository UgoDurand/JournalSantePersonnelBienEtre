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
              <p class="text-pink-100 text-sm mb-2">{{ getMoodEmoji(currentMoodData?.mood) }} État actuel</p>
              <p class="text-white text-xl font-semibold">
                {{ getEtatActuelMessage(currentMoodData) }}
              </p>
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
        <!-- État actuel (dynamique) -->
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
            <div v-if="currentMoodData" class="text-center">
              <div class="text-8xl mb-4 animate-pulse">{{ getMoodEmoji(currentMoodData.mood) }}</div>
              <div class="text-3xl font-bold text-pink-600 mb-2">{{ currentMoodData.mood }}</div>
              <div class="text-base text-gray-500 mb-2">Évaluée le {{ currentMoodData.updatedAt ? currentMoodData.updatedAt.split('T')[0] : '' }} à {{ currentMoodData.updatedAt ? currentMoodData.updatedAt.split('T')[1]?.slice(0,5) : '' }}</div>
              <div class="mt-4 bg-pink-50 rounded-2xl p-4">
                <div class="text-base text-pink-800">
                  <span v-if="currentMoodData.notes">{{ currentMoodData.notes }}</span>
                  <span v-else>Aucune note enregistrée.</span>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-400 py-12">Aucune humeur enregistrée pour aujourd'hui.</div>
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
            <div v-if="currentMoodData" class="text-center">
              <div class="text-8xl mb-4 animate-bounce">{{ getEnergyEmoji(currentMoodData.energy) }}</div>
              <div class="text-3xl font-bold text-orange-600 mb-2">{{ currentMoodData.energy }}</div>
              <div class="text-base text-gray-500 mb-2">Évaluée le {{ currentMoodData.updatedAt ? currentMoodData.updatedAt.split('T')[0] : '' }} à {{ currentMoodData.updatedAt ? currentMoodData.updatedAt.split('T')[1]?.slice(0,5) : '' }}</div>
              <div class="mt-4 bg-orange-50 rounded-2xl p-4">
                <div class="text-base text-orange-800">
                  <span v-if="currentMoodData.stress && currentMoodData.stress !== 'neutral'">Stress : {{ currentMoodData.stress }}</span>
                  <span v-if="currentMoodData.anxiety && currentMoodData.anxiety !== 'neutral'"> | Anxiété : {{ currentMoodData.anxiety }}</span>
                  <span v-if="(!currentMoodData.stress || currentMoodData.stress === 'neutral') && (!currentMoodData.anxiety || currentMoodData.anxiety === 'neutral')">Aucun stress ou anxiété particulier.</span>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-400 py-12">Aucune donnée d'énergie pour aujourd'hui.</div>
          </div>
        </div>

        <!-- Conseil dynamique selon humeur/énergie -->
        <div v-if="currentMoodData" class="mt-12 flex justify-center">
          <div class="bg-gradient-to-r from-pink-100 to-orange-100 rounded-3xl shadow-lg p-8 max-w-xl w-full">
            <h3 class="text-2xl font-bold text-pink-700 mb-4 flex items-center">
              <span class="mr-2">💡</span> Conseil du jour
            </h3>
            <div class="text-2xl font-semibold text-gray-800 leading-relaxed py-4">
              <span v-if="isMood('awful') || isEnergy('sick')">
                Prends soin de toi aujourd'hui. Accorde-toi du repos, hydrate-toi et n'hésite pas à demander du soutien à un proche. Un petit pas suffit pour aller mieux.
              </span>
              <span v-else-if="isMood('bad') || isEnergy('tired')">
                Journée difficile ? Essaie de faire une pause, de respirer profondément ou de sortir prendre l'air. Même une courte marche peut aider à retrouver un peu d'énergie.
              </span>
              <span v-else-if="isMood('neutral') || isEnergy('neutral')">
                Prends le temps de t'écouter et de faire une activité qui te fait du bien. Un moment de calme ou une activité créative peuvent t'aider à maintenir ton équilibre.
              </span>
              <span v-else-if="isMood('good') || isEnergy('fit')">
                Belle énergie ! Profite de ta motivation pour avancer sur tes projets ou partager un bon moment avec tes proches. Continue à prendre soin de toi.
              </span>
              <span v-else-if="isMood('great') || isEnergy('energetic')">
                Tu es au top ! Lance-toi un défi, essaie une nouvelle activité ou partage ta bonne humeur autour de toi. Garde cette belle dynamique !
              </span>
              <span v-else>
                Prends soin de toi et écoute tes besoins du moment.
              </span>
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
      currentDate: new Date(),
      showMoodModal: false,
      moodData: {
        mood: 'Good',
        energy: 'Fit'
      },
      currentMoodData: null,
      isLoading: true,
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
        await this.loadCurrentMoodData(); // <-- Rafraîchit la donnée dynamique après save
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
      return formatDateForAPI(date);
    },
    getMoodEmoji(mood) {
      if (!mood) return '😐';
      const moodOption = this.moodOptions.find(option => option.value.toLowerCase() === mood.toLowerCase());
      return moodOption ? moodOption.emoji : '😐';
    },
    getEnergyEmoji(energy) {
      if (!energy) return '😐';
      const energyOption = this.energyOptions.find(option => option.value.toLowerCase() === energy.toLowerCase());
      return energyOption ? energyOption.emoji : '😐';
    },
    isMood(val) {
      return this.currentMoodData && this.currentMoodData.mood && this.currentMoodData.mood.toLowerCase() === val;
    },
    isEnergy(val) {
      return this.currentMoodData && this.currentMoodData.energy && this.currentMoodData.energy.toLowerCase() === val;
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
    },
    getEtatActuelMessage(moodData) {
      if (!moodData) return "Aucune donnée d'humeur aujourd'hui.";
      const mood = moodData.mood ? moodData.mood.toLowerCase() : '';
      const energy = moodData.energy ? moodData.energy.toLowerCase() : '';
      if ((mood === 'great' || mood === 'good') && (energy === 'energetic' || energy === 'fit')) {
        return "Tu es au top aujourd'hui ! Profite de cette belle énergie.";
      } else if ((mood === 'bad' || mood === 'awful') && (energy === 'sick' || energy === 'tired')) {
        return "Courage, demain sera un meilleur jour. Prends soin de toi.";
      } else if (mood === 'neutral' && (energy === 'neutral' || energy === 'tired')) {
        return "Journée calme, accorde-toi du repos et écoute tes besoins.";
      } else if ((mood === 'good' || mood === 'great') && (energy === 'neutral' || energy === 'tired')) {
        return "Bonne humeur, mais pense à recharger tes batteries.";
      } else if ((mood === 'bad' || mood === 'awful') && (energy === 'fit' || energy === 'energetic')) {
        return "L'énergie est là, mais le moral moins. Prends un moment pour toi ou fais une activité qui te plaît.";
      } else if (mood === 'neutral' && (energy === 'fit' || energy === 'energetic')) {
        return "Bonne énergie, profites-en pour avancer sur ce qui te motive !";
      } else {
        return "Prends soin de toi et profite de ta journée.";
      }
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
