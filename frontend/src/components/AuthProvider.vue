<template>
  <div v-if="isLoading" class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
        <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">Initialisation...</h2>
      <p class="text-sm text-gray-600 mt-1">Vérification de votre session</p>
    </div>
  </div>
  
  <slot v-else-if="isInitialized" />
  
  <div v-else class="min-h-screen bg-red-50 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto p-6">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-red-900">Erreur d'initialisation</h2>
      <p class="text-sm text-red-700 mt-1 mb-4">Impossible d'initialiser le système d'authentification</p>
      <button 
        @click="retry" 
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'AuthProvider',
  data() {
    return {
      isLoading: true,
      isInitialized: false,
      initError: null
    }
  },
  async mounted() {
    await this.initializeAuth()
  },
  methods: {
    async initializeAuth() {
      try {
        this.isLoading = true
        this.initError = null
        
        await authService.initialize()
        
        this.isInitialized = true
      } catch (error) {
        console.error('Erreur d\'initialisation de l\'authentification:', error)
        this.initError = error.message
        this.isInitialized = false
      } finally {
        this.isLoading = false
      }
    },
    
    async retry() {
      await this.initializeAuth()
    }
  }
}
</script> 