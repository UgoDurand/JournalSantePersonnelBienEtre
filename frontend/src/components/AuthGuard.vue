<template>
  <div v-if="isCheckingAuth" class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
        <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">Vérification des permissions...</h2>
      <p class="text-sm text-gray-600 mt-1">Validation de votre accès</p>
    </div>
  </div>
  
  <slot v-else-if="isAuthenticated" />
  
  <div v-else class="min-h-screen bg-yellow-50 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto p-6">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
        <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-yellow-900">Accès non autorisé</h2>
      <p class="text-sm text-yellow-700 mt-1 mb-4">Vous devez être connecté pour accéder à cette page</p>
      <p class="text-xs text-yellow-600">Redirection vers la page de connexion...</p>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'AuthGuard',
  data() {
    return {
      isCheckingAuth: true,
      isAuthenticated: false
    }
  },
  async mounted() {
    await this.checkAuthentication()
  },
  methods: {
    async checkAuthentication() {
      try {
        this.isCheckingAuth = true
        
        // S'assurer que le service d'authentification est initialisé
        if (!authService.getIsInitialized()) {
          await authService.initialize()
        }
        
        // Vérification stricte de l'authentification
        if (!authService.isAuthenticated()) {
          // Pas d'authentification, redirection immédiate
          console.warn('Accès non autorisé - aucune authentification')
          setTimeout(() => this.$router.push('/login'), 1500)
          return
        }
        
        // Valider le token avec le backend pour s'assurer qu'il est toujours valide
        console.log('Validation du token avec le backend...')
        const isTokenValid = await authService.validateToken()
        
        if (!isTokenValid) {
          console.warn('Token invalide ou expiré')
          setTimeout(() => this.$router.push('/login'), 1500)
          return
        }
        
        // Authentification valide
        console.log('Authentification validée avec succès')
        this.isAuthenticated = true
        
      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error)
        // En cas d'erreur, rediriger vers la connexion par sécurité
        setTimeout(() => this.$router.push('/login'), 1500)
      } finally {
        this.isCheckingAuth = false
      }
    }
  }
}
</script> 