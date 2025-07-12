<template>
  <div class="relative">
    <!-- User Menu Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-full"
      :class="compact ? 'justify-center' : 'space-x-3'"
    >
      <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-sm font-medium text-white">
          {{ userInitials }}
        </span>
      </div>
      <div v-if="!compact && shouldShowText" class="text-left min-w-0 flex-1" :class="screenWidth < 768 ? 'max-w-32' : ''">
        <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
        <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
      </div>
      <svg
        v-if="!compact && shouldShowText"
        class="w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0"
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isDropdownOpen"
        ref="dropdown"
        class="absolute bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        :class="[dropdownPositionClasses, dropdownHorizontalPosition]"
        :style="dropdownWidth"
      >
        <!-- User Info -->
        <div class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">
                {{ userInitials }}
              </span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
              <p class="text-xs text-gray-500">{{ user.email }}</p>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Microsoft
              </span>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <button
            @click="showUserDetails"
            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Informations du compte
          </button>

          <button
            @click="refreshUserInfo"
            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            :disabled="isRefreshing"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
              :class="{ 'animate-spin': isRefreshing }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H4" />
            </svg>
            {{ isRefreshing ? 'Actualisation...' : 'Actualiser' }}
          </button>
        </div>

        <div class="border-t border-gray-200 pt-2">
          <button
            @click="showLogoutModal = true"
            :disabled="isLoggingOut"
            class="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center"
          >
            <svg class="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {{ isLoggingOut ? 'Déconnexion...' : 'Se déconnecter' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop -->
    <div
      v-if="isDropdownOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>

    <!-- Modal d'informations utilisateur -->
    <div
      v-if="showUserInfoModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      @click="closeUserInfoModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Informations du compte</h2>
          <button
            @click="closeUserInfoModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Avatar et nom -->
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <span class="text-xl font-bold text-white">
              {{ userInitials }}
            </span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ user.name }}</h3>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </div>

        <!-- Informations détaillées -->
        <div class="space-y-4 mb-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Fournisseur d'identité</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057L7.044 14.87l9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z"/>
              </svg>
              <span class="text-green-700 font-medium">Microsoft</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Identifiant</span>
            </div>
            <p class="text-gray-900 font-mono text-sm">{{ user.id || 'N/A' }}</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Statut du compte</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-green-700 font-medium">Actif</span>
            </div>
          </div>
        </div>

        <!-- Message d'information -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-900">Information importante</p>
              <p class="text-sm text-blue-700 mt-1">
                Ces informations sont gérées par votre fournisseur d'identité (Microsoft) et ne peuvent pas être modifiées depuis cette application.
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3">
          <button
            @click="closeUserInfoModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
          <button
            @click="refreshUserInfo"
            :disabled="isRefreshing"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              :class="{ 'animate-spin': isRefreshing }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H4" />
            </svg>
            <span>{{ isRefreshing ? 'Actualisation...' : 'Actualiser' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODALE DE CONFIRMATION DE DÉCONNEXION -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-fade-in">
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Se déconnecter&nbsp;?</h3>
          <p class="text-gray-600 text-center mb-6">Es-tu sûr de vouloir te déconnecter&nbsp;?<br/>Tu devras te reconnecter pour accéder à ton espace.</p>
          <div class="flex gap-3 w-full justify-center">
            <button @click="showLogoutModal = false" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition">Annuler</button>
            <button @click="confirmLogout" :disabled="isLoggingOut" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition flex items-center gap-2 disabled:opacity-60">
              <svg v-if="isLoggingOut" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ isLoggingOut ? 'Déconnexion...' : 'Se déconnecter' }}</span>
            </button>
          </div>
        </div>
        <button @click="showLogoutModal = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'UserProfile',
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      isRefreshing: false,
      isLoggingOut: false,
      dropdownPosition: 'bottom',
      screenWidth: window.innerWidth,
      dropdownHorizontalPos: 'right-0',
      showUserInfoModal: false,
      showLogoutModal: false
    }
  },
  computed: {
    user() {
      return authService.getCurrentUser() || {}
    },
    userInitials() {
      if (!this.user.name) return '?'
      return this.user.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
    },
    dropdownPositionClasses() {
      return this.dropdownPosition === 'top'
        ? 'bottom-full mb-2'
        : 'top-full mt-2'
    },
    shouldShowText() {
      // Afficher le texte sur mobile et desktop, mais pas en mode compact
      return !this.compact
    },
    dropdownHorizontalPosition() {
      return this.dropdownHorizontalPos
    },
    dropdownWidth() {
      // Largeur fixe pour simplifier, avec une sécurité maximale
      return {
        width: '280px',
        maxWidth: '85vw',
        minWidth: '200px'
      }
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.isDropdownOpen) {
        this.calculateDropdownPosition()
      }
      this.isDropdownOpen = !this.isDropdownOpen
    },

    calculateDropdownPosition() {
      this.$nextTick(() => {
        if (!this.$el) return

        const windowWidth = window.innerWidth

        // Toujours positionner en haut
        this.dropdownPosition = 'top'

        // Toujours positionner à gauche du bouton
        this.dropdownHorizontalPos = 'left-0'

        // Mettre à jour la largeur d'écran
        this.screenWidth = windowWidth
      })
    },

    closeDropdown() {
      this.isDropdownOpen = false
    },

    showUserDetails() {
      this.showUserInfoModal = true
      this.closeDropdown()
    },

    closeUserInfoModal() {
      this.showUserInfoModal = false
    },

    async refreshUserInfo() {
      this.isRefreshing = true
      try {
        await authService.fetchUserInfo()
        this.$forceUpdate()
      } catch (error) {
        alert('Erreur lors de l\'actualisation des informations: ' + error.message)
      } finally {
        this.isRefreshing = false
      }
    },

    async confirmLogout() {
      this.isLoggingOut = true
      try {
        await authService.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
        this.$router.push('/login')
      } finally {
        this.isLoggingOut = false
        this.showLogoutModal = false
        this.closeDropdown()
      }
    },

    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.closeDropdown()
      }
    },

    handleScroll() {
      if (this.isDropdownOpen) {
        this.calculateDropdownPosition()
      }
    },

    handleResize() {
      this.screenWidth = window.innerWidth
      if (this.isDropdownOpen) {
        this.calculateDropdownPosition()
      }
    },

    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        if (this.showUserInfoModal) {
          this.closeUserInfoModal()
        } else if (this.isDropdownOpen) {
          this.closeDropdown()
        }
      }
    }
  },

  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
    window.addEventListener('scroll', this.handleScroll, true)
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('keydown', this.handleEscapeKey)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
    window.removeEventListener('scroll', this.handleScroll, true)
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleEscapeKey)
  }
}
</script>