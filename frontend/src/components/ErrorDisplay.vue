<template>
  <div class="error-container">
    <!-- Erreur réseau -->
    <div v-if="type === 'network'" class="error-card network-error">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 class="error-title">Problème de connexion</h3>
      <p class="error-message">
        Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.
      </p>
      <div class="error-actions">
        <button @click="$emit('retry')" class="retry-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Réessayer
        </button>
      </div>
    </div>

    <!-- Erreur d'authentification -->
    <div v-else-if="type === 'auth'" class="error-card auth-error">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 class="error-title">Session expirée</h3>
      <p class="error-message">
        Votre session a expiré. Veuillez vous reconnecter pour continuer.
      </p>
      <div class="error-actions">
        <button @click="$emit('login')" class="login-button">
          Se reconnecter
        </button>
      </div>
    </div>

    <!-- Erreur de validation -->
    <div v-else-if="type === 'validation'" class="error-card validation-error">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="error-title">Données invalides</h3>
      <p class="error-message">{{ message || 'Veuillez vérifier les données saisies.' }}</p>
      <div class="error-actions">
        <button @click="$emit('close')" class="close-button">
          Fermer
        </button>
      </div>
    </div>

    <!-- Erreur générale -->
    <div v-else class="error-card general-error">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="error-title">Une erreur est survenue</h3>
      <p class="error-message">{{ message || 'Une erreur inattendue est survenue.' }}</p>
      <div class="error-actions">
        <button @click="$emit('retry')" class="retry-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Réessayer
        </button>
        <button @click="$emit('close')" class="close-button">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    type: {
      type: String,
      default: 'general',
      validator: value => ['network', 'auth', 'validation', 'general'].includes(value)
    },
    message: {
      type: String,
      default: ''
    }
  },
  emits: ['retry', 'login', 'close']
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
}

.error-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  border-left: 4px solid;
}

.network-error {
  border-left-color: #f59e0b;
}

.auth-error {
  border-left-color: #dc2626;
}

.validation-error {
  border-left-color: #f59e0b;
}

.general-error {
  border-left-color: #6b7280;
}

.error-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.error-icon svg {
  width: 48px;
  height: 48px;
  color: #ef4444;
}

.network-error .error-icon svg {
  color: #f59e0b;
}

.auth-error .error-icon svg {
  color: #dc2626;
}

.validation-error .error-icon svg {
  color: #f59e0b;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-button,
.login-button,
.close-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-button {
  background: #3b82f6;
  color: white;
}

.retry-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.login-button {
  background: #10b981;
  color: white;
}

.login-button:hover {
  background: #059669;
  transform: translateY(-1px);
}

.close-button {
  background: #f3f4f6;
  color: #6b7280;
}

.close-button:hover {
  background: #e5e7eb;
  color: #374151;
}

.retry-button svg {
  width: 16px;
  height: 16px;
}

/* Responsive */
@media (max-width: 640px) {
  .error-container {
    padding: 1rem;
  }
  
  .error-card {
    padding: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .retry-button,
  .login-button,
  .close-button {
    width: 100%;
    justify-content: center;
  }
}
</style> 