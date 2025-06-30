<template>
  <div class="relative">
    <!-- User Menu Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
        <span class="text-sm font-medium text-white">
          {{ userInitials }}
        </span>
      </div>
      <div class="hidden md:block text-left">
        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
        <p class="text-xs text-gray-500">{{ user.email }}</p>
      </div>
      <svg 
        class="w-4 h-4 text-gray-400 transition-transform duration-200"
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
        class="absolute right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        :class="dropdownPositionClasses"
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
            @click="logout"
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
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'UserProfile',
  data() {
    return {
      isDropdownOpen: false,
      isRefreshing: false,
      isLoggingOut: false,
      dropdownPosition: 'bottom'
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
        
        const rect = this.$el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const dropdownHeight = 280
        
        const spaceBelow = windowHeight - rect.bottom
        const spaceAbove = rect.top
        
        if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
          this.dropdownPosition = 'top'
        } else {
          this.dropdownPosition = 'bottom'
        }
      })
    },
    
    closeDropdown() {
      this.isDropdownOpen = false
    },
    
    showUserDetails() {
      alert(`Informations du compte:\n\nNom: ${this.user.name}\nEmail: ${this.user.email}\nProvider: Microsoft\nID: ${this.user.id || 'N/A'}`)
      this.closeDropdown()
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
    
    async logout() {
      if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        this.isLoggingOut = true
        try {
          await authService.logout()
          this.$router.push('/login')
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error)
          // Forcer la déconnexion même en cas d'erreur
          this.$router.push('/login')
        } finally {
          this.isLoggingOut = false
          this.closeDropdown()
        }
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
      if (this.isDropdownOpen) {
        this.calculateDropdownPosition()
      }
    }
  },
  
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
    window.addEventListener('scroll', this.handleScroll, true)
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
    window.removeEventListener('scroll', this.handleScroll, true)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script> 