<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Journal Santé & Bien-être
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Connectez-vous pour accéder à votre journal personnel
        </p>
      </div>

      <!-- Authentication Card -->
      <div class="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div v-if="isLoading" class="text-center">
          <div class="inline-flex items-center justify-center w-8 h-8">
            <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="mt-2 text-sm text-gray-600">Redirection vers Microsoft...</p>
        </div>

        <div v-else>
          <div class="text-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              Se connecter avec Microsoft
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Utilisez votre compte Microsoft personnel ou professionnel
            </p>
          </div>

          <!-- Backend Status -->
          <div v-if="backendStatus === 'checking'" class="text-center mb-4">
            <div class="inline-flex items-center text-sm text-gray-600">
              <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Vérification du service...
            </div>
          </div>

          <div v-else-if="backendStatus === 'unavailable'" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span class="text-sm text-yellow-800">Service temporairement indisponible</span>
              </div>
              <button 
                @click="checkBackendStatus"
                :disabled="backendStatus === 'checking'"
                class="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>

          <!-- Microsoft Login Button -->
          <button
            @click="loginWithMicrosoft"
            :disabled="isLoading || backendStatus !== 'available'"
            class="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0078d4] hover:bg-[#106ebe] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078d4] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 23 23" fill="currentColor">
              <path d="M11.5 0h11v11h-11z" fill="#f25022"/>
              <path d="M0 0h11v11H0z" fill="#00a4ef"/>
              <path d="M0 12h11v11H0z" fill="#ffb900"/>
              <path d="M11.5 12h11v11h-11z" fill="#7fbb00"/>
            </svg>
            Continuer avec Microsoft
          </button>

          <!-- Features -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-4">Pourquoi utiliser Microsoft ?</h4>
            <div class="space-y-3">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Connexion sécurisée
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Pas de mot de passe supplémentaire
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Protection de vos données personnelles
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Erreur de connexion
              </h3>
              <p class="text-sm text-red-700 mt-1">
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs text-gray-500">
          En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'LoginPage',
  data() {
    return {
      isLoading: false,
      error: null,
      backendStatus: 'unknown', // 'unknown', 'checking', 'available', 'unavailable'
      hasAttemptedLogin: false // Pour éviter les clics multiples
    }
  },
  async mounted() {
    await this.checkAndRedirectIfAuthenticated()
    
    this.error = null
    this.hasAttemptedLogin = false
    
    await this.checkBackendStatus()
  },
  methods: {
    async checkAndRedirectIfAuthenticated() {
      try {
        const isAuthLocal = authService.isAuthenticated()
        
        if (isAuthLocal) {
          const isValid = await authService.validateToken()
          
          if (isValid) {
            await this.$nextTick()
            this.$router.push('/')
            return true
          } else {
            await authService.logout()
          }
        }
        
        return false
      } catch (error) {
        console.error('Login.vue - Erreur lors de la vérification d\'authentification:', error)
        await authService.logout()
        return false
      }
    },

    async checkBackendStatus() {
      try {
        this.backendStatus = 'checking'
        await authService.checkBackendHealth()
        this.backendStatus = 'available'
      } catch (error) {
        console.error('Backend non disponible:', error)
        this.backendStatus = 'unavailable'
        this.error = 'Service d\'authentification temporairement indisponible. Veuillez réessayer dans quelques instants.'
      }
    },

    async loginWithMicrosoft() {
      if (this.isLoading || this.hasAttemptedLogin) {
        return
      }
      
      try {
        this.isLoading = true
        this.error = null
        this.hasAttemptedLogin = true
        
        if (this.backendStatus !== 'available') {
          await this.checkBackendStatus()
        }
        
        if (this.backendStatus !== 'available') {
          throw new Error('Service d\'authentification indisponible')
        }
        
        authService.loginWithMicrosoft()
        
      } catch (error) {
        console.error('Erreur de connexion:', error)
        this.error = error.message || 'Une erreur est survenue lors de la connexion'
        this.isLoading = false
        this.hasAttemptedLogin = false
      }
    }
  }
}
</script> 