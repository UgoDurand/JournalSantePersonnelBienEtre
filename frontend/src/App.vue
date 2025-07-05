<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden">
    <!-- Navbar visible seulement si l'utilisateur est connecté -->
    <Navbar 
      v-if="$route.name !== 'Login' && $route.name !== 'OAuthCallback' && isAuthenticated" 
      @date-changed="onDateChanged"
    />
    <main class="flex-1 overflow-auto">
      <router-view :date-info="dateInfo" @date-changed="onDateChanged" />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { authService } from '@/services/auth'

export default {
  name: 'App',
  components: { 
    Navbar
  },
  data() {
    return {
      isAuthenticated: false,
      dateInfo: null
    }
  },
  async mounted() {
    await this.checkInitialAuth()
  },
  watch: {
    '$route'() {
      this.updateAuthState()
    }
  },
  methods: {
    async checkInitialAuth() {
      try {
        if (this.$route.name === 'Login' || this.$route.name === 'OAuthCallback') {
          this.updateAuthState()
          return
        }
        
        if (authService.isAuthenticated()) {
          const isValid = await authService.validateToken()
          
          if (isValid) {
            this.updateAuthState()
            
            if (this.$route.path === '/') {
              return
            }
          } else {
            await authService.logout()
            this.updateAuthState()
            
            if (this.$route.meta && this.$route.meta.requiresAuth) {
              this.$router.push('/login')
            }
          }
        } else {
          this.updateAuthState()
        }
        
      } catch (error) {
        console.error('App.vue - Erreur lors de la vérification d\'authentification:', error)
        await authService.logout()
        this.updateAuthState()
      }
    },
    
    updateAuthState() {
      this.isAuthenticated = authService.isAuthenticated()
    },

    onDateChanged(dateInfo) {
      this.dateInfo = dateInfo
    }
  }
}
</script>
