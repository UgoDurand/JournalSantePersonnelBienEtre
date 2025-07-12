<template>
  <aside
      :class="[
      'sticky top-0 md:static',
      'bg-white shadow-sm transition-width duration-200 border-b md:border-b-0 md:border-r border-gray-200',
      'z-50 md:z-auto',
      collapsed
        ? 'w-full h-16 flex flex-row items-center justify-between px-4 md:w-16 md:h-screen md:flex-col md:px-2 md:py-2'
        : 'w-full md:w-56 lg:w-64 xl:w-72 h-auto md:h-screen flex flex-col px-2 py-2 md:overflow-hidden'
    ]"
  >
    <!-- HEADER -->
    <div
        :class="[
        'flex items-center w-full',
        collapsed ? 'justify-between md:justify-center h-16' : 'justify-between mb-3'
      ]"
    >
      <div class="flex items-center space-x-2">
        <!-- Logo -->
        <div
            class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
            :class="collapsed ? 'md:hidden' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <!-- Nom -->
        <span
            class="text-xl font-semibold text-gray-800"
            :class="collapsed ? 'block md:hidden' : 'block'"
        >
          Journal Santé
        </span>
      </div>

      <Bars3Icon @click="collapsed = !collapsed"
                 class="w-6 h-6 text-black cursor-pointer hover:text-gray-700" />
    </div>

    <!-- SÉLECTEUR DE DATE -->
    <div v-if="!collapsed" class="mb-3 relative">
              <button
          @click.stop="toggleDatePicker"
          @touchstart.stop="toggleDatePicker"
          class="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
        <div class="flex items-center space-x-2">
          <CalendarIcon class="w-4 h-4 text-indigo-600" />
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900">{{ formattedSelectedDate }}</p>
            <p class="text-xs text-gray-500">Cliquez pour changer</p>
          </div>
        </div>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <!-- DATE PICKER POPUP -->
      <div
        v-if="showDatePicker"
        @click.stop
        class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
      >
        <div class="mb-4">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Sélectionner une date</h3>
          <input
            type="date"
            :value="formatDateForInput(selectedDate)"
            :max="formatDateForInput(today)"
            @change="onDateChange"
            @input="onDateChange"
            @blur="onDateChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="showDatePicker = false"
            class="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            @click="showDatePicker = false"
            class="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Valider
          </button>
        </div>
      </div>
    </div>

    <!-- NAVIGATION TEMPORELLE -->
    <div v-if="!collapsed" class="mb-3">
      <div class="grid grid-cols-2 gap-2 text-xs">
        <button
          @click="goToToday"
          @touchstart="goToToday"
          :class="activeTimeButton === 'today' 
            ? 'px-2 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
            : 'px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'"
        >
          Aujourd'hui
        </button>
        <button
          @click="goToYesterday"
          @touchstart="goToYesterday"
          :class="activeTimeButton === 'yesterday' 
            ? 'px-2 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
            : 'px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'"
        >
          Hier
        </button>
        <div class="col-span-2 flex justify-center">
          <button
            @click="goToThisWeek"
            @touchstart="goToThisWeek"
            class="w-1/2"
            :class="activeTimeButton === 'thisWeek' 
              ? 'px-2 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
              : 'px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'"
          >
            Cette semaine
          </button>
        </div>
      </div>
    </div>

    <!-- ONGLETS SEMAINE -->
    <div v-if="!collapsed" class="mb-3">
      <h3 class="text-xs font-medium text-gray-400 mb-2">SEMAINE</h3>
      <div class="space-y-1">
        <button
          v-for="day in weekDays"
          :key="day.date.toISOString()"
          @click="selectDate(day.date, $event)"
          @touchstart="selectDate(day.date, $event)"
          class="w-full flex items-center justify-between p-2 rounded-lg transition-colors"
          :class="[
            day.isSelected 
              ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' 
              : 'hover:bg-gray-50 text-gray-700',
            day.isToday ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
          ]"
        >
          <div class="flex items-center space-x-2">
            <div class="text-left">
              <p class="text-sm font-medium">{{ day.dayName }}</p>
              <p class="text-xs text-gray-500">{{ day.day }}</p>
            </div>
          </div>
          
          <!-- Indicateur d'activité -->
          <div class="flex items-center space-x-1">
            <div 
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': day.activityLevel === 'high',
                'bg-yellow-500': day.activityLevel === 'medium',
                'bg-orange-500': day.activityLevel === 'low',
                'bg-gray-300': day.activityLevel === 'none'
              }"
            ></div>
            <span v-if="day.isToday" class="text-xs font-medium text-indigo-600">Aujourd'hui</span>
          </div>
        </button>
      </div>
    </div>

    <!-- STATISTIQUES RAPIDES -->
    <div v-if="!collapsed" class="mb-2">
      <h3 class="text-xs font-medium text-gray-400 mb-2">STATISTIQUES</h3>
      <div class="space-y-2">
        <!-- Streak motivant -->
        <div class="flex items-center p-3 bg-green-50 rounded-lg">
          <span class="text-2xl mr-3">🔥</span>
          <div>
            <div class="font-semibold text-green-900">Série : {{ streakCount }} jours</div>
            <div class="text-xs text-green-700">
              {{ streakCount >= 7 ? 'Incroyable régularité !' : (streakCount >= 3 ? 'Continue comme ça !' : 'Commence ta série !') }}
            </div>
          </div>
        </div>

        <!-- Score du jour avec jauge -->
        <div class="flex items-center p-3 bg-blue-50 rounded-lg">
          <span class="text-2xl mr-3">⚡</span>
          <div class="flex-1">
            <div class="font-semibold text-blue-900">Score du jour</div>
            <div class="w-full bg-blue-100 rounded h-2 my-1">
              <div class="bg-blue-500 h-2 rounded" :style="{ width: dailyScore + '%' }"></div>
            </div>
            <div class="text-xs text-blue-700">{{ dailyScore }}% - 
              {{ dailyScore >= 80 ? 'Excellent !' : dailyScore >= 50 ? 'En progrès' : 'Peut mieux faire' }}
            </div>
          </div>
        </div>

        <!-- Objectifs hebdo -->
        <div class="flex items-center p-3 bg-orange-50 rounded-lg">
          <span class="text-2xl mr-3">🎯</span>
          <div>
            <div class="font-semibold text-orange-900">Objectifs semaine</div>
            <div class="text-xs text-orange-700">
              {{ weeklyGoals.completed }}/{{ weeklyGoals.total }} atteints<br>
              {{ weeklyGoals.completed == weeklyGoals.total ? 'Objectif hebdo validé !' : weeklyGoals.completed >= 5 ? 'Presque au bout !' : 'Tu peux le faire !' }}
            </div>
          </div>
        </div>

      </div>
    </div>



    <!-- VERSION COMPACTE -->
    <nav
        :class="[
        collapsed ? 'flex md:mt-4 flex-col' : 'hidden',
        'flex-1 gap-2 overflow-y-auto'
      ]"
    >
      <button
        @click="goToToday"
        class="flex items-center justify-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        :class="{ 'bg-indigo-100 text-indigo-900': isSameDay(selectedDate, today) }"
      >
        <CalendarIcon class="w-5 h-5" />
      </button>

    </nav>

    <!-- FOOTER / PROFIL -->
    <div :class="collapsed
        ? 'hidden md:flex flex-col gap-1 mt-auto pt-1'
        : 'mt-auto flex flex-col gap-1 pt-1'">
      <div v-if="!collapsed" class="px-2 py-1">
        <UserProfile />
      </div>
      <div v-if="collapsed" class="px-1 py-1 md:px-2">
        <UserProfile :compact="true" />
      </div>
    </div>
  </aside>
</template>

<script>
import {
  CalendarIcon,
  Bars3Icon
} from '@heroicons/vue/24/outline'
import UserProfile  from '@/components/UserProfile.vue'
import { dataService, getErrorType, formatErrorMessage } from '../services/index.js'

export default {
  name: 'NavbarMenu',
  components: { CalendarIcon, Bars3Icon, UserProfile },
  data() {
    return {
      collapsed: false,
      selectedDate: new Date(),
      showDatePicker: false,
      currentWeek: [],
      activeTimeButton: 'today',
      isLoading: false,
      error: null,
      dataByDate: {},
      currentData: null,
      streakCount: 0,
      dailyScore: 0,
      weeklyGoals: { completed: 0, total: 7 }
    }
  },
  computed: {
    today() {
      return new Date()
    },
    formattedSelectedDate() {
      return this.selectedDate.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    selectedDateKey() {
      const year = this.selectedDate.getFullYear()
      const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(this.selectedDate.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    hasDataForSelectedDate() {
      const data = this.dataByDate[this.selectedDateKey]
      return data && data.hasData
    },
    isSelectedDateToday() {
      return this.isSameDay(this.selectedDate, this.today)
    },
    displayState() {
      if (this.hasDataForSelectedDate) {
        return 'WITH_DATA'
      } else if (this.isSelectedDateToday) {
        return 'TODAY_NO_DATA'
      } else {
        return 'PAST_NO_DATA'
      }
    },
    weekDays() {
      // Afficher la semaine qui contient la date sélectionnée
      const referenceDate = this.selectedDate
      const startOfWeek = new Date(referenceDate)
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfWeek.setDate(diff)
      
      const week = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)
        
        // Ne pas afficher les jours futurs
        if (date > this.today) continue
        
        week.push({
          date: date,
          day: date.getDate(),
          dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
          isToday: this.isSameDay(date, this.today),
          isSelected: this.isSameDay(date, this.selectedDate),
          hasActivity: this.hasActivityForDate(date),
          activityLevel: this.getActivityLevel(date)
        })
      }
      
      return week
    }
  },
  methods: {
    // ====== MÉTHODES POUR API BACKEND ======
    


    /**
     * Charger les données pour une période (7 derniers jours)
     */
    async loadWeekData() {
      try {
        this.isLoading = true
        this.error = null
        
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(endDate.getDate() - 6)
        
        const startDateKey = this.getDateKeyFromDate(startDate)
        const endDateKey = this.getDateKeyFromDate(endDate)
        
        console.log('🔄 [Navbar] Chargement des données de la semaine...')
        console.log('📅 [Navbar] Période:', startDateKey, 'à', endDateKey)
        
        const weeklyStats = await dataService.getAllDataForDateRange(
          startDateKey,
          endDateKey
        )
        
        console.log('✅ [Navbar] Données reçues:', weeklyStats)
        
        // Organiser les données par date
        this.dataByDate = {}
        
        // Créer des entrées pour chaque jour
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate)
          date.setDate(startDate.getDate() + i)
          const dateKey = this.getDateKeyFromDate(date)
          
          // Chercher les données pour cette date dans les arrays
          const sleepForDate = weeklyStats.sleep?.find(s => s.date === dateKey) || null
          const dietForDate = weeklyStats.diet?.find(d => d.date === dateKey) || null
          const activitiesForDate = weeklyStats.activity?.filter(a => a.date === dateKey) || []
          const moodForDate = weeklyStats.mood?.find(m => m.date === dateKey) || null
          
          // Créer l'objet pour ce jour
          const dayData = {
            date: dateKey,
            sleep: sleepForDate,
            diet: dietForDate,
            activity: activitiesForDate,
            mood: moodForDate,
            hasData: !!(
              (sleepForDate && sleepForDate.hasRealData) ||
              (dietForDate && dietForDate.hasRealData) ||
              (activitiesForDate && activitiesForDate.length > 0 && activitiesForDate.some(a => a.hasRealData)) ||
              (moodForDate && moodForDate.hasRealData)
            )
          }
          
          this.dataByDate[dateKey] = dayData
        }
        
        // Calculer les statistiques
        this.calculateStatistics()
        
      } catch (error) {
        console.error('Erreur lors du chargement des données de la semaine:', error)
        this.error = {
          type: getErrorType(error),
          message: formatErrorMessage(error)
        }
        this.dataByDate = {}
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Calculer les statistiques à partir des données disponibles
     */
    calculateStatistics() {
      const today = this.getDateKeyFromDate(new Date())
      const todayData = this.dataByDate[today]
      
      // Calculer le score du jour
      if (todayData?.hasData) {
        this.dailyScore = this.calculateDayScore(todayData)
      } else {
        this.dailyScore = 0
      }
      
      // Calculer le streak (jours consécutifs avec des données)
      this.streakCount = this.calculateStreak()
      
      // Calculer les objectifs hebdomadaires
      const daysWithData = Object.values(this.dataByDate).filter(day => day.hasData).length
      this.weeklyGoals = {
        completed: daysWithData,
        total: 7
      }
    },

    /**
     * Calculer le score d'une journée (0-100)
     */
    calculateDayScore(dayData) {
      let score = 0
      let factors = 0
      
      if (dayData.sleep) {
        score += this.calculateSleepScore(dayData.sleep)
        factors++
      }
      
      if (dayData.diet) {
        score += this.calculateDietScore(dayData.diet)
        factors++
      }
      
      if (dayData.activity.length > 0) {
        score += this.calculateActivityScore(dayData.activity)
        factors++
      }
      
      if (dayData.mood) {
        score += this.calculateMoodScore(dayData.mood)
        factors++
      }
      
      return factors > 0 ? Math.round(score / factors) : 0
    },

    calculateSleepScore(sleep) {
      const qualityScores = { 'poor': 20, 'fair': 40, 'good': 70, 'very_good': 85, 'excellent': 100 }
      return qualityScores[sleep.quality] || 60
    },

    calculateDietScore(diet) {
      let score = 50 // Score de base
      
      if (diet.calories >= 1200 && diet.calories <= 2800) score += 20
      if (diet.water >= 1500) score += 15
      if (diet.protein > 0 && diet.carbs > 0 && diet.fats > 0) score += 15
      
      return Math.min(score, 100)
    },

    calculateActivityScore(activities) {
      const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
      
      if (totalDuration >= 60) return 100
      if (totalDuration >= 30) return 80
      if (totalDuration >= 15) return 60
      if (totalDuration > 0) return 40
      return 0
    },

    calculateMoodScore(mood) {
      const moodScores = { 'awful': 20, 'bad': 40, 'neutral': 60, 'good': 80, 'great': 100 }
      const energyScores = { 'sick': 10, 'tired': 30, 'neutral': 50, 'fit': 80, 'energetic': 100 }
      
      const moodScore = moodScores[mood.mood] || 60
      const energyScore = energyScores[mood.energy] || 50
      
      return Math.round((moodScore + energyScore) / 2)
    },

    /**
     * Calculer le streak de jours consécutifs avec des données
     */
    calculateStreak() {
      let streak = 0
      const today = new Date()
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        const dateKey = this.getDateKeyFromDate(date)
        
        if (this.dataByDate[dateKey]?.hasData) {
          streak++
        } else {
          break
        }
      }
      
      return streak
    },
    
    getDateKeyFromDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formatDateForInput(date) {
      // Identique à getDateKeyFromDate mais nom plus explicite pour les inputs
      return this.getDateKeyFromDate(date)
    },

    /**
     * Retry en cas d'erreur
     */
    async retryLoadData() {
      await this.loadWeekData()
      await this.loadDataForDate(this.selectedDate)
    },

    // ============================================
    
    isSameDay(date1, date2) {
      return date1.toDateString() === date2.toDateString()
    },
    isSameWeek(date1, date2) {
      const startOfWeek1 = this.getStartOfWeek(date1)
      const startOfWeek2 = this.getStartOfWeek(date2)
      return startOfWeek1.toDateString() === startOfWeek2.toDateString()
    },
    getStartOfWeek(date) {
      const startOfWeek = new Date(date)
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfWeek.setDate(diff)
      return startOfWeek
    },
    getYesterdayDate() {
      const yesterday = new Date(this.today)
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday
    },
    getLastWeekDate() {
      const lastWeek = new Date(this.today)
      lastWeek.setDate(lastWeek.getDate() - 7)
      return lastWeek
    },
    hasActivityForDate(date) {
      const dateKey = this.getDateKeyFromDate(date)
      const dayData = this.dataByDate[dateKey]
      return !!(dayData && dayData.hasData)
    },
    getActivityLevel(date) {
      const dateKey = this.getDateKeyFromDate(date)
      const dayData = this.dataByDate[dateKey]
      
      if (!dayData || !dayData.hasData) {
        return 'none'
      }
      
      // Calculer le niveau d'activité basé sur les données réelles
      const score = this.calculateDayScore(dayData)
      
      if (score >= 80) return 'high'
      if (score >= 60) return 'medium'
      if (score >= 30) return 'low'
      return 'none'
    },
    selectDate(date, event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      // Logique intelligente pour tous les boutons de navigation temporelle
      const today = this.today
      const yesterday = this.getYesterdayDate()
      
      // Toujours vérifier si la date correspond exactement à "aujourd'hui" ou "hier"
      if (this.isSameDay(date, today)) {
        this.activeTimeButton = 'today'
      } else if (this.isSameDay(date, yesterday)) {
        this.activeTimeButton = 'yesterday'
      } else {
        // Vérifier si c'est dans la semaine courante (pour "Cette semaine")
        if (this.isSameWeek(date, today)) {
          this.activeTimeButton = 'thisWeek'
        } 
        // Vérifier si c'est dans la semaine passée
        else if (this.isSameWeek(date, this.getLastWeekDate())) {
          this.activeTimeButton = 'lastWeek'
        }
        // Sinon, aucun bouton ne doit être actif
        else {
          this.activeTimeButton = null
        }
      }
      
      this.selectedDate = date
      this.navigateToDate(date)
      this.emitDateChange()
      this.collapseOnMobile()
    },
    navigateToDate(date) {
      const dateParam = this.getDateParam(date)
      const currentDateParam = this.$route.query.date
      const currentTimeButton = this.$route.query.timeButton
      
      const query = {}
      
      if (dateParam) {
        query.date = dateParam
      }
      
      if (this.activeTimeButton) {
        query.timeButton = this.activeTimeButton
      }
      
      // Naviguer si la date ou le bouton actif a changé
      if (currentDateParam !== dateParam || currentTimeButton !== this.activeTimeButton) {
        this.$router.push({
          path: '/',
          query: query
        })
      }
    },
    getDateParam(date) {
      if (this.isSameDay(date, this.today)) {
        return undefined // Pas de paramètre pour aujourd'hui
      }
      // Format: 2024-01-15
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    initializeDateFromQuery() {
      const dateParam = this.$route.query.date
      const timeButtonParam = this.$route.query.timeButton
      
      // Restaurer le bouton actif depuis l'URL
      if (timeButtonParam && ['today', 'yesterday', 'thisWeek', 'lastWeek'].includes(timeButtonParam)) {
        this.activeTimeButton = timeButtonParam
      } else {
        this.activeTimeButton = null
      }
      
      if (dateParam) {
        // Vérifier que le format est correct (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (dateRegex.test(dateParam)) {
          const date = new Date(dateParam + 'T00:00:00')
          if (!isNaN(date.getTime()) && date <= this.today) {
            this.selectedDate = date
            this.emitDateChange()
            return
          }
        }
      }
      // Par défaut, utiliser aujourd'hui
      this.selectedDate = this.today
      if (!this.activeTimeButton) {
        this.activeTimeButton = 'today'
      }
      this.emitDateChange()
    },
    goToToday(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.activeTimeButton = 'today'
      this.selectedDate = this.today
      // Aller à la route racine avec le paramètre timeButton
      this.$router.push({
        path: '/',
        query: { timeButton: 'today' }
      })
      this.emitDateChange()
      this.collapseOnMobile()
    },
    goToYesterday(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      this.activeTimeButton = 'yesterday'
      const yesterday = new Date(this.today)
      yesterday.setDate(yesterday.getDate() - 1)
      this.selectedDate = yesterday
      this.navigateToDate(yesterday)
      this.emitDateChange()
      this.collapseOnMobile()
    },
    goToThisWeek(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.activeTimeButton = 'thisWeek'
      // Rester sur la semaine courante mais ne pas forcer à aujourd'hui
      // Si on n'est pas déjà dans la semaine courante, aller à aujourd'hui
      const startOfThisWeek = new Date(this.today)
      const day = startOfThisWeek.getDay()
      const diff = startOfThisWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfThisWeek.setDate(diff)
      
      const endOfThisWeek = new Date(startOfThisWeek)
      endOfThisWeek.setDate(startOfThisWeek.getDate() + 6)
      
      // Si la date sélectionnée n'est pas dans la semaine courante, aller à aujourd'hui
      if (this.selectedDate < startOfThisWeek || this.selectedDate > endOfThisWeek) {
        this.selectedDate = this.today
        this.navigateToDate(this.today)
      } else {
        // Rester sur la date sélectionnée mais mettre à jour l'URL
        this.navigateToDate(this.selectedDate)
      }
      this.emitDateChange()
      this.collapseOnMobile()
    },
    goToLastWeek(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.activeTimeButton = 'lastWeek'
      const lastWeek = new Date(this.today)
      lastWeek.setDate(lastWeek.getDate() - 7)
      this.selectedDate = lastWeek
      this.navigateToDate(lastWeek)
      this.emitDateChange()
      this.collapseOnMobile()
    },
    toggleDatePicker(event) {
      // Éviter les événements multiples sur mobile
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      this.showDatePicker = !this.showDatePicker
    },
    onDateChange(event) {
      const dateValue = event.target.value
      if (!dateValue) return
      // Correction : créer la date en local pour éviter le décalage UTC
      this.$nextTick(() => {
        const [year, month, day] = dateValue.split('-')
        const selectedDate = new Date(Number(year), Number(month) - 1, Number(day))
        if (!isNaN(selectedDate.getTime()) && selectedDate <= this.today) {
          this.selectDate(selectedDate, event)
        }
        this.showDatePicker = false
        this.collapseOnMobile()
      })
    },
    
    // ====== MÉTHODES DE FORMATAGE POUR L'AFFICHAGE ======
    
    formatSleepData(sleepData) {
      if (!sleepData || !sleepData.bedtime || !sleepData.wakeup) return null
      
      // Calculer la durée de sommeil en heures
      const bedTime = new Date(`1970-01-01T${sleepData.bedtime}`)
      let wakeUp = new Date(`1970-01-01T${sleepData.wakeup}`)
      
      // Si l'heure de réveil est antérieure à l'heure de coucher, 
      // cela signifie qu'on se réveille le jour suivant
      if (wakeUp < bedTime) {
        wakeUp = new Date(`1970-01-02T${sleepData.wakeup}`)
      }
      
      const durationMs = wakeUp - bedTime
      const hours = Math.floor(durationMs / (1000 * 60 * 60))
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
      
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
    },
    
    formatDietData(dietData) {
      if (!dietData) return null
      
      // Retourner les calories ou "Complet" si toutes les informations sont renseignées
      if (dietData.calories) {
        return `${dietData.calories} kcal`
      } else if (dietData.breakfast || dietData.lunch || dietData.dinner) {
        return 'Partiellement renseigné'
      }
      
      return null
    },
    
    formatActivityData(activities) {
      if (!activities || activities.length === 0) return null
      
      // Calculer la durée totale d'activité
      const totalDuration = activities.reduce((total, activity) => {
        return total + (parseInt(activity.duration) || 0)
      }, 0)
      
      return totalDuration > 0 ? totalDuration : null
    },
    
    formatMoodData(moodData) {
      if (!moodData || !moodData.mood) return null
      
      // Retourner directement la valeur mood pour affichage avec emoji
      return moodData.mood
    },
    
    emitDateChange() {
      const rawData = this.dataByDate[this.selectedDateKey]
      
      // Analyser chaque type de donnée individuellement
      const individualData = {
        sleep: {
          hasData: !!(rawData?.sleep && rawData.sleep.hasRealData),
          formattedData: rawData?.sleep ? this.formatSleepData(rawData.sleep) : null
        },
        diet: {
          hasData: !!(rawData?.diet && rawData.diet.hasRealData),
          formattedData: rawData?.diet ? this.formatDietData(rawData.diet) : null
        },
        activity: {
          hasData: !!(rawData?.activity && rawData.activity.length > 0 && rawData.activity.some(a => a.hasRealData)),
          formattedData: rawData?.activity ? this.formatActivityData(rawData.activity) : null
        },
        mood: {
          hasData: !!(rawData?.mood && rawData.mood.hasRealData),
          formattedData: rawData?.mood ? this.formatMoodData(rawData.mood) : null
        }
      }
      
      console.log('📤 [Navbar] Émission des données individuelles:', individualData)
      
      // Déterminer le displayState global
      const hasAnyData = individualData.sleep.hasData || 
                         individualData.diet.hasData || 
                         individualData.activity.hasData || 
                         individualData.mood.hasData
      
      let globalDisplayState
      if (hasAnyData) {
        globalDisplayState = 'WITH_DATA'
      } else if (this.isSelectedDateToday) {
        globalDisplayState = 'TODAY_NO_DATA'
      } else {
        globalDisplayState = 'PAST_NO_DATA'
      }
      
      // Émettre un événement vers le composant parent avec les informations de la date
      this.$emit('date-changed', {
        selectedDate: this.selectedDate,
        displayState: globalDisplayState,
        hasData: hasAnyData,
        isToday: this.isSelectedDateToday,
        dateKey: this.selectedDateKey,
        individualData: individualData,
        fullData: rawData ? {
          sleep: rawData.sleep,
          diet: rawData.diet,
          activity: rawData.activity,
          mood: rawData.mood
        } : null,
        data: hasAnyData ? {
          sleep: individualData.sleep.formattedData,
          diet: individualData.diet.formattedData,
          activity: individualData.activity.formattedData,
          mood: individualData.mood.formattedData
        } : null
      })
    },
    openSettings() {
      console.log('Open settings')
    },
    handleOutsideClick(event) {
      // Sur mobile, être plus tolérant avec les événements de fermeture
      if (!this.$el || !this.$el.contains(event.target)) {
        if (this.showDatePicker) {
          // Petit délai pour éviter les fermetures intempestives sur mobile
          setTimeout(() => {
            this.showDatePicker = false
          }, 100)
        }
      }
    },
    collapseOnMobile() {
      // Fermer la navbar sur mobile (largeur < 768px pour correspondre à la breakpoint md de Tailwind)
      if (window.innerWidth < 768) {
        this.collapsed = true
      }
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.initializeDateFromQuery()
      },
      immediate: false
    }
  },
  async mounted() {
    // Initialiser avec la date des query parameters ou aujourd'hui
    this.initializeDateFromQuery()
    
    // Charger les données de la semaine (qui inclut la date sélectionnée)
    await this.loadWeekData()
    
    // Émettre l'état initial
    this.$nextTick(() => {
      this.emitDateChange()
    })
    
    // Gérer les clics à l'extérieur pour fermer le date picker avec un petit délai
    this.$nextTick(() => {
      document.addEventListener('click', this.handleOutsideClick)
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>

<style>
.transition-width {
  transition-property: width;
}
</style>
