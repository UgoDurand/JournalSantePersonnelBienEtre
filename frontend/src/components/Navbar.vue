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
            :value="selectedDate.toISOString().split('T')[0]"
            :max="today.toISOString().split('T')[0]"
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
        <button
          @click="goToThisWeek"
          @touchstart="goToThisWeek"
          :class="activeTimeButton === 'thisWeek' 
            ? 'px-2 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
            : 'px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'"
        >
          Cette semaine
        </button>
        <button
          @click="goToLastWeek"
          @touchstart="goToLastWeek"
          :class="activeTimeButton === 'lastWeek' 
            ? 'px-2 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
            : 'px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'"
        >
          Semaine passée
        </button>
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
        <!-- Streak -->
        <div class="flex items-center justify-between p-2 bg-green-50 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-green-900">Streak</p>
              <p class="text-xs text-green-700">{{ streakCount }} jours</p>
            </div>
          </div>
        </div>

        <!-- Score du jour -->
        <div class="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-blue-900">Score</p>
              <p class="text-xs text-blue-700">{{ dailyScore }}%</p>
            </div>
          </div>
        </div>

        <!-- Objectifs -->
        <div class="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-orange-900">Objectifs</p>
              <p class="text-xs text-orange-700">{{ weeklyGoals.completed }}/{{ weeklyGoals.total }}</p>
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

export default {
  name: 'NavbarMenu',
  components: { CalendarIcon, Bars3Icon, UserProfile },
  data() {
    return {
      collapsed: false,
      selectedDate: new Date(),
      showDatePicker: false,
      currentWeek: [],
      streakCount: 7,
      dailyScore: 85,
      weeklyGoals: { completed: 4, total: 7 },
      activeTimeButton: 'today' // 'today', 'yesterday', 'thisWeek', 'lastWeek'
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
    hasActivityForDate(date) {
      // Simulation - à remplacer par vraies données
      // Utiliser la date comme seed pour une valeur déterministe
      const seed = date.getTime()
      return (seed % 10) > 3
    },
    getActivityLevel(date) {
      // Simulation - retourne 'high', 'medium', 'low', 'none'
      const levels = ['high', 'medium', 'low', 'none']
      // Utiliser la date comme seed pour une valeur déterministe
      const seed = date.getTime()
      return levels[seed % levels.length]
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
      } else if (this.activeTimeButton === 'today' || this.activeTimeButton === 'yesterday') {
        // Si on était sur "Aujourd'hui" ou "Hier" et qu'on va sur une autre date
        const referenceDate = this.activeTimeButton === 'today' ? today : yesterday
        if (this.isSameWeek(date, referenceDate)) {
          this.activeTimeButton = 'thisWeek'
        }
      }
      // Si on était sur "Cette semaine" et qu'on clique sur aujourd'hui/hier, 
      // c'est déjà géré par les conditions du dessus
      
      this.selectedDate = date
      this.navigateToDate(date)
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
            return
          }
        }
      }
      // Par défaut, utiliser aujourd'hui
      this.selectedDate = this.today
      if (!this.activeTimeButton) {
        this.activeTimeButton = 'today'
      }
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
      
      // Ajouter un petit délai pour éviter les conflits sur mobile
      this.$nextTick(() => {
        const selectedDate = new Date(dateValue + 'T00:00:00')
        if (!isNaN(selectedDate.getTime()) && selectedDate <= this.today) {
          this.selectDate(selectedDate, event)
        }
        this.showDatePicker = false
      })
    },

    openSettings() {
      // TODO: Implémenter les paramètres
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
  mounted() {
    // Initialiser avec la date des query parameters ou aujourd'hui
    this.initializeDateFromQuery()
    
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
