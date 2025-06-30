<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="max-w-md w-full text-center space-y-6">
      
      <!-- Loading state -->
      <div v-if="isProcessing" class="bg-white rounded-xl shadow-lg p-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Connexion en cours...</h2>
        <p class="text-gray-600">Finalisation de votre authentification Microsoft</p>
      </div>

      <!-- Success state -->
      <div v-else-if="isSuccess" class="bg-white rounded-xl shadow-lg p-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Connexion réussie !</h2>
        <p class="text-gray-600">Redirection vers votre dashboard...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-lg p-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Erreur de connexion</h2>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button 
          @click="retryLogin"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'CallbackHandler',
  data() {
    return {
      isProcessing: true,
      isSuccess: false,
      error: null
    }
  },
  async mounted() {
    await this.handleOAuth2Callback()
  },
  methods: {
    async handleOAuth2Callback() {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const encodedToken = urlParams.get('token')
        const email = urlParams.get('email')
        const error = urlParams.get('error')
        
        if (error) {
          throw new Error(`Erreur OAuth2: ${decodeURIComponent(error)}`)
        }
        
        if (!encodedToken) {
          throw new Error('Token manquant dans la réponse OAuth2')
        }
        
        if (!email) {
          throw new Error('Email manquant dans la réponse OAuth2')
        }
        
        let token = encodedToken
        
        await authService.handleAuthCallback(token, email)
        
        this.isProcessing = false
        this.isSuccess = true
        
        setTimeout(() => {
          window.history.replaceState({}, document.title, '/')
          this.$router.push('/')
        }, 1500)
        
      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error)
        this.isProcessing = false
        this.error = error.message || 'Une erreur est survenue lors de la connexion'
      }
    },
    
    retryLogin() {
      this.$router.push('/login')
    }
  }
}
</script> 